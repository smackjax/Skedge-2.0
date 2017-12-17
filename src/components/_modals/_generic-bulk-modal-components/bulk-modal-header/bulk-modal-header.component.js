import React from 'react';
import PropTypes from 'prop-types';
import {
    ModalHeader,
    ModalHeaderBadge as Badge
} from '../../_generic-modal-components';
const BulkModalHeader = (props)=>{
    return (
        <ModalHeader className={props.bgClassName}>
            <Badge className={props.bulkTextClass}>
                {props.bulkIcon}
                {props.bulkCount}
            </Badge>

            <Badge className={props.bulkTextClass}>
                {props.actionIcon}
            </Badge>

            <Badge className={props.primaryTextClass}>
                {props.primaryIcon}
                {props.primaryCount}
            </Badge>
        </ModalHeader>
    )
}

BulkModalHeader.propTypes={
    bgClassName: PropTypes.string.isRequired,
    actionIcon: PropTypes.instanceOf(React.Component),

    primaryCount: PropTypes.number.isRequired,
    primaryTextClass: PropTypes.string.isRequired,
    primaryIcon: PropTypes.instanceOf(React.Component),

    bulkCount: PropTypes.number.isRequired,
    bulkTextClass: PropTypes.string.isRequired,
    bulkIcon: PropTypes.instanceOf(React.Component),
}
