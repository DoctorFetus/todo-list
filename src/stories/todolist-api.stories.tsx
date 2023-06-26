import React, {useEffect, useState} from 'react'
import {todolistApi} from "../api/todolist-api";

export default {
    title: 'API/Todolist'
}


export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistApi.getTodolists()
            .then(response => setState(response.data))
    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {

        const title = "REACT"

        todolistApi.createTodolist(title)
            .then(response => setState(response.data))

    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {

        const title = "NEW"
        const todolistID = "204f4818-619c-45b9-96e6-83e352e4b846"

        todolistApi.updateTodolist(todolistID, title)
            .then(response => setState(response.data))

    }, [])

    return <div>{JSON.stringify(state)}</div>
}

