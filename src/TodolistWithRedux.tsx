import React from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from "./components/AddItemForm";
import {EditableSpan} from "./components/EditableSpan";
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import SuperCheckbox from "./components/SuperCheckbox";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./Redux/store";
import {addTaskAC, changeStatusAC, removeTaskAC, updateTaskTitleAC} from "./Redux/reducers/tasks-reducer";
import {changeFilterAC, removeTodolistAC, updateTodolistTitleAC} from "./Redux/reducers/todolists-reducer";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    filter: FilterValuesType
}

export function TodolistWithRedux(props: PropsType) {

    const tasks = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[props.id])

    const dispatch = useDispatch()


    const onAllClickHandler = () => changeFilter("all");
    const onActiveClickHandler = () => changeFilter("active");
    const onCompletedClickHandler = () => changeFilter("completed");


    let allTodolistTasks = tasks;
    let tasksForTodolist = allTodolistTasks;

    if (props.filter === "active") {
        tasksForTodolist = allTodolistTasks.filter(t => !t.isDone);
    }
    if (props.filter === "completed") {
        tasksForTodolist = allTodolistTasks.filter(t => t.isDone);
    }



    const addTaskHandler = (newTitle: string) => {
        dispatch(addTaskAC(props.id, newTitle))
    }

    const updateTodolistTitle = (updateTitle: string) => {
        dispatch(updateTodolistTitleAC(props.id, updateTitle))
    }

    function removeTodolist() {
        dispatch(removeTodolistAC(props.id))
    }

    function changeFilter(value: FilterValuesType) {
        dispatch(changeFilterAC(props.id, value))
    }

    function removeTask(id: string) {
        dispatch(removeTaskAC(props.id, id))
    }

    const updateTask = (taskId: string, updateTitle: string) => {
        dispatch(updateTaskTitleAC(props.id, taskId, updateTitle))
    }

    function changeStatus(id: string, isDone: boolean) {
        dispatch(changeStatusAC(props.id, id, isDone))
    }

    return <div>
        <h3>

            <EditableSpan oldTitle={props.title} callBack={updateTodolistTitle}/>
            <IconButton onClick={removeTodolist} aria-label="delete">
                <DeleteIcon/>
            </IconButton>
        </h3>
        <div>
            <AddItemForm callBack={addTaskHandler}/>
        </div>
        <ul>
            {
                tasksForTodolist.map(t => {
                    const onClickHandler = () => removeTask(t.id)

                    return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                        <SuperCheckbox
                            callback={(isDone) => changeStatus(t.id, isDone)}
                            checked={t.isDone}
                            color={"success"}
                        />
                        <EditableSpan oldTitle={t.title}
                                      callBack={(updateTitle) => updateTask(t.id, updateTitle)}/>
                        <IconButton onClick={onClickHandler} aria-label="delete">
                            <DeleteIcon/>
                        </IconButton>
                    </li>
                })
            }
        </ul>
        <div>
            <Button variant={props.filter === 'all' ? "outlined" : "contained"}
                    color={"secondary"}
                    onClick={onAllClickHandler}
                    style={{margin: "0 3px"}}
            >All</Button>
            <Button variant={props.filter === 'active' ? "outlined" : "contained"}
                    color={"error"}
                    onClick={onActiveClickHandler}
                    style={{margin: "0 3px"}}
            >active</Button>
            <Button variant={props.filter === 'completed' ? "outlined" : "contained"}
                    color={"success"}
                    onClick={onCompletedClickHandler}
                    style={{margin: "0 3px"}}
            >completed</Button>
        </div>
    </div>
}


