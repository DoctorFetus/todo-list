import React, {useState} from 'react';
import './App.css';
import TodoList, {TaskType} from "./TodoList";

export type FilterValuesType = "all" | "active" | "completed"

function App() {

    const todoListTitle: string = "What to learn";

    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 2, title: "JS/ES6&TS", isDone: true},
        {id: 3, title: "REACT", isDone: false},
        {id: 4, title: "REDUX", isDone: false},
        {id: 5, title: "ANGULAR", isDone: false}
    ])

    const removeTask = (taskID: number) => {
        setTasks(tasks.filter(task => task.id != taskID))
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
            />
        </div>
    );
}

export default App;
