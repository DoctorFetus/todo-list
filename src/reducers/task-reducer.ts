import {TasksStateType} from "../App";
import {v1} from "uuid";

export const taskReducer = (state: TasksStateType, action: taskReducerActionType): TasksStateType => {
    switch (action.type) {
        case "REMOVE-TASK":
            return {
                ...state,
                [action.payload.todolistID]: state[action.payload.todolistID]
                    .filter(task => task.id !== action.payload.taskID)
            }
        case "CHANGE-STATUS":
            return {
                ...state,
                [action.payload.todolistID]: state[action.payload.todolistID]
                    .map(task => task.id === action.payload.taskID
                        ? {...task, isDone: action.payload.isDone}
                        : task)
            }
        case "ADD-TASK":
            const newTask = {id: v1(), title: action.payload.taskTitle, isDone: false}
            return {
                ...state,
                [action.payload.todolistID]: [newTask, ...state[action.payload.todolistID]]
            }
        case "REMOVE-TODOLIST-TASKS":
            delete state[action.payload.todolistID]
            return {
                ...state,
            }
        case "UPDATE-TASK-TITLE":
            return {
                ...state,
                [action.payload.todolistID]: state[action.payload.todolistID]
                    .map(task => task.id === action.payload.taskID
                        ? {...task, title: action.payload.newTitle}
                        : task)
            }
        case "ADD-NEW-TODOLIST-TASKS":
            return {
                ...state,
                [action.payload.todolistID]: []
            }

        default:
            throw new Error("Incorrect TASKS action type")
    }
}

type taskReducerActionType =
    RemoveTaskType | ChangeStatusType | AddTaskType | RemoveTodolistTasks | UpdateTaskTitleType | AddNewTodolistTasksType

type RemoveTaskType = ReturnType<typeof removeTaskAC>
export const removeTaskAC = (todolistID: string, taskID: string) => {
    return {
        type: "REMOVE-TASK",
        payload: {todolistID, taskID}
    } as const
}

type ChangeStatusType = ReturnType<typeof changeStatusAC>
export const changeStatusAC = (todolistID: string, taskID: string, isDone: boolean) => {
    return {
        type: "CHANGE-STATUS",
        payload: {todolistID, taskID, isDone}
    } as const
}

type AddTaskType = ReturnType<typeof addTaskAC>
export const addTaskAC = (todolistID: string, taskTitle: string) => {
    return {
        type: "ADD-TASK",
        payload: {todolistID, taskTitle}
    } as const
}

type RemoveTodolistTasks = ReturnType<typeof removeTodolistTasksAC>
export const removeTodolistTasksAC = (todolistID: string) => {
    return {
        type: "REMOVE-TODOLIST-TASKS",
        payload: {todolistID}
    } as const
}

type UpdateTaskTitleType = ReturnType<typeof updateTaskTitleAC>
export const updateTaskTitleAC = (todolistID: string, taskID: string, newTitle: string) => {
    return {
        type: "UPDATE-TASK-TITLE",
        payload: {todolistID, taskID, newTitle}
    } as const
}

type AddNewTodolistTasksType = ReturnType<typeof addNewTodolistTasksAC>
export const addNewTodolistTasksAC = (todolistID: string) => {
    return {
        type: "ADD-NEW-TODOLIST-TASKS",
        payload: {todolistID}
    } as const
}



