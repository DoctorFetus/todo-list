import React, {memo, useCallback} from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from "./components/AddItemForm";
import {EditableSpan} from "./components/EditableSpan";
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Task from "./components/Task";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
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

    let tasksForTodolist = props.tasks;

    if (props.filter === "active") {
        tasksForTodolist = tasksForTodolist.filter(t => !t.isDone);
    }
    if (props.filter === "completed") {
        tasksForTodolist = tasksForTodolist.filter(t => t.isDone);
    }


    const onAllClickHandler = useCallback(() => props.changeFilter("all", props.id), [props.changeFilter, props.id])
    const onActiveClickHandler = useCallback(() => props.changeFilter("active", props.id), [props.changeFilter, props.id])
    const onCompletedClickHandler = useCallback(() => props.changeFilter("completed", props.id), [props.changeFilter, props.id])

    const removeTodolist = useCallback(() => props.removeTodolist(props.id), [props.removeTodolist, props.id])

    const addTaskHandler = useCallback((newTitle: string) => {
        props.addTask(newTitle, props.id)
    }, [props.id, props.addTask])

    const updateTaskHandler = useCallback((taskID: string, updateTitle: string) => {
        props.updateTask(props.id, taskID, updateTitle)
    }, [props.id, props.updateTask])

    const updateTodolistTitleHandler = useCallback((updateTitle: string) => {
        props.updateTodolistTitle(props.id, updateTitle)
    }, [props.id, props.updateTodolistTitle])

    const removeTaskHandler = useCallback((taskID: string) => props.removeTask(taskID, props.id), [props.id, props.removeTask])

    const changeStatusHandler = useCallback((taskID: string, isDone: boolean) => {
        props.changeTaskStatus(taskID, isDone, props.id);
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

