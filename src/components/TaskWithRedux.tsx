import React, {memo} from 'react';
import SuperCheckbox from "./SuperCheckbox";
import {EditableSpan} from "./EditableSpan";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import {TaskType} from "../Todolist";
import {useDispatch} from "react-redux";
import {changeStatusAC, removeTaskAC, updateTaskTitleAC} from "../Redux/reducers/tasks-reducer";


export type TaskPropsType = {
    task: TaskType
    todolistID: string
}

const Task = memo(({
                       task,
                       todolistID
                   }: TaskPropsType) => {

    console.log("TaskWithRedux")

    const dispatch = useDispatch()

    const removeTaskHandler = () => dispatch(removeTaskAC(todolistID, task.id))
    const changeTaskStatusHandler = (isDone: boolean) => dispatch(changeStatusAC(todolistID, task.id, isDone))
    const updateTaskHandler = (updateTitle: string) => dispatch(updateTaskTitleAC(todolistID, task.id, updateTitle))

    return <li className={task.isDone ? "is-done" : ""}>
        <SuperCheckbox
            callback={(isDone) => changeTaskStatusHandler(isDone)}
            checked={task.isDone}
            color={"success"}
        />
        <EditableSpan oldTitle={task.title}
                      callBack={(updateTitle) => updateTaskHandler(updateTitle)}/>
        <IconButton onClick={removeTaskHandler} aria-label="delete">
            <DeleteIcon/>
        </IconButton>
    </li>
})

export default Task;