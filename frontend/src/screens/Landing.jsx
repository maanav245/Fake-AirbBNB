import React from 'react';
import Modal from '../components/Modal';
import LoggedInButtons from '../components/LoggedInButtons';
import LoginButton from '../components/LoginButton';
import { StoreContext } from '../Store';
import Port from '../config.json';
import Error from '../Error';
import { LinkButton } from '../components/LinkButton'
import Logo from '../components/Logo'
import { StyledSection, StyledHeader, StyledMain, Banner, ListingsContainer, ListingContainer, ListingImage, ListingInfo } from '../components/StyledComponents'

function Landing () {
  const { token, modal, user, filters, listingInfo, viewListingId, page } = React.useContext(StoreContext);
  /*
  Use state used to store the listing displayed
  */
  const [listings, setListings] = React.useState([]);
  /*
  Function used to print out current listings
  */
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
        if (res.published) {
          listings2.push({ id: json.listings[i].id, info: res });
        }
      }

      for (let i = 0; i < listings2.length; i++) {
        listings2[i].info.averageReview = calculateReview(listings2[i]);
      }
      const sortedListings = await sortListings(listings2);
      const filteredListings = applyFilters(sortedListings);
      setListings(filteredListings);
    } else {
      Error(json.error, modal);
    }
  }, [filters])

  /*
  Get particular information of a listing
  */
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
  /*
  Several sorting function used to sort the listing based on their particular qualities
  */
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
          if (json.bookings[i].owner === user.user && json.bookings[i].status === 'accepted') {
            for (let j = 0; j < listings2.length; j++) {
              if (listings2[j].id.toString() === json.bookings[i].listingId) {
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
      const dateFilteredListings = [];
      for (let i = 0; i < listings2.length; i++) {
        if (listings2[i].info.availability.length > 0) {
          if (Date.parse(listings2[i].info.availability[0]) <= Date.parse(filters.filters.startDate) && Date.parse(listings2[i].info.availability[listings2[i].info.availability.length - 1]) >= Date.parse(filters.filters.endDate)) {
            dateFilteredListings.push(listings2[i]);
          }
        }
      }
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
    if (filters.filters.review === 'highToLow') {
      return allFilters.sort((a, b) => (a.info.averageReview < b.info.averageReview) ? 1 : ((b.info.averageReview < a.info.averageReview) ? -1 : 0));
    } else {
      return allFilters.sort((a, b) => (a.info.averageReview > b.info.averageReview) ? 1 : ((b.info.averageReview > a.info.averageReview) ? -1 : 0));
    }
  }

  const calculateReview = (listing) => {
    let total = 0;
    let count = 0;
    for (let i = 0; i < listing.info.reviews.length; i++) {
      total += Number.parseInt(listing.info.reviews[i].rating);
      count++;
    }

    return count === 0 ? 0 : total / count;
  }

  const FiltersApplied = () => {
    if (Object.keys(filters.filters).length !== 0) {
      return (
        <div>
          <p>Listings filtered by...</p>
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
        <li>Title or City: {`"${filters.filters.search}"`}</li>
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
        <li>Available between {filters.filters.startDate} and {filters.filters.endDate}</li>
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
        <li>Sorted by reviews from highest to lowest</li>
      )
    } else {
      return (
        <li>Sorted by reviews from lowest to highest</li>
      )
    }
  }

  const DisplayListings = () => {
    if (listings.length !== 0) {
      return (
        listings.map((e, i) => (
          <ListingContainer key={i}>
            <ListingImage src={e.info.thumbnail}>
            </ListingImage>
            <ListingInfo>
              <h2>{e.info.title}</h2>
              <p>Location: {e.info.address.city}</p>
              <p>Number of bedrooms: {e.info.metadata.bedrooms.length}</p>
              <p>${e.info.price} per night</p>
              <p>Number of reviews: {e.info.reviews.length}</p>
              <p>Average review: {e.info.averageReview}</p>
              <LinkButton to={'/view-listing/' + e.id} onClick={function () {
                listingInfo.setlistingInfo(e.info);
                viewListingId.setViewListingId(e.id);
                page.setPage(6);
              }} value="View"/>
            </ListingInfo>
          </ListingContainer>
        ))
      );
    } else {
      return (
        <p>No Listings to Display!</p>
      )
    }
  }

  return (
    <StyledSection>
      <Modal/>
      <StyledHeader>
        <LoggedInButtons/>
        <Banner>
          <Logo/>
        </Banner>
        <Banner>
          <LoginButton/>
        </Banner>
      </StyledHeader>
      <StyledMain>
        <h1>Listings</h1>
        <LinkButton to={'.'} onClick={() => modal.setModal('filters')} value="Filter Listings"/>
        <FiltersApplied/>
        <LinkButton to={'.'} onClick={() => filters.setFilters({})} value="Clear Filters"/>
        <ListingsContainer>
          <DisplayListings/>
        </ListingsContainer>
      </StyledMain>
      <footer>
      </footer>
    </StyledSection>
  );
}

export default Landing;
