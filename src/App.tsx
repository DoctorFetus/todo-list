import React, {Reducer, useReducer} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from "./components/AddItemForm";
import ButtonAppBar from "./components/ButtonAppBar";
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import {
    addTodolistAC,
    changeFilterAC,
    removeTodolistAC,
    todolistsReducer, todolistsReducerActionType,
    updateTodolistTitleAC
} from "./Redux/reducers/todolists-reducer";
import {
    addTaskAC,
    changeStatusAC,
    removeTaskAC,
    tasksReducer,
    updateTaskTitleAC
} from "./Redux/reducers/tasks-reducer";

export type FilterValuesType = "all" | "active" | "completed";
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}


function App() {
    let todolistId1 = v1();
    let todolistId2 = v1();

    const [todolists, dispatchToTodolists] = useReducer<Reducer<Array<TodolistType>,
        todolistsReducerActionType>>(todolistsReducer, [
            {id: todolistId1, title: "What to learn", filter: "all"},
            {id: todolistId2, title: "What to buy", filter: "all"}
        ])

    const [tasks, dispatchTasks] = useReducer(tasksReducer, {
        [todolistId1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: false}
        ],
        [todolistId2]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "React Book", isDone: false}
        ],
    })

    function removeTask(id: string, todolistId: string) {
        dispatchTasks(removeTaskAC(todolistId, id))
    }

    function changeStatus(id: string, isDone: boolean, todolistId: string) {
        dispatchTasks(changeStatusAC(todolistId, id, isDone))
    }
    function changeFilter(value: FilterValuesType, todolistId: string) {
        dispatchToTodolists(changeFilterAC(todolistId, value))
    }
    function removeTodolist(id: string) {
        const action = removeTodolistAC(id)
        dispatchToTodolists(action)
        dispatchTasks(action)
    }
    function addTask(title: string, todolistId: string) {
        dispatchTasks(addTaskAC(todolistId, title))
    }
    const addTodolist = (newTitle: string) => {
        const action = addTodolistAC(newTitle)
        dispatchToTodolists(action)
        dispatchTasks(action)
    }
    const updateTask = (todolistId: string, taskId: string, updateTitle: string) => {
        dispatchTasks(updateTaskTitleAC(todolistId, taskId, updateTitle))
    }
    const updateTodolistTitle = (todolistId: string, updateTitle: string) => {
        dispatchToTodolists(updateTodolistTitleAC(todolistId, updateTitle))
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

export default App;
