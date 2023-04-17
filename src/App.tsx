import React, {useState} from 'react';
import './App.css';
import TodoList, {TaskType} from "./TodoList";
import {v1} from "uuid";

export type FilterValuesType = "all" | "active" | "completed"

function App() {

    const todoListTitle: string = "What to learn";

    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: "HTML&CSS", isDone: false},
        {id: v1(), title: "JS/ES6&TS", isDone: false},
        {id: v1(), title: "REACT", isDone: false},
        {id: v1(), title: "REDUX", isDone: false},
    ])

    const removeTask = (taskID: string) => {
        setTasks(tasks.filter(task => task.id != taskID))
    }

    const addTask = (title: string) => {
        const newTask = {
            id: v1(),
            title: title,
            isDone: false
        }
        setTasks([newTask, ...tasks])
    }

    const changeTaskStatus = (taskId: string, newIsDoneValue: boolean) => {
        setTasks(tasks.map(t => t.id === taskId ? {...t, isDone: newIsDoneValue} : t))
    }

    const [filter, setFilter] = useState<FilterValuesType>("all")

    const getTasksForMe = (taskList: Array<TaskType>, filterValue: FilterValuesType) => {
        switch (filterValue) {
            case "active":
                return tasks.filter(task => !task.isDone)
            case "completed":
                return tasks.filter(task => task.isDone)
            default:
                return tasks
        }
    }

    const tasksWhatIWantToSee = getTasksForMe(tasks, filter)
    const changeFilter = (nextFilter: FilterValuesType) => {
        setFilter(nextFilter)
    }

    return (
        <div className="App">
            <TodoList title={todoListTitle}
                      tasks={tasksWhatIWantToSee}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
                      addTask={addTask}
                      changeTaskStatus={changeTaskStatus}
                      filter={filter}
            />
        </div>
    );
}

export default App;
