import {TasksStateType} from "../../App";
import {AppRootStateType} from "../store";

export const tasksSelector = (state: AppRootStateType): TasksStateType => state.tasks