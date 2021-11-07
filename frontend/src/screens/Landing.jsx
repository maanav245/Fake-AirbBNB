import React from 'react';
import Modal from '../components/Modal';
import LoggedInButtons from '../components/LoggedInButtons';
import LoginButton from '../components/LoginButton';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import { StoreContext } from '../Store';
import Port from '../config.json';

function Landing () {
  const { page, token, modal, user } = React.useContext(StoreContext);

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
      sortListings(listings2);
    } else {
      Error(json.error, modal);
    }
  }, [])

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
        setListings(sortedListings);
      } else {
        Error(json.error, modal);
      }
    } else {
      const sortedListings = sortAlphabetically(listings2);
      setListings(sortedListings);
    }
  }

  const sortAlphabetically = (listings2) => {
    return listings2.sort((a, b) => (a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0));
  }

  const DisplayListings = () => {
    if (listings !== []) {
      return (
        listings.map((e, i) => (
          <div className="listing_cont" key={i}>
            <img className="listing_image" src={e.thumbnail}></img>
            <div className="listing_info">
              <p>Title: {e.title}</p>
              <p>Number of reviews: {e.reviews.length}</p>
            </div>
          </div>
        ))
      );
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
        <Router>
          <Link className="button" to={'/new-listing'} onClick={() => page.setPage(4)}>
            Create New Listing
          </Link>
        </Router>
        <div id="hosted-listings-area">See hosted listings here</div>
        <div className="hosted_container"> <DisplayListings/>  </div>
      </main>
      <footer>
      </footer>
    </section>
  );
}

export default Landing;
