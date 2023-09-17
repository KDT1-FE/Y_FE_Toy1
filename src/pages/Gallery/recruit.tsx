import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Modal from './UploadModal/Modal';
import { doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { firestore } from '../../utils/firebase';

const Recruit: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [articleRs, setArticleRs] = useState<any[]>([]);
    const storeRef = doc(firestore, 'gallery', '레퍼런스 공유');

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleDragEnd = async (result: any) => {
        if (!result.destination) {
            return;
        }

        const newArticleRs = [...articleRs];
        const [reorderedItem] = newArticleRs.splice(result.source.index, 1);
        newArticleRs.splice(result.destination.index, 0, reorderedItem);

        try {
            await updateDoc(storeRef, {
                '취업.articleR': newArticleRs,
            });
        } catch (error) {
            console.error('Error updating data:', error);
        }
    };

    useEffect(() => {
        const unsubscribe = onSnapshot(storeRef, (docSnapshot) => {
            if (docSnapshot.exists()) {
                const data = docSnapshot.data();
                const articleRData = data?.취업?.articleR || [];
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
        <>
            <div>
                <button onClick={openModal}>업로드</button>
                {isModalOpen && <Modal onClose={closeModal} />}
            </div>
            <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="yourDroppableId">
                    {(
                        provided,
                        // 하나의 자식 함수로 변경
                    ) => (
                        <div ref={provided.innerRef} {...provided.droppableProps}>
                            {articleRs.map((articleR, index) => (
                                <Draggable
                                    key={articleR.index.toString()}
                                    draggableId={articleR.index.toString()}
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
                                                href={articleR.recruitURL}
                                                key={articleR.index}
                                                id={articleR.index}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <img src={articleR.thumbnailURL} alt={`article ${articleR.index}`} />
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
        </>
    );
};

export default Recruit;
