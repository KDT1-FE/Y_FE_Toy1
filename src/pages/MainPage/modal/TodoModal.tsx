import React, { useState } from "react";
import { useRecoilState } from "recoil";
import {
  TodoModalLayout
  , ExitBtn
  , TodoContainer
  , TodoItemContainer
  , TodoInput
  , AddBtn
  , DeleteBtn,
  TodoTitle
} from "../../../styled/MainPage/TodoModal";
import { todoListState } from "../../../recoil/atoms/main/TodoAtom";
import { CloseImg } from "../../../styled/Common/Modal";
import ClostButton from "../../../assets/img/CloseButton.svg"

interface TodoProps {
  setActiveModalIdx: React.Dispatch<React.SetStateAction<number>>;
}

interface TodoItem {
  text: string;
  isComplete: boolean;
}
function replaceItemAtIndex(
  arr: TodoItem[],
  index: number,
  newValue: TodoItem
): TodoItem[] {
  return [...arr.slice(0, index), newValue, ...arr.slice(index + 1)];
}

function removeItemAtIndex(arr: TodoItem[], index: number): TodoItem[] {
  return [...arr.slice(0, index), ...arr.slice(index + 1)];
}

function TodoModal({ setActiveModalIdx }: TodoProps) {
  const [inputValue, setInputValue] = useState("");
  const [todoList, setTodoList] = useRecoilState(todoListState);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const addItem = () => {
    if (inputValue === null || inputValue === '') {
      alert("값을 입력해주세요");
      return;

    }
    setTodoList((oldTodoList) => [
      ...oldTodoList,
      {
        text: inputValue,
        isComplete: false,
      },
    ]);
    setInputValue("");
  };
  const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      addItem();
    }
  }
  const editItemText = (index: number, newText: string) => {
    const newList = replaceItemAtIndex(todoList, index, {
      ...todoList[index],
      text: newText,
    });
    setTodoList(newList);
  };

  const toggleItemComplete = (index: number) => {
    const newList = replaceItemAtIndex(todoList, index, {
      ...todoList[index],
      isComplete: !todoList[index].isComplete,
    });
    setTodoList(newList);
  };

  const deleteItem = (index: number) => {
    const newList = removeItemAtIndex(todoList, index);
    setTodoList(newList);
  };

  return (
    <TodoModalLayout>
      <ExitBtn onClick={() => setActiveModalIdx(-1)}>
        <CloseImg src={ClostButton} alt="" />
      </ExitBtn>

      <TodoTitle>TO DO</TodoTitle>
      <TodoItemContainer>
        <TodoInput type="text" value={inputValue} onChange={handleChange} onKeyDown={handleInputKeyDown} />
        <AddBtn type="submit" onClick={addItem}>Add</AddBtn>
      </TodoItemContainer>
      <TodoContainer>
        {todoList.map((todoItem, index) => (

          <TodoItemContainer key={index}>
            <input
              type="checkbox"
              checked={todoItem.isComplete}
              onChange={() => toggleItemComplete(index)}
            />
            <TodoInput
              type="text"
              value={todoItem.text}
              onChange={(e) => editItemText(index, e.target.value)}
              style={{
                textDecoration: todoItem.isComplete ? "line-through" : "none",
                background: todoItem.isComplete ? "#E9ECEF" : "white"
              }}
            />

            <DeleteBtn onClick={() => deleteItem(index)}>X</DeleteBtn>
          </TodoItemContainer>
        ))}
      </TodoContainer>
    </TodoModalLayout>
  );
}

export default TodoModal;
