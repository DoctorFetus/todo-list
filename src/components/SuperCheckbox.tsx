import React, {ChangeEvent, FC} from 'react';
import Checkbox from "@mui/material/Checkbox";

type SuperCheckboxType = {
    checked: boolean
    callback: (isDone: boolean) => void
    color?: "primary" | "secondary" | "error" | "info" | "success" | "warning" | "default"

}

const SuperCheckbox: FC<SuperCheckboxType> = ({callback, checked, color }) => {

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        callback(e.currentTarget.checked)
    }


    return (
        <Checkbox
            onChange={onChangeHandler}
            checked={checked}
            color={color}/>
    );
};

export default SuperCheckbox;