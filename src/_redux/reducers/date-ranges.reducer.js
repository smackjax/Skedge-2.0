import {
    DATE_RANGE_ACT_TYPES,
    DATA_ACT_TYPES
} from '../actions/_ACTION_TYPES';
import {
    mainItems
} from './GENERIC_REDUCERS';
export default (state={

    'dateRangeId1': {
        id: 'dateRangeId1',
        startDate: '2017-09-01',
        endDate: '2017-09-15',
        dates: {
            '2017-09-01': {
                id: '2017-09-01', 
                date : 'Sep 1',
                name: 'Friday',
                tasks: {
                    'taskId1': {
                        id: 'taskId1',
                        name: 'Swab cannons',
                        assigned: {
                            'membId1': {
                                id: 'membId1',
                                name: 'Smackjax',
                            }
                        }
                    }
                }
            },
            '2017-09-02': {
                id: '2017-09-02', 
                date : 'Sep 2',
                name: 'Saturday',
                tasks: {
                    'taskId3': {
                        id: 'taskId3',
                        name: 'Captain ship',
                        assigned: {
                            'membId2': {
                                id: 'membId2',
                                name: 'Livvy Bivvy',

                            }
                        }
                    },
                }
            },
        }
    },

 
}, action)=>{
    const payload = action.payload;
    switch(action.type){
        
        case DATA_ACT_TYPES.LOAD: {
            return {
                ...payload.dateRanges
            }
        }

        case DATE_RANGE_ACT_TYPES.SAVE_NEW_DATE_RANGE:{
            return {
                ...state, 
                [payload.newDateRange.id] :{
                    ...payload.newDateRange
                }    
            }
        }

        case DATE_RANGE_ACT_TYPES.DELETE_DATE_RANGE:{
            return mainItems.deleteById(state, payload);
        }

        default: return state
    }
}