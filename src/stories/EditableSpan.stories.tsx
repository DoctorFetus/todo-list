import type {Meta, StoryObj} from '@storybook/react';
import {EditableSpan} from "../components/EditableSpan";
import {action} from "@storybook/addon-actions";
import {useState} from "react";


const meta: Meta<typeof EditableSpan> = {
    title: 'TODOLISTS/EditableSpan',
    component: EditableSpan,
    tags: ['autodocs'],
    args: {
        oldTitle: "This is a old title",
        callBack: action("state was changed")
    }
};

export default meta;
type Story = StoryObj<typeof EditableSpan>;


export const EditableSpanStory: Story = {
    args: {
        oldTitle: "This is a old title",
        callBack: action("state was changed")
    }
}

const EditableSpanWithHooks = (args: any) => {
    const [title, setTitle] = useState("OLD TITLE")

    const changeTitle = (title: string) => {
        setTitle(title)
    }

    return <EditableSpan oldTitle={title} callBack={changeTitle} />
}

export const EditableSpanHooksStory = () => <EditableSpanWithHooks />