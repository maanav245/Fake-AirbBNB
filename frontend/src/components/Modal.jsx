import React from 'react';
import { StoreContext } from '../Store';

function Modal () {
  const { modal, filters } = React.useContext(StoreContext);

  const [search, setSearch] = React.useState('');

  const applyFilters = () => {
    filters.setFilters({ ...filters, search: search });
    modal.setModal('');
  }

  const ErrorContent = () => {
    return (
      <p>{modal.modal}</p>
    )
  }

  if (modal.modal === 'filters') {
    return (
      <div className="modal-container">
        <div className="modal-content">
            <h2 className="modal-title">Search Filters</h2>
            <form>
              <input className="input" type="text" onChange={({ target }) => setSearch(target.value)} placeholder="Search Title or City"/>
            </form>
            <button onClick={() => applyFilters()} className="button">Search</button>
            <button onClick={() => modal.setModal('')} className="button">Close</button>
        </div>
      </div>
    );
  } else if (modal.modal !== '') {
    return (
      <div className="modal-container">
        <div className="modal-content">
            <h2 className="modal-title">Error!</h2>
            <ErrorContent/>
            <button onClick={() => modal.setModal('')} className="button">Close</button>
        </div>
      </div>
    );
  } else {
    return null;
  }
}

export default Modal;
