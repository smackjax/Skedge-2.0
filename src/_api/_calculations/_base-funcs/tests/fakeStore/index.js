import {
    createFakeMembers,
    createFakeGroups,
    createFakeTasks,
    createFakeDays
} from './createFakes';

const fakeStore = ()=> ({
    dateRanges: {},
    meta: {},

    members: {
        ...createFakeMembers(10)
    },
    groups: {
        ...createFakeGroups(10)
    },
    tasks: {
        ...createFakeTasks(10)
    },
    days: {
        ...createFakeDays()
    }
});

export default fakeStore;