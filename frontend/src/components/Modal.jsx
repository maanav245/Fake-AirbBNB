import React from 'react';
import { StoreContext } from '../Store';
import { Slider } from '@mui/material';

function Modal () {
  const { modal, filters } = React.useContext(StoreContext);

  const [search, setSearch] = React.useState('');
  const [bedrooms, setBedrooms] = React.useState([1, 3]);

  const applyFilters = () => {
    event.preventDefault();
    filters.setFilters({ search: search, bedrooms: bedrooms });
    modal.setModal('');
  }

  const ErrorContent = () => {
    return (
      <p>{modal.modal}</p>
    )
  }

  const handleChange = (event, newValue) => {
    setBedrooms(newValue);
    console.log(bedrooms);
  }

  if (modal.modal === 'filters') {
    return (
      <div className="modal-container">
        <div className="modal-content">
            <h2 className="modal-title">Search Filters</h2>
            <form>
              <input className="input" type="text" onChange={({ target }) => setSearch(target.value)} placeholder="Search Title or City"/>
              <p>Number of Bedrooms</p>
              <Slider
                getAriaLabel={() => 'Temperature range'}
                onChange={handleChange}
                valueLabelDisplay="auto"
                value={bedrooms}
                step={1}
                marks
                min={1}
                max={10}
              />
            </form>
            <button onClick={(event) => applyFilters()} className="button">Search</button>
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
