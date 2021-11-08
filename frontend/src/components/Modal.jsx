import React from 'react';
import { StoreContext } from '../Store';
import { Slider } from '@mui/material';

function Modal () {
  const { modal, filters } = React.useContext(StoreContext);

  const [search, setSearch] = React.useState('');
  const [bedrooms, setBedrooms] = React.useState([1, 3]);
  const [startDate, setStartDate] = React.useState('');
  const [endDate, setEndDate] = React.useState('');
  const [price, setPrice] = React.useState([100, 300]);
  const [review, setReview] = React.useState('highToLow');

  const applyFilters = () => {
    if (endDate < startDate) {
      modal.setModal('Check-In date must be before Check-Out date');
    } else {
      filters.setFilters({ search: search, bedrooms: bedrooms, startDate: startDate, endDate: endDate, price: price, review: review });
      modal.setModal('');
    }
  }

  const ErrorContent = () => {
    return (
      <p>{modal.modal}</p>
    )
  }

  const handleBedroomChange = (event, newValue) => {
    setBedrooms(newValue);
  }

  const handlePriceChange = (event, newValue) => {
    setPrice(newValue);
  }

  if (modal.modal === 'filters') {
    return (
      <div className="modal-container">
        <div className="modal-content">
            <h2 className="modal-title">Search Filters</h2>
            <form>
              <input className="input" type="text" value={search} onChange={({ target }) => setSearch(target.value)} placeholder="Search Title or City"/>
              <p>Number of Bedrooms</p>
              <Slider
                getAriaLabel={() => 'Temperature range'}
                onChange={handleBedroomChange}
                valueLabelDisplay="auto"
                value={bedrooms}
                step={1}
                marks
                min={1}
                max={10}
              />
              <label htmlFor="stateDate">Check-In Date</label>
              <input id="startDate" className="input" type="date" value={startDate} onChange={({ target }) => setStartDate(target.value)}/>
              <label htmlFor="endDate">Check-Out Date</label>
              <input id="endDate" className="input" type="date" value={endDate} onChange={({ target }) => setEndDate(target.value)}/>
              <p>Price</p>
              <Slider
                getAriaLabel={() => 'Temperature range'}
                onChange={handlePriceChange}
                valueLabelDisplay="auto"
                value={price}
                min={0}
                max={1000}
              />
              <label htmlFor="highToLow">Sort By Review High to Low</label>
              <input id="highToLow" value="highToLow" name="reviewSort" className="input" type="radio" checked={review === 'highToLow'} onChange={({ target }) => setReview(target.value)}/>
              <label htmlFor="lowToHigh">Sort By Review Low to High</label>
              <input id="lowToHigh" value="lowToHigh" name="reviewSort" className="input" type="radio" checked={review === 'lowToHigh'} onChange={({ target }) => setReview(target.value)}/>
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
