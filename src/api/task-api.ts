import {instance} from "./instance";

export const tasksApi = {
    getTasks(todolistId: string) {
        return instance.get<ResponseType<TaskType[]>>(`todo-lists/${todolistId}/tasks`)
    },
    addTask(todolistId: string, title: string) {
        return instance.post<ResponseType>(`todo-lists/${todolistId}/tasks`, {title})
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`)
    },
    updateTask(todolistId: string, taskId: string, changes: TaskRequestType) {
        return instance.put<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`, changes)
    }
}

type TaskType = {
    description: string
    title: string
    completed: boolean
    status: number
    priority: number
    startDate: Date
    deadline: Date
    id: string
    todoListId: string
    order: number
    addedDate: Date
}

type ResponseType<T={}> = {
    resultCode: 0,
    messages: string[],
    data: T
}

type TaskRequestType = {
    title?: string
    description?: string
    completed?: boolean
    status?: number
    priority?: number
    startDate?: Date
    deadline?: Date
}