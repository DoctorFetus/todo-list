import {TasksStateType} from "../../App";
import {v1} from "uuid";
import {AddTodolistType, RemoveTodolistType} from "./todolists-reducer";



const initialState: TasksStateType = {}

export const tasksReducer = (state = initialState, action: taskReducerActionType): TasksStateType => {
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
        case "REMOVE-TODOLIST":
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
        case "ADD-TODOLIST":
            return {
                ...state,
                [action.payload.newTodolistID]: []
            }

        default:
            return state
    }
}

export type taskReducerActionType =
    RemoveTaskType | ChangeStatusType | AddTaskType |
      UpdateTaskTitleType | AddTodolistType | RemoveTodolistType

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

type UpdateTaskTitleType = ReturnType<typeof updateTaskTitleAC>
export const updateTaskTitleAC = (todolistID: string, taskID: string, newTitle: string) => {
    return {
        type: "UPDATE-TASK-TITLE",
        payload: {todolistID, taskID, newTitle}
    } as const
}




