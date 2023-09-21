import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import Modal from './UploadModal/Modal';
import { onSnapshot, updateDoc, DocumentData } from 'firebase/firestore';
import { ref, deleteObject, StorageReference } from 'firebase/storage';
import { storeRef, storage } from '../../utils/firebase';
import {
    ArticleContainer,
    ChildArticle,
    ContentContainer,
    Description,
    ModalBackground,
    TrashCan,
    UploadBtn,
} from './style';
import swal from 'sweetalert';

// Firebase Firestore에서 반환되는 데이터의 타입
interface FirebaseArticleData {
    index: number;
    recruitURL: string;
    thumbnailURL: string;
    description: string;
}

const Recruit: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [articleRs, setArticleRs] = useState<FirebaseArticleData[]>([]);
    const [isDraggingItem, setIsDraggingItem] = useState<boolean>(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleDragStart = () => {
        setIsDraggingItem(true);
    };

    const handleDragEnd = async (result: DropResult) => {
        setIsDraggingItem(false);

        if (result.destination) {
            if (result.destination.droppableId === 'trashCan') {
                const itemToDelete = articleRs[result.source.index];

                const shouldDelete = await swal({
                    title: '정말로 사진을 삭제하시겠습니까?',
                    text: '삭제 버튼을 누르시면 사진 파일이 사라집니다!',
                    icon: 'info',
                    buttons: ['취소', '삭제'],
                });

                if (shouldDelete) {
                    // Firestore에서 해당 요소 삭제
                    const updatedArticleRs = [...articleRs];
                    updatedArticleRs.splice(result.source.index, 1);
                    await updateDoc(storeRef, {
                        '취업.articleR': updatedArticleRs,
                    });

                    // Storage에서 이미지 파일 삭제
                    const imageRef: StorageReference = ref(storage, `thumbnailR/${itemToDelete.index}`);
                    await deleteObject(imageRef);

                    // 상태 업데이트
                    setArticleRs(updatedArticleRs);
                } else {
                    swal('사진 삭제를 취소합니다!');
                }
            } else {
                // 기존 드래그 앤 드롭 로직 (항목의 순서 변경)
                const newArticleRs = [...articleRs];
                const [reorderedItem] = newArticleRs.splice(result.source.index, 1);
                newArticleRs.splice(result.destination.index, 0, reorderedItem);

                await updateDoc(storeRef, {
                    '취업.articleR': newArticleRs,
                });
            }
        }
    };

    // 실시간 데이터 연동
    useEffect(() => {
        const unsubscribe = onSnapshot(storeRef, (docSnapshot: DocumentData) => {
            if (docSnapshot.exists()) {
                const data = docSnapshot.data();
                const articleRData: FirebaseArticleData[] = data?.취업?.articleR || [];
                setArticleRs(articleRData);
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
                    <Modal onClose={closeModal} />
                </div>
            )}
            <UploadBtn onClick={openModal} style={{ opacity: isDraggingItem ? '0' : '1', zIndex: '1' }}></UploadBtn>
            <ArticleContainer>
                <DragDropContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
                    <Droppable droppableId="trashCan">
                        {(provided) => (
                            <TrashCan
                                ref={provided.innerRef}
                                style={{
                                    opacity: isDraggingItem === true ? '1' : '0',
                                    zIndex: isDraggingItem === true ? '2' : '0',
                                }}
                                {...provided.droppableProps}
                            >
                                {provided.placeholder}
                            </TrashCan>
                        )}
                    </Droppable>
                    <Droppable droppableId="yourDroppableId">
                        {(provided) => (
                            <ul
                                ref={provided.innerRef}
                                style={{
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                    gap: ' 0 98px',
                                    justifyContent: 'flex-start',
                                    alignContent: 'flex-start',
                                    marginBlock: '0px',
                                    paddingInlineStart: '0px',
                                    width: '1100px',
                                    paddingTop: '3%',
                                }}
                                {...provided.droppableProps}
                            >
                                {articleRs.map((articleR, index) => (
                                    <Draggable
                                        key={articleR.index.toString()}
                                        draggableId={articleR.index.toString()}
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
                                                    href={articleR.recruitURL}
                                                    key={articleR.index}
                                                    id={articleR.index.toString()}
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
                                                        src={articleR.thumbnailURL}
                                                        alt={`article ${articleR.index}`}
                                                    />
                                                    <Description>
                                                        {articleR.description
                                                            .split('\n')
                                                            .map((line: string, index: number) => (
                                                                <React.Fragment key={index}>
                                                                    {line}
                                                                    <br />
                                                                </React.Fragment>
                                                            ))}
                                                    </Description>
                                                </a>
                                            </ChildArticle>
                                        )}
                                    </Draggable>
                                ))}

                                {provided.placeholder}
                            </ul>
                        )}
                    </Droppable>
                </DragDropContext>
            </ArticleContainer>
        </ContentContainer>
    );
};

export default Recruit;
