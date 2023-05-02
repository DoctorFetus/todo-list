import React, {ChangeEvent, useState} from 'react';

type EditableSpanType = {
    oldTitle: string
    callback: (title: string) => void
}

export const EditableSpan = (props: EditableSpanType) => {
    const [edit, setEdit] = useState(false)
    const [updateTitle, setUpdateTitle] = useState(props.oldTitle)

    const editHandler = () => {
         setEdit(!edit)
        if (edit) addTask()
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setUpdateTitle(e.currentTarget.value)
    }

    const addTask = () => {
        props.callback(updateTitle)
    }

    return (
            edit
            ? <input value={updateTitle} onChange={onChangeHandler} onBlur={editHandler} autoFocus/>
            : <span onDoubleClick={editHandler}>{props.oldTitle}</span>
    );
};
