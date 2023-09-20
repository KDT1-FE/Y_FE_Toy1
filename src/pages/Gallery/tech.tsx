import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import ModalT from './UploadModal/ModalT';
import { onSnapshot, updateDoc } from 'firebase/firestore';
import { ref, deleteObject } from 'firebase/storage';
import { storeRef, storage } from '../../utils/firebase';
import {
    ArticleContainer,
    ChildArticle,
    ContentContainer,
    ContentFirstLine,
    Description,
    ModalBackground,
    TrashCan,
    UploadBtn,
    UploadBtnWrapper,
} from './style';

const Tech: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [articleTs, setArticleTs] = useState<any[]>([]);
    const [isDraggingItem, setIsDraggingItem] = useState(false); // 추가: 아이템을 드래그할 때만 쓰레기통 보이기

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleDragStart = () => {
        setIsDraggingItem(true);
    };

    const handleDragEnd = async (result: any) => {
        setIsDraggingItem(false);

        if (result.destination) {
            if (result.destination.droppableId === 'trashCan') {
                const itemToDelete = articleTs[result.source.index];

                const shouldDelete = window.confirm('삭제하시겠습니까?');

                if (shouldDelete) {
                    // Firestore에서 해당 요소 삭제
                    const updatedArticleTs = [...articleTs];
                    updatedArticleTs.splice(result.source.index, 1);
                    await updateDoc(storeRef, {
                        '테크.articleT': updatedArticleTs,
                    });

                    // Storage에서 이미지 파일 삭제
                    const imageRef = ref(storage, `thumbnailT/${itemToDelete.index}`);
                    await deleteObject(imageRef);

                    // 상태 업데이트
                    setArticleTs(updatedArticleTs);
                }
            } else {
                // 기존 드래그 앤 드롭 로직 (항목의 순서 변경)
                const newArticleTs = [...articleTs];
                const [reorderedItem] = newArticleTs.splice(result.source.index, 1);
                newArticleTs.splice(result.destination.index, 0, reorderedItem);

                await updateDoc(storeRef, {
                    '테크.articleT': newArticleTs,
                });
            }
        }
    };

    useEffect(() => {
        const unsubscribe = onSnapshot(storeRef, (docSnapshot) => {
            if (docSnapshot.exists()) {
                const data = docSnapshot.data();
                const articleTData = data?.테크?.articleT || [];
                setArticleTs(articleTData);
            } else {
                console.log('Document does not exist.');
            }
        });

        return () => {
            unsubscribe();
        };
    }, []);

    return (
        <ContentContainer>
            {isModalOpen && (
                <div>
                    <ModalBackground onClick={closeModal} />
                    <ModalT onClose={closeModal} />
                </div>
            )}
            {/* <ContentFirstLine style={{ font: '16px', fontWeight: 'bold' }}>레퍼런스 공유 {'>'} 테크</ContentFirstLine> */}
            <UploadBtnWrapper>
                <UploadBtn onClick={openModal}>업로드</UploadBtn>
            </UploadBtnWrapper>
            <ArticleContainer>
                <DragDropContext onDragEnd={handleDragEnd} onDragStart={handleDragStart}>
                    <Droppable droppableId="trashCan">
                        {(provided) => (
                            <TrashCan
                                ref={provided.innerRef}
                                style={{
                                    opacity: isDraggingItem == true ? '1' : '0',
                                }}
                                {...provided.droppableProps}
                            >
                                🗑️
                                {provided.placeholder}
                            </TrashCan>
                        )}
                    </Droppable>
                    <Droppable droppableId="yourDroppableId">
                        {(provided) => (
                            <div
                                ref={provided.innerRef}
                                style={{
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                    gap: '20px',
                                    justifyContent: 'space-between',
                                }}
                                {...provided.droppableProps}
                            >
                                {articleTs.map((articleT, index) => (
                                    <Draggable
                                        key={articleT.index.toString()}
                                        draggableId={articleT.index.toString()}
                                        index={index}
                                    >
                                        {(provided, snapshot) => (
                                            <ChildArticle
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                className={snapshot.isDragging ? 'isDragging' : ''}
                                            >
                                                {/* 요소 내용 */}
                                                <a
                                                    href={articleT.recruitURL}
                                                    key={articleT.index}
                                                    id={articleT.index}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    style={{ position: 'relative' }}
                                                >
                                                    <img
                                                        style={{
                                                            width: '300px',
                                                            height: '200px',
                                                            boxShadow: '2px 2px 2px 2px rgba(0, 0, 0, 0.3)',
                                                            borderRadius: '10px',
                                                            transition: 'transform 0.2s ease-in-out',
                                                            transform: snapshot.isDragging ? 'scale(0.3)' : 'scale(1)', //이미지 그랩 시 작아짐 효과
                                                            position: 'relative',
                                                        }}
                                                        src={articleT.thumbnailURL}
                                                        alt={`article ${articleT.index}`}
                                                    />
                                                    <Description>{articleT.description}</Description>
                                                </a>
                                            </ChildArticle>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
            </ArticleContainer>
        </ContentContainer>
    );
};

export default Tech;
