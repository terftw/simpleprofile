import React from 'react';
import { createPortal } from 'react-dom';

const Modal = props => {
    return createPortal(
        <div className="ui dimmer modals visible active">
            <div className="ui small modal visible active">
                {props.itemsToRender()}
            </div>
        </div>,
        document.querySelector('#modal')
    );
};

export default Modal;