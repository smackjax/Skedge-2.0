
import { syncIdArraysWithUpdatedObjs } from './generix'; 
import { saveMembers } from './members-data-api';
const testStore = {
    members: {
        "mId1": {
            "id": "mId1",
            "groups": []
        },
        "mId2": {
            "id": "mId2",
            "groups": []
        },
        "mId3": {
            "id": "mId3",
            "groups": []
        },
        "mId4": {
            "id": "mId4",
            "groups": []
        },
    }, 
    groups: { 
        "gId1": {
            "id": "gId1",
            "members": []
        },
        "gId2": {
            "id": "gId2",
            "members": []
        },
        "gId3": {
            "id": "gId3",
            "members": []
        },
        "gId4": {
            "id": "gId4",
            "members": []
        },
    },
    tasks: { 
        "tId1": {
            "id": "tId1",
            "groups": []
        },
        "tId2": {
            "id": "tId2",
            "groups": []
        },
        "tId3": {
            "id": "tId3",
            "groups": []
        },
        "tId4": {
            "id": "tId4",
            "groups": []
        },
    },
    days: { 
        "0": {
            "id": "0",
            "tasks": []
        },
        "1": {
            "id": "1",
            "tasks": []
        },
        "2": {
            "id": "2",
            "tasks": []
        },
        "3": {
            "id": "3",
            "tasks": []
        },
        "4": {
            "id": "4",
            "tasks": []
        },
        "5": {
            "id": "5",
            "tasks": []
        },
        "6": {
            "id": "6",
            "tasks": []
        }
    }
}

describe("Sync item id arrays with saved items", ()=>{
    it("Adds or removes ids from array",()=>{
        const testStore1={
            ...testStore,
            groups: {
                ...testStore.groups,
                gId2: {
                    ...testStore.gId2,
                    members: ["mId1", "mId3"]
                },
                gId3: {
                    ...testStore.gId3,
                    // Should be removed when run
                    members: ["mId2"]
                }
            }
        }   
        const updatedObjs1 = [{
            "id": "mId2",
            "groups": ["gId2"]
        }];
        const updatesResult = syncIdArraysWithUpdatedObjs(testStore1, 'groups', updatedObjs1, 'members');
        console.log(updatesResult);
        // Individual id doesn't overwrite current array
        expect(updatesResult.groups.gId2.members.length).toEqual(3);
        // Removes member id from group.members, if not in updated member.groups array
        expect(updatesResult.groups.gId3.members.length).toEqual(0);
    })
})