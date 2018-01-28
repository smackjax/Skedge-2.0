import { memberIdsToGroupIds } from '../_base-funcs';
import fakeStore from './fakeStore';


describe("Add member ids to group ids", ()=>{
    // memberIdsToGroupIds(store, groupIds, memberIds, true)
    const testStore = fakeStore();
    const groupIdsToAddMemberIds = ["groupId1", "groupId4", "groupId7"];

    // Overwrite setup
    testStore.groups.groupId4 = {
        ...testStore.groups.groupId4,
        members: ["memberId3", "memberId2"]
    }
    // Duplicates setup
    testStore.groups.groupId1 = {
        ...testStore.groups.groupId1,
        members: ["memberId1", "memberId5"]
    }
    const memberIdsToAdd = ["memberId1", "memberId4", "memberId5"];
    const updates = 
        memberIdsToGroupIds(
            testStore, 
            groupIdsToAddMemberIds, 
            memberIdsToAdd, 
            true
        );

    it("Adds ids to groups", ()=>{
        expect(updates.groups.groupId4.members.length).toEqual(5);
        expect(updates.groups.groupId7.members.length).toEqual(3);
        expect(updates.groups.groupId7.members.includes('memberId4')).toEqual(true);
        expect(updates.groups.groupId7.members.includes('memberId5')).toEqual(true);
        expect(updates.groups.groupId7.members.includes('memberId1')).toEqual(true);
    })

    it("Doesn't create duplicates", ()=>{
        expect(updates.groups.groupId1.members.length).toEqual(3);
    })

    it("Add group ids to members", ()=>{
        expect(updates.members.memberId1.groups.includes("groupId7")).toEqual(true);
        expect(updates.members.memberId4.groups.length).toEqual(3);
        expect(updates.members.memberId5.groups.includes("groupId4")).toEqual(true);
    })

})

describe("Remove member ids from group ids", ()=>{
        // memberIdsToGroupIds(store, groupIds, memberIds, false)
        const testStore = fakeStore();
        const groupIdsToRemoveMemberIds = [
            "groupId1", 
            "groupId2", 
            "groupId3", 
            // Test a group without any member ids
            "groupId4"
        ];
    
        // Normal setup(all should delete)
        testStore.groups.groupId1 = {
            ...testStore.groups.groupId1,
            members: ["memberId3", "memberId2"]
        }
        // Duplicates setup(all should delete)
        testStore.groups.groupId2 = {
            ...testStore.groups.groupId2,
            members: ["memberId3", "memberId3"]
        }
        // One removed setup(Two left)
        testStore.groups.groupId3 = {
            ...testStore.groups.groupId3,
            members: ["memberId7", "memberId4", "memberId2"]
        }

        // Vanilla(all should delete)
        testStore.members.memberId1={
            ...testStore.members.memberId1,
            groups: ["groupId1", "groupId2", "groupId3"]
        }

        // Duplicate group ids(all should delete)
        testStore.members.memberId2={
            ...testStore.members.memberId2,
            groups: ["groupId1", "groupId2", "groupId3", "groupId3"]
        }

        // Group id not within bounds(Should not be in updates)
        testStore.members.memberId3={
            ...testStore.members.memberId3,
            groups: ["groupId5"]
        }

        const memberIdsToRemove = 
            ["memberId1", "memberId2", "memberId3"];
        
        const updates = 
            memberIdsToGroupIds(
                testStore, 
                groupIdsToRemoveMemberIds, 
                memberIdsToRemove, 
                false
            );

        it("Removes member ids from groups", ()=>{
            expect(updates.groups.groupId1.members.length).toEqual(0);
            expect(updates.groups.groupId3.members.length).toEqual(2);
            expect(updates.groups.groupId3.members.includes("memberId7")).toEqual(true);
        })
    
        it("Removes duplicates", ()=>{
            expect(updates.groups.groupId2.members.length).toEqual(0);
        })


        it("Doesn't return unaffected group", ()=>{
            expect(updates.groups.groupId4).toEqual(undefined);
        })
        it("Doesn't return unaffected member", ()=>{
            expect(updates.members.memberId3).toEqual(undefined);
        })
})