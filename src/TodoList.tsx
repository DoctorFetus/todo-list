import React, {ChangeEvent, useState, KeyboardEvent} from "react";
import {FilterValuesType} from "./App";

type TodoListPropsType = {
    title: string;
    tasks: Array<TaskType>;
    filter: FilterValuesType
    removeTask: (todolistID: string, taskID: string) => void
    changeFilter: (todolistID: string, filter: FilterValuesType) => void
    addTask: (todolistID: string, title: string) => void
    changeTaskStatus: (todolistID: string, id: string, isDone: boolean) => void
    todolistID: string
    removeTodolist: (todolistID: string) => void
}

export type TaskType = {
    id: string;
    title: string;
    isDone: boolean;
}

const TodoList: React.FC<TodoListPropsType> = (props) => {
    const [title, setTitle] = useState<string>("")
    const [error, setError] = useState<boolean>(false)
    // const taskInput = useRef<HTMLInputElement>(null)
    // const addTaskHandler = () => {
    //     if (taskInput.current) {
    //         props.addTask(taskInput.current.value)
    //         taskInput.current.value = ""
    //     }
    // }

    const setTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        error && setError(false)
    }
    const tasksJSXElements: Array<JSX.Element> = props.tasks.map((task: TaskType) => {

        const removeTask = () => props.removeTask(props.todolistID, task.id)
        const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(props.todolistID, task.id, e.currentTarget.checked)

        const taskClasses = task.isDone ? "taskIsDone" : "task"
        return (
            <li key={task.id}>
                <div>
                <input type="checkbox"
                       checked={task.isDone}
                       onChange={changeTaskStatus}
                />
                <span className={taskClasses}>{task.title}</span>
                </div>
                <button onClick={removeTask}>x</button>
            </li>
        )
    })
    const titleMaxLength = 25
    const isTitleLengthTooLong: boolean = title.length > titleMaxLength
    const isBtnDisabled: boolean = !title.length || isTitleLengthTooLong

    const maxTitleLengthAlert = isTitleLengthTooLong
        ? <div style={{color: "red"}}>Title is too long!</div>
        : null
    const userMessage = error
        ? <div style={{color: "red"}}>Title is required!</div>
        : null


    const addTaskHandler = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            props.addTask(props.todolistID, title)
        } else {
            setError(true)
        }
        setTitle("")
    }

    const addTaskOnKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => e.key === "Enter" && !isBtnDisabled && addTaskHandler()
    const handlerCreator = (todolistID: string, filter: FilterValuesType) => () => props.changeFilter(todolistID, filter)
    const removeTodolist = () => props.removeTodolist(props.todolistID)

    const inputClasses = error || isTitleLengthTooLong ? "inputError" : ""

    return (
        <div className="todolist">
            <h3>{props.title}</h3>
            <button onClick={removeTodolist}>del</button>
            <div>
                <input className={inputClasses}
                    placeholder={"Please, enter title"}
                    // ref={taskInput}
                    value={title}
                    onChange={setTitleHandler}
                    onKeyDown={addTaskOnKeyDownHandler}
                />
                <button
                    // onClick={addTaskHandler}
                    onClick={addTaskHandler}
                    disabled={isBtnDisabled}
                >+</button>
                {maxTitleLengthAlert || userMessage}
            </div>
            <ul>
                {tasksJSXElements}
            </ul>
            <div className="filterBtnWrapper">
                <button className={props.filter == "all" ? "filterBtnActive" : "btn"} onClick={handlerCreator(props.todolistID, "all")}>All</button>
                <button className={props.filter == "active" ? "filterBtnActive" : "btn"} onClick={handlerCreator(props.todolistID, "active")}>Active</button>
                <button className={props.filter == "completed" ? "filterBtnActive" : "btn"} onClick={handlerCreator(props.todolistID, "completed")}>Completed</button>
            </div>
        </div>
    )
}

export default TodoList;