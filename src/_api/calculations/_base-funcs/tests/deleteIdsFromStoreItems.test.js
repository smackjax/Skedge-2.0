import { deleteIdsFromStoreItems } from '../_base-funcs';
import fakeStore from './fakeStore/';

describe("deleteIdsFromStoreItems deletes single member id from groups", ()=>{
    const testStore = fakeStore();

    const testMemberIdList1 = ["memberId1", "memberId4", "memberId6", "memberId3"];
    const testMemberIdList2 = [ "memberId4", "memberId3"];

    testStore.groups.groupId1 = {
        ...testStore.groups.groupId1,
        members: testMemberIdList1
    }
    testStore.groups.groupId4 = {
        ...testStore.groups.groupId4,
        members: testMemberIdList2
    }

    const allGroupIds = Object.keys(testStore.groups);
    const updates = 
        deleteIdsFromStoreItems(testStore, 'groups', allGroupIds, 'members', ['memberId4'], true);

    it("Deletes single member id from sublists", ()=>{
        expect(updates.groups.groupId1.members.includes("memberId4")).toEqual(false);
        expect(updates.groups.groupId4.members.includes("memberId4")).toEqual(false);
    }),
    it("Doesn't overwrite sublist", ()=>{
        expect(updates.groups.groupId1.members.length).toEqual(3);
        expect(updates.groups.groupId4.members.length).toEqual(1);
    }),
    it("Adds deleted member id to updates with 'null'", ()=>{
        expect(updates.members.memberId4).toEqual(null);
    })
})

describe("deleteIdsFromStoreItems deletes multiple member ids from groups", ()=>{
    const testStore = fakeStore();

    const testMemberIdList1 = ["memberId1", "memberId4", "memberId7", "memberId6", "memberId3"];
    const testMemberIdList2 = [ "memberId4", "memberId3", "memberId7", "memberId8"];

    testStore.groups.groupId1 = {
        ...testStore.groups.groupId1,
        members: testMemberIdList1
    }
    testStore.groups.groupId4 = {
        ...testStore.groups.groupId4,
        members: testMemberIdList2
    }

    const allGroupIds = Object.keys(testStore.groups);
    const updates = 
        deleteIdsFromStoreItems(
            testStore, 
            'groups', 
            allGroupIds, 
            'members', 
            ['memberId3', 'memberId7'], 
            true
        );

    it("Deletes ids from sublist", ()=>{
        expect(updates.groups.groupId1.members.includes("memberId3")).toEqual(false);
        expect(updates.groups.groupId1.members.includes("memberId7")).toEqual(false);
        expect(updates.groups.groupId4.members.includes("memberId3")).toEqual(false);
        expect(updates.groups.groupId4.members.includes("memberId7")).toEqual(false);
    }),

    it("Doesn't delete more than ids than given", ()=>{
        expect(updates.groups.groupId1.members.length).toEqual(3);
        expect(updates.groups.groupId4.members.length).toEqual(2);
    }),

    it("Adds only updated objects to returned 'updates'", ()=>{
        expect(updates.groups.groupId1.id).toEqual("groupId1");
        expect(updates.groups.groupId2).toEqual(undefined);
        expect(updates.groups.groupId3).toEqual(undefined);
        expect(updates.groups.groupId4.id).toEqual("groupId4");
    }),

    it("Sets memberId3 to null", ()=>{
        expect(updates.members.memberId3).toEqual(null);
    })
    it("Sets memberId7 to null", ()=>{
        expect(updates.members.memberId7).toEqual(null);
    })
})
