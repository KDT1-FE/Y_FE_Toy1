import { atom } from 'recoil'

interface TodoItem {
    text : string,
    isComplete : boolean
}

export const todoListState = atom<TodoItem[]>({
    key : 'todoListState',
    default : [],
});