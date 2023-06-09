import {changeStatusAC, removeTaskAC, tasksReducer, updateTaskTitleAC} from './tasks-reducer';
import {TasksStateType} from '../../App';
import {addTodolistAC, removeTodolistAC} from "./todolists-reducer";

let startState: TasksStateType

beforeEach(() => {
    startState = {
        "todolistId1": [
            {id: "1", title: "CSS", completed: false, todoListId: "todolistId1"},
            {id: "2", title: "JS", completed: true, todoListId: "todolistId1"},
            {id: "3", title: "React", completed: false, todoListId: "todolistId1"}
        ],
        "todolistId2": [
            {id: "1", title: "bread", completed: false, todoListId: "todolistId2"},
            {id: "2", title: "milk", completed: true, todoListId: "todolistId2"},
            {id: "3", title: "tea", completed: false, todoListId: "todolistId2"}
        ]
    }
})

test('correct task should be deleted from correct array', () => {

    const action = removeTaskAC("todolistId2", "2");

    const endState = tasksReducer(startState, action)

    expect(endState).toEqual({
        "todolistId1": [
            {id: "1", title: "CSS", completed: false, todoListId: "todolistId1"},
            {id: "2", title: "JS", completed: true, todoListId: "todolistId1"},
            {id: "3", title: "React", completed: false, todoListId: "todolistId1"}
        ],
        "todolistId2": [
            {id: "1", title: "bread", completed: false, todoListId: "todolistId2"},
            {id: "3", title: "tea", completed: false, todoListId: "todolistId2"}
        ]
    });

});

// test('correct task should be added to correct array', () => {
//
//     const action = addTaskAC('todolistId2', 'juice')
//
//     const endState = tasksReducer(startState, action)
//
//     expect(endState['todolistId1'].length).toBe(3)
//     expect(endState['todolistId2'].length).toBe(4)
//     expect(endState['todolistId2'][0].id).toBeDefined()
//     expect(endState['todolistId2'][0].title).toBe('juice')
//     expect(endState['todolistId2'][0].completed).toBeFalsy()
// })

 test('status of specified task should be changed', () => {

    const action = changeStatusAC('todolistId2', "2", false)

    const endState = tasksReducer(startState, action)

    expect(endState['todolistId2'][1].completed).toBe(false)
    expect(endState['todolistId1'][1].completed).toBe(true)
    expect(endState['todolistId2'][1].title).toBe('milk')
    expect(endState['todolistId2'].length).toBe(3)
})

test('title of specified task should be changed', () => {

    const action = updateTaskTitleAC('todolistId2', "2", "apples")

    const endState = tasksReducer(startState, action)

    expect(endState['todolistId2'][1].completed).toBe(true)
    expect(endState['todolistId2'][1].title).toBe('apples')
    expect(endState['todolistId1'][1].title).toBe('JS')
    expect(endState['todolistId2'].length).toBe(3)
})

test('new array should be added when new todolist is added', () => {

    const action = addTodolistAC('new todolist')

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState)
    const newKey = keys.find(k => k != 'todolistId1' && k != 'todolistId2')
    if (!newKey) {
        throw Error('new key should be added')
    }

    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])
})

test('property with todolistId should be deleted', () => {

    const action = removeTodolistAC("todolistId2");

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(endState["todolistId2"]).not.toBeDefined();
});