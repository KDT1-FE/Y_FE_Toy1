import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import ModalT from './UploadModal/ModalT';
import { onSnapshot, updateDoc } from 'firebase/firestore';
import { ref, deleteObject } from 'firebase/storage';
import { storeRef, storage } from '../../utils/firebase';
import { ContentContainer, ContentFirstLine, ModalBackground, TrashCan, UploadBtn } from './style';

const Tech: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [articleTs, setArticleTs] = useState<any[]>([]);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };
    const handleDragEnd = async (result: any) => {
        if (result.destination && result.destination.droppableId === 'trashCan') {
            const itemToDelete = articleTs[result.source.index];

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
            return;
        }

        // 기존 드래그 앤 드롭 로직 (항목의 순서 변경)
        if (result.destination) {
            const newArticleRs = [...articleTs];
            const [reorderedItem] = newArticleRs.splice(result.source.index, 1);
            newArticleRs.splice(result.destination.index, 0, reorderedItem);

            await updateDoc(storeRef, {
                '테크.articleT': newArticleRs,
            });
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
                <ModalBackground>
                    <ModalT onClose={closeModal} />
                </ModalBackground>
            )}
            <ContentFirstLine>
                <div style={{ font: '16px', fontWeight: 'bold' }}>레퍼런스 공유 {'>'} 테크</div>
                <UploadBtn onClick={openModal}>업로드</UploadBtn>
            </ContentFirstLine>
            <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="trashCan">
                    {(provided) => (
                        <TrashCan ref={provided.innerRef} {...provided.droppableProps} className="trash-can">
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
                                justifyContent: 'flex-start',
                                padding: '10px',
                            }}
                            {...provided.droppableProps}
                        >
                            {articleTs.map((articleT, index) => (
                                <Draggable
                                    key={articleT.index.toString()}
                                    draggableId={articleT.index.toString()}
                                    index={index}
                                >
                                    {(provided) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                        >
                                            {/* 요소 내용 */}
                                            <a
                                                href={articleT.recruitURL}
                                                key={articleT.index}
                                                id={articleT.index}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <img
                                                    style={{
                                                        width: '300px',
                                                        height: '200px',
                                                        boxShadow: '2px 2px 2px 2px rbga(0,0,0,0.3)',
                                                        borderRadius: '10px',
                                                    }}
                                                    src={articleT.thumbnailURL}
                                                    alt={`article ${articleT.index}`}
                                                />
                                            </a>
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </ContentContainer>
    );
};

export default Tech;
