import { addToSublist } from '../';
import fakeStore from './fakeStore/';

describe("addToSublist", ()=>{
    // addToSublist(store, 'tasks', taskIds, 'groups', groupIds)
    const testStore = fakeStore();

    const taskIds=["taskId3", "taskId4", "taskId7"];

    const groupIdsToAdd=["groupId1", "groupId5"];

    const updates = 
        addToSublist(
            testStore,
            'tasks',
            taskIds,
            'groups',
            groupIdsToAdd
        );

    test("Adds group ids to tasks", ()=>{
        expect(updates.tasks.taskId3.groups.length).toEqual(2);
        expect(updates.tasks.taskId4.groups.length).toEqual(2);
        expect(updates.tasks.taskId7.groups.length).toEqual(2);
    })
});