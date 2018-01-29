import * as groupsUpdates from './groups';
import fakeStore from './_base-funcs/tests/fakeStore';

describe("Test update object from deleting group", ()=>{
    const testStore = fakeStore();

    // Initialize members for test
    // Kept simple, already tested this relationship
    testStore.members.memberId1={
        ...testStore.members.memberId1,
        groups: ["groupId2"]
    }
    testStore.members.memberId5={
        ...testStore.members.memberId5,
        groups: ["groupId2"]
    }

    // Initialize tasks for test
    // Vanilla
    testStore.tasks.taskId1={
        ...testStore.tasks.taskId1,
        groups: ["groupId2"]
    }
    // Duplicates
    testStore.tasks.taskId3={
        ...testStore.tasks.taskId3,
        groups: ["groupId2", "groupId2", "groupId2"]
    }
    // Should have two ids left
    testStore.tasks.taskId7={
        ...testStore.tasks.taskId7,
        groups: ["groupId2","groupId6","groupId4"]
    }


    // Initialize task objects
    const updates =
        groupsUpdates.deleteGroupById(testStore, "groupId2");

    it("Removes group id from members", ()=>{
        const memberIdsUpdated = Object.keys(updates.members);
        expect(memberIdsUpdated.length).toEqual(2)
    })
    it("Returns correct members in update obj", ()=>{
        expect(updates.members.memberId1.groups.length).toEqual(0);
        expect(updates.members.memberId5.groups.length).toEqual(0);
    })
    it("Removes group id from tasks",()=>{
        expect(updates.tasks.taskId1.groups.length).toEqual(0);
        expect(updates.tasks.taskId7.groups.length).toEqual(2);
    })
    it("Removes any duplicates of group Ids", ()=>{
        expect(updates.tasks.taskId3.groups.length).toEqual(0);
    })

    it("Returns groups.groupId set to 'null'", ()=>{
        expect(updates.groups.groupId2).toEqual(null);
    })
})