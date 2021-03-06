import React from 'react';
import { StoreContext } from '../Store';
import { Slider } from '@mui/material';
import { LinkButton } from './LinkButton'
import { StyledForm, StyledInput } from './StyledComponents.jsx'
import styled from 'styled-components';
import PropTypes from 'prop-types';

const ModalContainer = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: flex-start;
  justify-content: center;
`

const ModalContent = styled.div`
  width: 70vw;
  background-color: #fff;
  display: flex;
  align-items: center;
  flex-direction: column;
  border-radius: 10px;
  margin-top: 100px;
`

export const ErrorContent = ({ content }) => {
  return (
    <p>{content}</p>
  )
}

ErrorContent.propTypes = {
  content: PropTypes.string.isRequired,
};

/*
A modal for different situation, including errors, for filtering listings etc.
*/

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

  const handleBedroomChange = (event, newValue) => {
    setBedrooms(newValue);
  }

  const handlePriceChange = (event, newValue) => {
    setPrice(newValue);
  }

  if (modal.modal === 'filters') {
    return (
      <ModalContainer>
        <ModalContent>
            <h2 className="modal-title">Search Filters</h2>
            <StyledForm>
              <div className="searchInput">
                <label htmlFor="searchTitle">Search by Title or City:</label>
                <StyledInput id="searchTitle" type="text" value={search} onChange={({ target }) => setSearch(target.value)} placeholder="Beach/Sydney"/>
              </div>
              <div className="searchInput">
                <label htmlFor="searchBedrooms">Number of Bedrooms:</label>
                <Slider
                  className="my-slider"
                  id="searchBedrooms"
                  getAriaLabel={() => 'Temperature range'}
                  onChange={handleBedroomChange}
                  valueLabelDisplay="auto"
                  value={bedrooms}
                  step={1}
                  marks
                  min={1}
                  max={10}
                />
              </div>
              <div className="searchInput">
                <label htmlFor="stateDate">Check-In Date:</label>
                <StyledInput id="startDate" type="date" value={startDate} onChange={({ target }) => setStartDate(target.value)}/>
              </div>
              <div className="searchInput">
                <label htmlFor="endDate">Check-Out Date:</label>
                <StyledInput id="endDate"type="date" value={endDate} onChange={({ target }) => setEndDate(target.value)}/>
              </div>
              <div className="searchInput">
                <label htmlFor="searchPrice">Price Range:</label>
                <Slider
                  className="my-slider"
                  id="searchPrice"
                  getAriaLabel={() => 'Temperature range'}
                  onChange={handlePriceChange}
                  valueLabelDisplay="auto"
                  value={price}
                  min={0}
                  max={1000}
                />
              </div>
              <div className="searchInput">
                <label htmlFor="highToLow">Sort By Review High to Low</label>
                <input id="highToLow" className="radio-button" value="highToLow" name="reviewSort" type="radio" checked={review === 'highToLow'} onChange={({ target }) => setReview(target.value)}/>
              </div>
              <div className="searchInput">
                <label htmlFor="lowToHigh">Sort By Review Low to High</label>
                <input id="lowToHigh" className="radio-button" value="lowToHigh" name="reviewSort" type="radio" checked={review === 'lowToHigh'} onChange={({ target }) => setReview(target.value)}/>
              </div>
            </StyledForm>
            <LinkButton to={'.'} onClick={(event) => applyFilters()} value="Search"/>
            <LinkButton to={'.'} onClick={() => modal.setModal('')} value="Close"/>
        </ModalContent>
      </ModalContainer>
    );
  } else if (modal.modal !== '') {
    return (
      <ModalContainer>
        <ModalContent>
            <h2 className="modal-title">Error!</h2>
            <ErrorContent content={modal.modal}/>
            <LinkButton to={'.'} onClick={() => modal.setModal('')} value="Close"/>
        </ModalContent>
      </ModalContainer>
    );
  } else {
    return null;
  }
}

export default Modal;
