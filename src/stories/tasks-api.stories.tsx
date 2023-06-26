import React, {useEffect, useState} from 'react'
import {tasksApi} from "../api/task-api";

export default {
    title: 'API/Tasks'
}


export const GetTasks = () => {
    const [state, setState] = useState<any>(null)

    const todolistId = "ac1432ef-6830-47a2-9b83-c3e54a1fda43"

    useEffect(() => {
        tasksApi.getTasks(todolistId)
            .then(response => setState(response.data))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const CreateTask = () => {
    const [state, setState] = useState<any>(null)

    const todolistId = "2c03c13c-e789-4b9e-aa4c-5d46bd8a211c"

    useEffect(() => {
        tasksApi.addTask(todolistId, "Bread")
            .then(response => setState(response.data))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)

    const todolistId = "2c03c13c-e789-4b9e-aa4c-5d46bd8a211c"
    const taskId = "ed02c695-0d0c-445a-8dc4-610c510a097d"


    useEffect(() => {
        tasksApi.deleteTask(todolistId, taskId)
            .then(response => setState(response.data))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const UpdateTaskTitle = () => {
    const [state, setState] = useState<any>(null)

    const todolistId = "ac1432ef-6830-47a2-9b83-c3e54a1fda43"
    const taskId = "647ed9fd-2137-4811-a735-ef9bb19b4b39"

    const changes = {
        "title": "JavaScript",
        // "description": "",
        // "completed": false,
        // "status": 0,
        // "priority": 1,
        // "startDate": "  2023-06-26T19:03:48.403Z",
        // "deadline": "2023-07-26T19:03:48.403Z"
    }

    useEffect(() => {
        tasksApi.updateTask(todolistId, taskId, changes)
            .then(response => setState(response.data))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

