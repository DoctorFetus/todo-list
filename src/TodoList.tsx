import React, {memo, useCallback, useEffect} from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from "./components/AddItemForm";
import {EditableSpan} from "./components/EditableSpan";
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Task from "./components/Task";
import {TaskType} from "./api/task-api";
import {useAppDispatch} from "./Redux/store";
import {getTaskTC} from "./Redux/reducers/tasks-reducer";


type PropsType = {
    todolistId: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    removeTodolist: (id: string) => void
    filter: FilterValuesType
    updateTask: (todolistId: string, taskId: string, updateTitle: string) => void
    updateTodolistTitle: (todolistId: string, updateTitle: string) => void
}

export const Todolist = memo((props: PropsType) => {

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getTaskTC(props.todolistId))
    }, [])

    let tasksForTodolist = props.tasks;

    if (props.filter === "active") {
        tasksForTodolist = tasksForTodolist.filter(t => !t.completed);
    }
    if (props.filter === "completed") {
        tasksForTodolist = tasksForTodolist.filter(t => t.completed);
    }


    const onAllClickHandler = useCallback(() => props.changeFilter("all", props.todolistId), [props.changeFilter, props.todolistId])
    const onActiveClickHandler = useCallback(() => props.changeFilter("active", props.todolistId), [props.changeFilter, props.todolistId])
    const onCompletedClickHandler = useCallback(() => props.changeFilter("completed", props.todolistId), [props.changeFilter, props.todolistId])

    const removeTodolist = useCallback(() => props.removeTodolist(props.todolistId), [props.removeTodolist, props.todolistId])

    const addTaskHandler = useCallback((newTitle: string) => {
        props.addTask(newTitle, props.todolistId)
    }, [props.todolistId, props.addTask])

    const updateTaskHandler = useCallback((taskID: string, updateTitle: string) => {
        props.updateTask(props.todolistId, taskID, updateTitle)
    }, [props.todolistId, props.updateTask])

    const updateTodolistTitleHandler = useCallback((updateTitle: string) => {
        props.updateTodolistTitle(props.todolistId, updateTitle)
    }, [props.todolistId, props.updateTodolistTitle])

    const removeTaskHandler = useCallback((taskID: string) => props.removeTask(taskID, props.todolistId), [props.todolistId, props.removeTask])

    const changeStatusHandler = useCallback((taskID: string, isDone: boolean) => {
        props.changeTaskStatus(taskID, isDone, props.todolistId);
    }, [props.changeTaskStatus])

    return <div>
        <h3>

            <EditableSpan oldTitle={props.title} callBack={updateTodolistTitleHandler}/>
            <IconButton onClick={removeTodolist} aria-label="delete">
                <DeleteIcon/>
            </IconButton>
        </h3>
        <div>
            <AddItemForm callBack={addTaskHandler}/>
        </div>
        <ul>
            {
                tasksForTodolist.map(task => {
                return <Task
                    key={task.id}
                    task={task}
                    changeTaskStatus={changeStatusHandler}
                    updateTask={updateTaskHandler}
                    removeTask={removeTaskHandler}
                />
                })
            }
        </ul>
        <div>
            <ButtonWithMemo variant={props.filter === 'all' ? "outlined" : "contained"}
                            color={"secondary"}
                            onClick={onAllClickHandler}
                            title={"all"}
            />
            <ButtonWithMemo variant={props.filter === 'active' ? "outlined" : "contained"}
                            color={"error"}
                            onClick={onActiveClickHandler}
                            title={"active"}
            />
            <ButtonWithMemo
                variant={props.filter === 'completed' ? "outlined" : "contained"}
                color={"success"}
                onClick={onCompletedClickHandler}
                title={"completed"}
            />
        </div>
    </div>
})

type ButtonWithMemoPropsType = {
    title: string
    color: 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning'
    variant: 'text' | 'outlined' | 'contained'
    onClick: () => void
}

const ButtonWithMemo = memo((props: ButtonWithMemoPropsType) => {

    return <Button variant={props.variant}
                   color={props.color}
                   onClick={props.onClick}
                   style={{margin: "0 3px"}}
    >{props.title}</Button>
})

