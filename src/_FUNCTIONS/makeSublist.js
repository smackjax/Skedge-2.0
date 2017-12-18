import GroupActs from '../../_redux/actions/group.actions';

import colors from '../_RESOURCES/colors';
import store from '../../_redux/redux-store';

function buildIdNameList(idList, propKey){
    const dataObjById = store.getState()[propKey];
    return idList.map((cId)=>{
        return {id: dataObjById[cId].id,
        name: dataObjById[cId].name
    }});
}

export default {
    
    groups: (sublistVals, addFunc, deleteFunc)=>{
        return {
            subColor: colors.group,
            list: buildIdNameList(sublistVals, 'groupsById'),
            headerTxt: 'Group',
            sublistKey: 'groups',
            deleteFunc: GroupActs.deleteMembersFromGroups
        }
    },

    members: (sublistVals)=>{
        return {
            subColor: colors.member,
            list: buildIdNameList(sublistVals, 'membersById'),
            headerTxt: 'Member',
            sublistKey: 'members',
        }
    },
    tasks: (sublistVals, addFunc, deleteFunc)=>{
        return {
            subColor: colors.task,
            list: buildIdNameList(sublistVals, 'tasksById'),
            headerTxt: 'Task',
            sublistKey: 'tasks',
        }
    }
}