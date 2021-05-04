import React from 'react';
import ReactModal from 'react-modal';
import { createPortal } from 'react-dom';

const Modal = props => {
    return createPortal(
        // <div className="ui dimmer modals visible active">
        //     <div className="ui small modal visible active">
        //         {props.itemsToRender()}
        //     </div>
        // </div>,
        <ReactModal
            isOpen={true}
            ariaHideApp={false}
            style={{
                overlay: {
                    backgroundColor: 'rgba(0,0,0,0.6)'
                }
            }}
        >
           {props.itemsToRender()}
        </ReactModal>,
        document.querySelector('#modal')
    );
};

export default Modal;
