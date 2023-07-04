import {TasksStateType} from "../../App";
import {AddTodolistType, RemoveTodolistType, SetTodolistsType} from "./todolists-reducer";
import {Dispatch} from "redux";
import {TaskRequestType, tasksApi, TaskType} from "../../api/task-api";
import {AxiosResponse} from "axios";
import {AppRootStateType} from "../store";


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
                        ? {...task, completed: action.payload.completed}
                        : task)
            }
        case "ADD-TASK":
            return {
                ...state,
                [action.payload.task.todoListId]: [action.payload.task, ...state[action.payload.task.todoListId]]
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
        case "SET-TODO-LISTS":
            const copyState = {...state}
            action.payload.todos.forEach(el => {
                copyState[el.id] = []
            })
            return copyState
        case "SET-TASKS":
            return {
                ...state,
                [action.payload.todolistId]: action.payload.tasks
            }
        default:
            return state
    }
}

export type taskReducerActionType =
    RemoveTaskType
    | ChangeStatusType
    | AddTaskType
    | UpdateTaskTitleType
    | AddTodolistType
    | RemoveTodolistType
    | SetTodolistsType
    | SetTasksType

type RemoveTaskType = ReturnType<typeof removeTaskAC>
export const removeTaskAC = (todolistID: string, taskID: string) => {
    return {
        type: "REMOVE-TASK",
        payload: {todolistID, taskID}
    } as const
}

type ChangeStatusType = ReturnType<typeof changeStatusAC>
export const changeStatusAC = (todolistID: string, taskID: string, completed: boolean) => {
    return {
        type: "CHANGE-STATUS",
        payload: {todolistID, taskID, completed}
    } as const
}

type AddTaskType = ReturnType<typeof addTaskAC>
export const addTaskAC = (task: TaskType) => {
    return {
        type: "ADD-TASK",
        payload: {task}
    } as const
}

type UpdateTaskTitleType = ReturnType<typeof updateTaskTitleAC>
export const updateTaskTitleAC = (todolistID: string, taskID: string, newTitle: string) => {
    return {
        type: "UPDATE-TASK-TITLE",
        payload: {todolistID, taskID, newTitle}
    } as const
}

type SetTasksType = ReturnType<typeof setTasks>
export const setTasks = (todolistId: string, tasks: TaskType[]) => {
    return {
        type: "SET-TASKS",
        payload: {todolistId, tasks}
    } as const
}

export const getTaskTC = (todolistId: string) => (dispatch: Dispatch) => {
    tasksApi.getTasks(todolistId)
        .then((response: AxiosResponse) => {
            dispatch(setTasks(todolistId, response.data.items))
        })
}

export const deleteTaskTC = (todolistId: string, taskId: string) => (dispatch: Dispatch) => {
    tasksApi.deleteTask(todolistId, taskId)
        .then(() => {
            dispatch(removeTaskAC(todolistId, taskId))
        })
}

export const addTaskTC = (todolistId: string, title: string) => (dispatch: Dispatch) => {
    tasksApi.addTask(todolistId, title)
        .then((response: AxiosResponse) => {
            dispatch(addTaskAC(response.data.data.item))
        })
}

export const changeTaskStatusTC = (todolistId: string, taskId: string, completed: boolean) =>
    (dispatch: Dispatch, getState: () => AppRootStateType) => {
        const task = getState().tasks[todolistId].find(task => task.id === taskId)
        const model: TaskRequestType = {
            title: task!.title,
            startDate: task!.startDate,
            priority: task!.priority,
            description: task!.description,
            deadline: task!.deadline,
            status: task!.status,
            completed: task!.completed
        }
    tasksApi.updateTask(todolistId, taskId, model)
        .then(() => {
            dispatch(changeStatusAC(todolistId, taskId, completed))
        })
}