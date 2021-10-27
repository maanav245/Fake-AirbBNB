import React from 'react';
import { StoreContext } from '../Store';

function Modal () {
  const { modal } = React.useContext(StoreContext);

  const Content = () => {
    return (
      <p>{modal.modal}</p>
    )
  }

  if (modal.modal !== '') {
    return (
      <div className="modal">
        <div className="modal-content">
            <h2 className="modal-title">Error!</h2>
            <Content/>
            <button onClick={() => modal.setModal('')} className="button">Close</button>
        </div>
      </div>
    );
  } else {
    return null;
  }
}

export default Modal;
