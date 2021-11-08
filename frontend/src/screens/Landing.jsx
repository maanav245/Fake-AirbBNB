import React from 'react';
import Modal from '../components/Modal';
import LoggedInButtons from '../components/LoggedInButtons';
import LoginButton from '../components/LoginButton';
import { StoreContext } from '../Store';
import Port from '../config.json';
import Error from '../Error';

function Landing () {
  const { token, modal, user, filters } = React.useContext(StoreContext);

  const [listings, setListings] = React.useState([]);

  React.useEffect(async () => {
    const listings2 = [];
    const response = await fetch(`http://localhost:${Port.BACKEND_PORT}/listings`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: token.token,
      },
    });
    const json = await response.json();
    if (response.ok) {
      for (let i = 0; i < json.listings.length; i++) {
        listings2.push(json.listings[i]);
      }
      const sortedListings = await sortListings(listings2);
      const filteredListings = applyFilters(sortedListings);
      setListings(filteredListings);
    } else {
      Error(json.error, modal);
    }
  }, [filters])

  const sortListings = async (listings2) => {
    if (token.token !== '') {
      const bookedListings = [];
      const unbookedListings = [];
      const response = await fetch(`http://localhost:${Port.BACKEND_PORT}/bookings`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: token.token,
        },
      });
      const json = await response.json();
      if (response.ok) {
        for (let i = 0; i < json.bookings.length; i++) {
          if (json.bookings[i].owner === user.user) {
            for (let j = 0; j < listings2.length; j++) {
              if (listings2[j].id === json.bookings[i].id) {
                bookedListings.push(listings2[j]);
              }
            }
          }
        }
        for (let i = 0; i < listings2.length; i++) {
          if (!bookedListings.includes(listings2[i])) {
            unbookedListings.push(listings2[i]);
          }
        }
        const sortedBookedListings = sortAlphabetically(bookedListings);
        const sortedUnbookedListings = sortAlphabetically(unbookedListings);
        const sortedListings = [...sortedBookedListings, ...sortedUnbookedListings];
        return sortedListings;
      } else {
        Error(json.error, modal);
      }
    } else {
      const sortedListings = sortAlphabetically(listings2);
      return sortedListings;
    }
  }

  const sortAlphabetically = (listings2) => {
    return listings2.sort((a, b) => (a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0));
  }

  const applyFilters = (listings2) => {
    console.log(listings2);
    const filteredListings = []
    let filtered = false;
    if (filters.filters.search) {
      filtered = true;
      for (let i = 0; i < listings2.length; i++) {
        if (listings2[i].title.toLowerCase().includes(filters.filters.search.toLowerCase()) || listings2[i].address.city.toLowerCase().includes(filters.filters.search.toLowerCase())) {
          filteredListings.push(listings2[i]);
        }
      }
    }
    if (filtered) {
      return filteredListings;
    } else {
      return listings2;
    }
  }

  const DisplayListings = () => {
    if (listings.length !== 0) {
      return (
        listings.map((e, i) => (
          <div className="listing_cont" key={i}>
            <img className="listing_image" src={e.thumbnail}></img>
            <div className="listing_info">
              <p>Title: {e.title}</p>
              <p>City: {e.address.city}</p>
              <p>Number of reviews: {e.reviews.length}</p>
            </div>
          </div>
        ))
      );
    } else {
      return (
        <p>No Listings to Display!</p>
      )
    }
  }

  return (
    <section>
      <Modal/>
      <header>
        <LoggedInButtons/>
        <div className="banner">
          <div id="logo">
            AirBrb
          </div>
        </div>
        <div className="banner">
          <LoginButton/>
        </div>
      </header>
      <main>
        <h1>Listings</h1>
        <button className="button" onClick={() => modal.setModal('filters')}>Filter Listings</button>
        <button className="button" onClick={() => filters.setFilters({})}>Clear Filters</button>
        <div className="listings_container">
          <DisplayListings/>
        </div>
      </main>
      <footer>
      </footer>
    </section>
  );
}

export default Landing;
