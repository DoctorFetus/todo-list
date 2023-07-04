import React, {useCallback, useEffect} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {AddItemForm} from "./components/AddItemForm";
import ButtonAppBar from "./components/ButtonAppBar";
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import {
    addTodolistAC,
    changeFilterAC,
    getTodolistTC,
    removeTodolistAC,
    updateTodolistTitleAC
} from "./Redux/reducers/todolists-reducer";
import {addTaskTC, changeTaskStatusTC, deleteTaskTC, updateTaskTitleAC} from "./Redux/reducers/tasks-reducer";
import {useSelector} from "react-redux";
import {AppRootStateType, useAppDispatch} from "./Redux/store";
import {todolistSelector} from "./Redux/selectors/todolistSelectors";
import {tasksSelector} from "./Redux/selectors/tasksSelector";
import {TaskType} from "./api/task-api";

export type FilterValuesType = "all" | "active" | "completed";
export type OldTodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}


function App() {

    let todolists = useSelector<AppRootStateType, Array<OldTodolistType>>(todolistSelector)
    let tasks = useSelector<AppRootStateType, TasksStateType>(tasksSelector)

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getTodolistTC())
    }, [])

    const removeTask = useCallback((id: string, todolistId: string) => {
        dispatch(deleteTaskTC(todolistId, id))
    }, [dispatch])

    const changeStatus = useCallback((id: string, isDone: boolean, todolistId: string) => {
        dispatch(changeTaskStatusTC(todolistId, id, isDone))
    }, [dispatch])

    const changeFilter = useCallback((value: FilterValuesType, todolistId: string) => {
        dispatch(changeFilterAC(todolistId, value))
    }, [dispatch])

    const removeTodolist = useCallback((id: string) => {
        const action = removeTodolistAC(id)
        dispatch(action)
    }, [dispatch])

    const addTask = useCallback((title: string, todolistId: string) => {
        dispatch(addTaskTC(todolistId, title))
    }, [dispatch])

    const addTodolist = useCallback((newTitle: string) => {
        const action = addTodolistAC(newTitle)
        dispatch(action)
    }, [dispatch])

    const updateTask = useCallback((todolistId: string, taskId: string, updateTitle: string) => {
        dispatch(updateTaskTitleAC(todolistId, taskId, updateTitle))
    }, [dispatch])

    const updateTodolistTitle = useCallback((todolistId: string, updateTitle: string) => {
        dispatch(updateTodolistTitleAC(todolistId, updateTitle))
    }, [dispatch])


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

                            return <Grid item key={tl.id}>
                                <Paper elevation={3} style={{padding: "20px"}}>
                                    <Todolist
                                        todolistId={tl.id}
                                        title={tl.title}
                                        tasks={tasks[tl.id]}
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

export default App;
