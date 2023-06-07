import React, {ChangeEvent, KeyboardEvent, memo, useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

type PropsType = {
    callBack: (newTitle: string) => void
}

export const AddItemForm = memo((props: PropsType) => {
    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const addTask = () => {
        let newTitle = title.trim();
        if (newTitle !== "") {
            props.callBack(newTitle);
            setTitle("");
        } else {
            setError("Title is required");
        }
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {

        if (error) {
            setError(null);
        }
        if (e.key === "Enter") {
            addTask();
        }
    }

    const muiStyles = {
        maxWidth: '38px',
        maxHeight: '38px',
        minWidth: '38px',
        minHeight: '38px',
        marginLeft: "5px"
    }

    return (
        <div>
            <TextField value={title}
                       onChange={onChangeHandler}
                       onKeyDown={onKeyPressHandler}
                       label={error ? "Title is required" : "Type here"}
                       variant="outlined"
                       size={"small"}
                       error={!!error}
            />
            <Button style={muiStyles}
                    variant={"contained"}
                    onClick={addTask}>+</Button>
        </div>

    );
})

