import {SCHED_ACT_TYPES,
DATA_ACT_TYPES
} from '../actions/_ACTION_TYPES';

export default (state={

    'schedId1': {
        id: 'schedId1',
        startDate: '2017-09-01',
        endDate: '2017-09-15',
        sched: {
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
            '2017-09-03': {
                id: '2017-09-03', 
                date : 'Sep 3',
                name: 'Sunday',
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
                    },
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
            '2017-09-04': {
                id: '2017-09-04', 
                date : 'Sep 4',
                name: 'Monday',
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
                    },
                    'taskId2': {
                        id: 'taskId2',
                        name: 'Hoist Sail',
                        assigned: {
                            'membId1': {
                                id: 'membId1',
                                name: 'Smackjax',
                            }
                        }
                    },
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
                    'taskId4': {
                        id: 'taskId4',
                        name: 'Scrub deck',
                        assigned: {
                            'membId1': {
                                id: 'membId1',
                                name: 'Smackjax',
                            },
                            'membId3': {
                                id: 'membId3',
                                name: 'Teri Bernard'
                            }
                        }
                    },
                }
            },

        }
    }     

}, action)=>{
    switch(action.type){
        case DATA_ACT_TYPES.LOAD: {
            return {
                ...action.data.schedsById
            }
        }

        case SCHED_ACT_TYPES.SCHED_GEN_SUCCESS:{
            return {
                ...state, 
                [action.newSched.id] :{
                    ...action.newSched
                }    
            }
        }
        default: return state
    }
}