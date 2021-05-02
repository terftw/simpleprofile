import React from 'react';
import { createPortal } from 'react-dom';

const Modal = props => {
    return createPortal(
        <div className="ui dimmer modals visible active">
            <div className="ui standard modal visible active">
                asdasdasdas
            </div>
        </div>,
        document.querySelector('#modal')
    );
};

export default Modal;