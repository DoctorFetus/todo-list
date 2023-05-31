import React from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {AddItemForm} from "./components/AddItemForm";
import ButtonAppBar from "./components/ButtonAppBar";
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import {
    addTodolistAC,
    changeFilterAC,
    removeTodolistAC,
    updateTodolistTitleAC
} from "./Redux/reducers/todolists-reducer";
import {addTaskAC, changeStatusAC, removeTaskAC, updateTaskTitleAC} from "./Redux/reducers/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./Redux/store";

export type FilterValuesType = "all" | "active" | "completed";
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}


function AppWithRedux() {

    let todolists = useSelector<AppRootStateType, Array<TodolistType>>(state => state.todolists)
    let tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)

    const dispatch = useDispatch()

    function removeTask(id: string, todolistId: string) {
        dispatch(removeTaskAC(todolistId, id))
    }

    function changeStatus(id: string, isDone: boolean, todolistId: string) {
        dispatch(changeStatusAC(todolistId, id, isDone))
    }
    function changeFilter(value: FilterValuesType, todolistId: string) {
        dispatch(changeFilterAC(todolistId, value))
    }
    function removeTodolist(id: string) {
        const action = removeTodolistAC(id)
        dispatch(action)
    }
    function addTask(title: string, todolistId: string) {
        dispatch(addTaskAC(todolistId, title))
    }
    const addTodolist = (newTitle: string) => {
        const action = addTodolistAC(newTitle)
        dispatch(action)
    }
    const updateTask = (todolistId: string, taskId: string, updateTitle: string) => {
        dispatch(updateTaskTitleAC(todolistId, taskId, updateTitle))
    }
    const updateTodolistTitle = (todolistId: string, updateTitle: string) => {
        dispatch(updateTodolistTitleAC(todolistId, updateTitle))
    }


    return (
        <div className="App">
            <ButtonAppBar/>
            <Container fixed>
                <Grid container style={{padding: "30px"}}>
                    <AddItemForm callBack={addTodolist}/>
                </Grid>
                <Grid container spacing={5}>
                    {
                        todolists.map(tl => {
                            let allTodolistTasks = tasks[tl.id];
                            let tasksForTodolist = allTodolistTasks;

                            if (tl.filter === "active") {
                                tasksForTodolist = allTodolistTasks.filter(t => !t.isDone);
                            }
                            if (tl.filter === "completed") {
                                tasksForTodolist = allTodolistTasks.filter(t => t.isDone);
                            }
                            return <Grid item key={tl.id}>
                                <Paper elevation={3} style={{padding: "20px"}}>
                                    <Todolist
                                        id={tl.id}
                                        title={tl.title}
                                        tasks={tasksForTodolist}
                                        removeTask={removeTask}
                                        changeFilter={changeFilter}
                                        addTask={addTask}
                                        changeTaskStatus={changeStatus}
                                        filter={tl.filter}
                                        removeTodolist={removeTodolist}
                                        updateTask={updateTask}
                                        updateTodolistTitle={updateTodolistTitle}
                                    />
                                </Paper>
                            </Grid>
                        })
                    }
                </Grid>

            </Container>
        </div>
    );
}

export default AppWithRedux;
