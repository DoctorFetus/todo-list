import React, {ChangeEvent, useState, KeyboardEvent} from "react";
import {FilterValuesType} from "./App";

type TodoListPropsType = {
    title: string;
    tasks: Array<TaskType>;
    removeTask: (taskID: string) => void
    changeFilter: (filter: FilterValuesType) => void
    addTask: (title: string) => void
}

export type TaskType = {
    id: string;
    title: string;
    isDone: boolean;
}

const TodoList: React.FC<TodoListPropsType> = (props) => {
    const [title, setTitle] = useState<string>("")
    // const taskInput = useRef<HTMLInputElement>(null)
    // const addTaskHandler = () => {
    //     if (taskInput.current) {
    //         props.addTask(taskInput.current.value)
    //         taskInput.current.value = ""
    //     }
    // }

    const setTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const tasksJSXElements: Array<JSX.Element> = props.tasks.map((task: TaskType) => {
        return (
            <li key={task.id}>
                <input type="checkbox" checked={task.isDone}/>
                <span>{task.title}</span>
                <button onClick={() => props.removeTask(task.id)}>x</button>
            </li>
        )
    })
    const titleMaxLength = 25
    const isTitleLengthTooLong: boolean = title.length > titleMaxLength
    const isBtnDisabled: boolean = !title.length || isTitleLengthTooLong
    const maxTitleLengthAlert = isTitleLengthTooLong
        ? <div style={{color: "red"}}>Title is too long!</div>
        : null

    const addTaskHandler = () => {
        props.addTask(title)
        setTitle("")
    }

    const addTaskOnKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => e.key === "Enter" && !isBtnDisabled && addTaskHandler()

    const handlerCreator = (filter: FilterValuesType) => () => props.changeFilter(filter)

    return (
        <div className="todolist">
            <h3>{props.title}</h3>
            <div>
                <input
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
                >+
                </button>
                {maxTitleLengthAlert}
            </div>
            <ul>
                {tasksJSXElements}
            </ul>
            <div>
                <button onClick={handlerCreator("all")}>All</button>
                <button onClick={handlerCreator("active")}>Active</button>
                <button onClick={handlerCreator("completed")}>Completed</button>
            </div>
        </div>
    )
}

export default TodoList;