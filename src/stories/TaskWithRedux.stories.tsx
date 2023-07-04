import type {Meta, StoryObj} from '@storybook/react';
import React from "react";
import App from "../App";
import {ReduxStoreProviderDecorator} from "../common/ReduxStoreProviderDecorator";
import TaskWithRedux from "../components/TaskWithRedux";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../Redux/store";
import {TaskType} from "../api/task-api";

const meta: Meta<typeof TaskWithRedux> = {
    title: 'TODOLISTS/TaskWithRedux',
    component: TaskWithRedux,
    tags: ['autodocs'],
    decorators: [ReduxStoreProviderDecorator],
};

export default meta;
type Story = StoryObj<typeof App>;


const TaskWithSelector = () => {
    const todolistId = "todolistId1"
    const task = useSelector<AppRootStateType, TaskType>(state => state.tasks[todolistId][0])
    return <TaskWithRedux task={task} todolistID={todolistId}/>
}

export const TaskStory: Story = {
    render: () => <TaskWithSelector/>
}

