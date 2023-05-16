import {FilterValuesType, TodolistType} from "../App";

export const todolistsReducer = (state: Array<TodolistType>, action: todolistsReducerActionType): Array<TodolistType> => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return state.filter(tl => tl.id !== action.payload.id)
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
            throw new Error("Incorrect TODOLISTS action type")
    }
}


type todolistsReducerActionType = RemoveTodolistType | AddTodolistType | UpdateTodolistTitleType | changeFilterType

type RemoveTodolistType = ReturnType<typeof removeTodolistAC>
export const removeTodolistAC = (id: string) => {
    return {
        type: "REMOVE-TODOLIST",
        payload: {id}
    } as const
}

type AddTodolistType = ReturnType<typeof addTodolistAC>
export const addTodolistAC = (newTodolistID: string, newTitle: string) => {
    return {
        type: "ADD-TODOLIST",
        payload: {newTodolistID, newTitle}
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

