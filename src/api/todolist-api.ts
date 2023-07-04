import {instance} from "./instance";


export const todolistApi = {
    getTodolists() {
        return instance.get<TodolistType[]>("todo-lists")
    },
    createTodolist(title: string) {
        return instance.post<ResponseType<{item: TodolistType}>>(`todo-lists`, {title})
    },
    deleteTodolist(todolistID: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistID}`)
    },
    updateTodolist(todolistID: string, title: string) {
        return instance.put<ResponseType>(`todo-lists/${todolistID}`, {title})
    }
}

export type TodolistType = {
    "id": string
    "title": string,
    "addedDate": Date,
    "order": number
}

type ResponseType<T={}> = {
    resultCode: 0,
    messages: string[],
    data: T
}

