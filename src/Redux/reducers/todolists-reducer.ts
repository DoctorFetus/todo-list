import {FilterValuesType, OldTodolistType} from "../../App";
import {v1} from "uuid";
import {todolistApi, TodolistType} from "../../api/todolist-api";
import {Dispatch} from "redux";

const initialState: Array<OldTodolistType> = []

export const todolistsReducer = (state = initialState, action: todolistsReducerActionType): Array<OldTodolistType> => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return state.filter(tl => tl.id !== action.payload.todolistID)
        case "ADD-TODOLIST":
            const newTodolist: OldTodolistType =
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
        case "SET-TODO-LISTS":
                return action.payload.todos.map(tl => ({...tl, filter: 'all'}))
        default:
            return state
    }
}


export type todolistsReducerActionType = RemoveTodolistType | AddTodolistType
    | UpdateTodolistTitleType | changeFilterType | SetTodolistsType

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

export type SetTodolistsType = ReturnType<typeof setTodolists>
export const setTodolists = (todos: TodolistType[]) => {
    return {
    type: "SET-TODO-LISTS",
    payload: {todos}
    } as const
}


export const getTodolistTC = () => (dispatch: Dispatch) => {
    todolistApi.getTodolists()
        .then((response) => {
            dispatch(setTodolists(response.data))
        })
}