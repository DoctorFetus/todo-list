import React, {ChangeEvent, memo, useState} from 'react';
import TextField from "@mui/material/TextField";

type PropsType = {
    oldTitle: string
    callBack: (updateTitle: string) => void
}

export const EditableSpan = memo((props: PropsType) => {
    let [updateTitle, setUpdateTitle] = useState(props.oldTitle)

    const [edit, setEdit] = useState(false)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setUpdateTitle(e.currentTarget.value)
    }

    const addTask = () => {
        props.callBack(updateTitle)
    }

    const editHandler = () => {
        setEdit(!edit)
        if (edit) addTask()
    }


    return (
        edit
            ? <TextField value={updateTitle}
                         onChange={onChangeHandler}
                         variant="outlined"
                         size={"small"}
                         onBlur={editHandler}
                         autoFocus
            />
            : <span onDoubleClick={editHandler}>{props.oldTitle}</span>
    );
})

