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
        const res = await getSingleListing(json.listings[i].id);
        listings2.push({ id: json.listings[i].id, info: res });
      }

      const sortedListings = await sortListings(listings2);
      const filteredListings = applyFilters(sortedListings);
      setListings(filteredListings);
    } else {
      Error(json.error, modal);
    }
  }, [filters])

  async function getSingleListing (id) {
    const response = await fetch(`http://localhost:${Port.BACKEND_PORT}/listings/${id}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: token.token,
      },
    });
    const json = await response.json();
    if (response.ok) {
      return json.listing;
    } else {
      Error(json.error, modal);
    }
  }

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
    return listings2.sort((a, b) => (a.info.title > b.info.title) ? 1 : ((b.info.title > a.info.title) ? -1 : 0));
  }

  const applyFilters = (listings2) => {
    console.log(filters.filters);
    let filtered = false;
    const filteredListings = [];
    if (filters.filters.search) {
      filtered = true;
      const searchFilteredListings = [];
      for (let i = 0; i < listings2.length; i++) {
        if (listings2[i].info.title.toLowerCase().includes(filters.filters.search.toLowerCase()) || listings2[i].info.address.city.toLowerCase().includes(filters.filters.search.toLowerCase())) {
          searchFilteredListings.push(listings2[i]);
        }
      }
      filteredListings.push(searchFilteredListings);
    }
    if (filters.filters.bedrooms) {
      filtered = true;
      const bedroomFilteredListings = [];
      for (let i = 0; i < listings2.length; i++) {
        if (listings2[i].info.metadata.bedrooms.length >= Math.min.apply(Math, filters.filters.bedrooms) && listings2[i].info.metadata.bedrooms.length <= Math.max.apply(Math, filters.filters.bedrooms)) {
          bedroomFilteredListings.push(listings2[i]);
        }
      }
      filteredListings.push(bedroomFilteredListings);
    }
    if (filters.filters.startDate && filters.filters.endDate) {
      filtered = true;
      const dateFilteredListings = listings2;
      console.log('TODO: filter by date');
      filteredListings.push(dateFilteredListings);
    }
    if (filters.filters.price) {
      filtered = true;
      const priceFilteredListings = [];
      for (let i = 0; i < listings2.length; i++) {
        if (listings2[i].info.price >= Math.min.apply(Math, filters.filters.price) && listings2[i].info.price <= Math.max.apply(Math, filters.filters.price)) {
          priceFilteredListings.push(listings2[i]);
        }
      }
      filteredListings.push(priceFilteredListings);
    }
    if (filters.filters.review) {
      filtered = true;
    }
    if (filtered) {
      let totalFiltered = filteredListings[0];
      for (let i = 0; i < filteredListings.length; i++) {
        totalFiltered = totalFiltered.filter(a => filteredListings[i].includes(a));
      }
      const sortedbyReview = sortByReview(totalFiltered);
      return sortedbyReview;
    } else {
      return listings2;
    }
  }

  const sortByReview = (allFilters) => {
    console.log('TODO: sort listings by review');
    return allFilters;
  }

  const FiltersApplied = () => {
    if (Object.keys(filters.filters).length !== 0) {
      return (
        <div>
          <p>Filtering by...</p>
          <SearchFilterApplied/>
          <BedroomFilterApplied/>
          <DateFilterApplied/>
          <PriceFilterApplied/>
          <ReviewFilterApplied/>
        </div>
      )
    } else {
      return null;
    }
  }

  const SearchFilterApplied = () => {
    if (filters.filters.search !== '') {
      return (
        <li>Title or City containing {filters.filters.search}</li>
      )
    } else {
      return null;
    }
  }

  const BedroomFilterApplied = () => {
    return (
      <li>Between {Math.min.apply(Math, filters.filters.bedrooms)} and {Math.max.apply(Math, filters.filters.bedrooms)} bedrooms</li>
    )
  }

  const DateFilterApplied = () => {
    if (filters.filters.startDate !== '' && filters.filters.endDate !== '') {
      return (
        <li>Stay between {filters.filters.startDate} and {filters.filters.endDate}</li>
      )
    } else {
      return null;
    }
  }

  const PriceFilterApplied = () => {
    return (
      <li>Between ${Math.min.apply(Math, filters.filters.price)} and ${Math.max.apply(Math, filters.filters.price)} per night</li>
    )
  }

  const ReviewFilterApplied = () => {
    if (filters.filters.review === 'highToLow') {
      return (
        <li>Sorted from highest to lowest review rating</li>
      )
    } else {
      return (
        <li>Sorted from lowest to highest review rating</li>
      )
    }
  }

  const DisplayListings = () => {
    if (listings.length !== 0) {
      return (
        listings.map((e, i) => (
          <div className="listing_cont" key={i}>
            <img className="listing_image" src={e.info.thumbnail}></img>
            <div className="listing_info">
              <p>Title: {e.info.title}</p>
              <p>City: {e.info.address.city}</p>
              <p>Number of bedrooms: {e.info.metadata.bedrooms.length}</p>
              <p>Price per night: ${e.info.price}</p>
              <p>Number of reviews: {e.info.reviews.length}</p>
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
        <FiltersApplied/>
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
