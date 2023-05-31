import {FilterValuesType, TodolistType} from "../../App";
import {v1} from "uuid";

const initialState: Array<TodolistType> = []

export const todolistsReducer = (state = initialState, action: todolistsReducerActionType): Array<TodolistType> => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return state.filter(tl => tl.id !== action.payload.todolistID)
        case "ADD-TODOLIST":
            const newTodolist: TodolistType =
                {id: action.payload.newTodolistID, title: action.payload.newTitle, filter: "all"}
            return [...state, newTodolist]
        case "CHANGE-TITLE":
            return state.map(todolist => todolist.id === action.payload.todolistID
                ? {...todolist, title: action.payload.updateTitle}
                : todolist)
        case "CHANGE-FILTER":
            return state.map(todolist => todolist.id === action.payload.todolistID
                ? {...todolist, filter: action.payload.newFilter}
                : todolist)
        default:
            return state
    }
}


export type todolistsReducerActionType = RemoveTodolistType | AddTodolistType | UpdateTodolistTitleType | changeFilterType

export type RemoveTodolistType = ReturnType<typeof removeTodolistAC>
export const removeTodolistAC = (todolistID: string) => {
    return {
        type: "REMOVE-TODOLIST",
        payload: {todolistID}
    } as const
}

export type AddTodolistType = ReturnType<typeof addTodolistAC>
export const addTodolistAC = (newTitle: string) => {
    return {
        type: "ADD-TODOLIST",
        payload: {newTodolistID: v1(), newTitle}
    } as const
}

type UpdateTodolistTitleType = ReturnType<typeof updateTodolistTitleAC>
export const updateTodolistTitleAC = (todolistID: string, updateTitle: string,) => {
    return {
        type: "CHANGE-TITLE",
        payload: {todolistID, updateTitle}
    } as const
}

type changeFilterType = ReturnType<typeof changeFilterAC>
export const changeFilterAC = (todolistID: string, newFilter: FilterValuesType,) => {
    return {
        type: "CHANGE-FILTER",
        payload: {todolistID, newFilter}
    } as const
}

