import {AppRootStateType} from "../store";
import {TodolistType} from "../../App";

export const todolistSelector = (state: AppRootStateType): Array<TodolistType> => state.todolists