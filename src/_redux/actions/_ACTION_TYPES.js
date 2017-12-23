export const DATA_ACT_TYPES = {
    LOAD : 'load_all_data',
    SAVE: 'save_all_data'
}

export const MEMBER_ACT_TYPES ={
    SAVE_MEMBER : 'save_member',
    DELETE_MEMBER_BY_ID: "delete_member_by_id",
    ADD_MEMB_IDS_TO_GROUPS: "add_member_ids_to_group_items",
    REMOVE_MEMB_IDS_FROM_GROUPS: "remove_member_ids_from_group_items"
};

export const GROUP_ACT_TYPES ={
    SAVE_GROUP : 'save_group',
    DELETE_GROUP_BY_ID: 'delete_group_by_id',
    ADD_GROUP_IDS_TO_TASKS: "add_group_ids_to_task_items",
    REMOVE_GROUP_IDS_FROM_TASKS: "remove_group_ids_from_task_items"
};

export const TASK_ACT_TYPES ={
    SAVE_TASK : 'save_task',
    DELETE_TASK_BY_ID: 'delete_task_by_id',
    ADD_TASK_IDS_TO_DAYS: "add_task_ids_to_day_items",
    REMOVE_TASK_IDS_FROM_DAYS: "remove_task_ids_from_day_items"
};

export const DAYS_ACT_TYPES={
    SAVE_DAY: 'save_day'
}

export const SCHED_ACT_TYPES={
    SAVE_SCHED: 'save_schedule',
    SAVE_NEW_SCHED: 'successful_sched_generation',
    DELETE_SCHED: 'delete_schedule',
    CHANGE_ACTIVE_SCHED: 'change_active_sched_id',
}

export const META_DATA_ACT_TYPES={
    UPDATE_ACTIVE_SCHED_ID: 'update_active_schedule_id', 
    LINK_USERNAME_TO_ID: 'link_username_to_member_id'
}