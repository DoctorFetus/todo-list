import {AppRootStateType} from "../store";
import {OldTodolistType} from "../../App";

export const todolistSelector = (state: AppRootStateType): Array<OldTodolistType> => state.todolists