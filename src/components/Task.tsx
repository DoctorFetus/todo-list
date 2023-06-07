import React, {memo} from 'react';
import SuperCheckbox from "./SuperCheckbox";
import {EditableSpan} from "./EditableSpan";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import {TaskType} from "../Todolist";


export type TaskPropsType = {
    task: TaskType
    changeTaskStatus: (id: string, isDone: boolean) => void
    updateTask: (taskId: string, updateTitle: string) => void
    removeTask: (taskID: string) => void
}

const Task = memo(({
                       task,
                       changeTaskStatus,
                       updateTask,
                       removeTask,
                   }: TaskPropsType) => {

    return <li className={task.isDone ? "is-done" : ""}>
        <SuperCheckbox
            callback={(isDone) => changeTaskStatus(task.id, isDone)}
            checked={task.isDone}
            color={"success"}
        />
        <EditableSpan oldTitle={task.title}
                      callBack={(updateTitle) => updateTask(task.id, updateTitle)}/>
        <IconButton onClick={() => removeTask(task.id)} aria-label="delete">
            <DeleteIcon/>
        </IconButton>
    </li>
})

export default Task;