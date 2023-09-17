import React, { useState } from 'react';

interface ListItem {
    id: number; // 이미지의 고유 ID
    emoji: JSX.Element;
    name: string;
}

interface DragAndDropState {
    draggedFrom: number | null;
    draggedTo: number | null;
    isDragging: boolean;
    originalOrder: ListItem[];
    updatedOrder: ListItem[];
}

function DragAndDropList() {
    const [dragAndDrop, setDragAndDrop] = useState<DragAndDropState>({
        draggedFrom: null,
        draggedTo: null,
        isDragging: false,
        originalOrder: [],
        updatedOrder: [],
    });

    const [list, setList] = useState<ListItem[]>([]);

    const onDragStart = (event: React.DragEvent<HTMLLIElement>, position: number) => {
        event.currentTarget.style.opacity = '0.4';
        setDragAndDrop({
            ...dragAndDrop,
            draggedFrom: position,
            originalOrder: list,
        });
    };

    const onDragOver = (event: React.DragEvent<HTMLLIElement>, position: number) => {
        event.preventDefault();
        let newList = dragAndDrop.originalOrder;
        const draggedFrom = dragAndDrop.draggedFrom!;
        const draggedTo = position;
        const itemDragged = newList[draggedFrom];
        const remainingItems = newList.filter((item, index) => index !== draggedFrom);
        newList = [...remainingItems.slice(0, draggedTo), itemDragged, ...remainingItems.slice(draggedTo)];
        newList = newList.map((item, index) => ({ ...item, id: index })); // 인덱스 업데이트
        if (draggedTo !== dragAndDrop.draggedTo) {
            setDragAndDrop({
                ...dragAndDrop,
                updatedOrder: newList,
                draggedTo: draggedTo,
            });
        }
    };

    const onDrop = () => {
        setList(dragAndDrop.updatedOrder);
        setDragAndDrop({
            ...dragAndDrop,
            draggedFrom: null,
            draggedTo: null,
        });
    };

    const onDragLeave = (event: React.DragEvent<HTMLLIElement>) => {
        event.currentTarget.classList.remove('over');
        setDragAndDrop({
            ...dragAndDrop,
            draggedTo: null,
        });
    };

    const onDragEnter = (event: React.DragEvent<HTMLLIElement>) => {
        event.currentTarget.classList.add('over');
    };

    const onDragEnd = (event: React.DragEvent<HTMLLIElement>) => {
        event.currentTarget.style.opacity = '1';
        const listItems = document.querySelectorAll('.draggable');
        listItems.forEach((item) => {
            item.classList.remove('over');
        });
    };

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files) {
            const newImages = Array.from(files).map((file) => {
                return {
                    id: list.length, // 새 이미지에 고유 ID 부여
                    emoji: <img src={URL.createObjectURL(file)} alt={file.name} />,
                    name: file.name,
                };
            });
            setList([...list, ...newImages]);
        }
    };

    const handleTrashDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        const imageIndex = dragAndDrop.draggedFrom;
        if (imageIndex !== null) {
            const updatedList = list.filter((_, index) => index !== imageIndex);
            setList(updatedList);
            setDragAndDrop({
                ...dragAndDrop,
                draggedFrom: null,
                draggedTo: null,
            });
        }
    };

    return (
        <div>
            <input type="file" accept="image/*" onChange={handleFileUpload} />
            <div className="trash-can" onDragOver={(e) => e.preventDefault()} onDrop={handleTrashDrop}>
                🗑️
            </div>
            <ul>
                {list.map((item, index) => {
                    return (
                        <li
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                            className="draggable"
                            key={item.id} // 이미지의 고유 ID를 키로 사용
                            draggable={true}
                            data-position={item.id} // 이미지의 고유 ID를 포지션으로 사용
                            onDragStart={(e) => onDragStart(e, item.id)}
                            onDragOver={(e) => onDragOver(e, item.id)}
                            onDragLeave={onDragLeave}
                            onDrop={onDrop}
                            onDragEnter={onDragEnter}
                            onDragEnd={onDragEnd}
                        >
                            {item.emoji}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

export default DragAndDropList;
