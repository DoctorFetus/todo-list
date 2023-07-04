import type {Meta, StoryObj} from '@storybook/react';
import {action} from '@storybook/addon-actions'
import Task, {TaskPropsType} from '../components/Task';
import {useState} from "react";

// More on how to set up stories at:
// https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof Task> = {
    title: 'TODOLISTS/Task',
    component: Task,
    // This component will have an automatically generated Autodocs entry:
    // https://storybook.js.org/docs/react/writing-docs/autodocs
    tags: ['autodocs'],
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    args: {
        changeTaskStatus: action('Status changed inside Task'),
        updateTask: action('Title changed inside Task'),
        removeTask: action('Remove Button clicked changed inside Task'),
        task: {id: '12wsdewfijdei', title: 'JS', completed: false, todoListId: "todolistId1"},
    }
};

export default meta;
type Story = StoryObj<typeof Task>;


export const TaskIsDoneStory: Story = {
    args: {
        task: {id: '12wsdewfijdei2343', title: 'JS', completed: true, todoListId: "todolistId1"},
    },
};

export const TaskIsNotDoneStory: Story = {
    args: {
        task: {id: '12wsdewfijdei2343', title: 'CSS', completed: false, todoListId: "todolistId1"},
    },
};

const TaskWithHook = (args: TaskPropsType) => {
    const [task, setTask] = useState(args.task)

    const changeTaskStatus = () => {
        setTask({...args.task, completed: !task.completed})
    }

    const changeTaskTitle = (taskID: string, title: string) => {
        setTask({...args.task, title})
    }

    return <Task task={args.task} changeTaskStatus={changeTaskStatus} updateTask={changeTaskTitle} removeTask={args.removeTask} />
}

export const TaskWithHookStory  = {
    render: ((args: any) => <TaskWithHook
        task={args.task}
        changeTaskStatus={args.changeTaskStatus}
        updateTask={args.updateTask}
        removeTask={args.removeTask}/>)
}