import { saveItemAndSync } from '../_base-funcs';
import fakeStore from './fakeStore';

describe("Save member and sync with groups", ()=>{
    // saveItemAndSync(store, 'members', newMemberObj, 'groups')
    const testStore = fakeStore();
    
    // 'memberId3' should be removed(leaving 2)
    testStore.groups.groupId5 = {
        ...testStore.groups.groupId5,
        members: ["memberId2", "memberId5", "memberId3"]
    }

    const newMemberObj={
        ...testStore.members.memberId3,
        groups: ["groupId1", "groupId2", "groupId4"]
    }

    const updates = 
        saveItemAndSync(
            testStore, 
            'members',
            newMemberObj, 
            'groups'
        );

    it("Adds member id to groups", ()=>{
        expect(updates.groups.groupId1.members.includes("memberId3")).toBe(true);
        expect(updates.groups.groupId2.members.includes("memberId3")).toBe(true);
        expect(updates.groups.groupId4.members.includes("memberId3")).toBe(true);
    } ),
    it("Only adds 1 member id to groups", ()=>{
        expect(updates.groups.groupId1.members.length).toBe(1);
        expect(updates.groups.groupId2.members.length).toBe(1);
        expect(updates.groups.groupId4.members.length).toBe(1);
    })
    it("Removes member id from group not on new list", ()=>{
        expect(updates.groups.groupId5.members.length).toBe(2);
        expect(updates.groups.groupId5.members.includes("memberId3")).toBe(false);
    })
    it("Returns new member under updates", ()=>{
        expect(updates.members.memberId3).not.toBe(undefined);
    })
})

describe("Save group and sync with members", ()=>{
    // saveItemAndSync(store, 'groups', newGroupObj, 'members')
    const testStore = fakeStore();

    testStore.members.memberId8 = {
        ...testStore.members.memberId8,
        groups: ['groupId2']
    }

    
    const newGroupObj = {
        ...testStore.groups.groupId2,
        members: ["memberId3", "memberId5", "memberId6"]
    }

    const updates = 
        saveItemAndSync(
            testStore, 
            'groups', 
            newGroupObj, 
            'members'
        );
    
    it("Adds saved group id to member objects", ()=>{
        expect(updates.members.memberId3.groups.length).toEqual(1);
        expect(updates.members.memberId3.groups.includes("groupId2")).toEqual(true);
        expect(updates.members.memberId5.groups.length).toEqual(1);
        expect(updates.members.memberId6.groups.length).toEqual(1);
    })

    it("Removes group id from member not on new list", ()=>{
        expect(updates.members.memberId8.groups.length).toEqual(0)
    })
})