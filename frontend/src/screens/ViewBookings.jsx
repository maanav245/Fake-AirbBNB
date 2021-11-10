import React from 'react';
import { StoreContext } from '../Store';
import Modal from '../components/Modal';
import LoggedInButtons from '../components/LoggedInButtons';
import LoginButton from '../components/LoginButton';
import Port from '../config.json';
import Error from '../Error';

function ViewBookings () {
  const { token, modal, listingInfo, bookingsListingId } = React.useContext(StoreContext);

  const [bookings, setBookings] = React.useState([]);
  const [render, setRender] = React.useState(0);

  React.useEffect(async () => {
    const fetchedBookings = await getBookings();
    setBookings([...fetchedBookings]);
  }, [render]);

  const getBookings = async () => {
    const bookings2 = [];

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
        if (json.bookings[i].listingId === bookingsListingId.bookingsListingId.toString()) {
          bookings2.push(json.bookings[i]);
        }
      }
    } else {
      Error(json.error, modal);
    }
    return bookings2;
  }

  const acceptBooking = async (id) => {
    const response = await fetch(`http://localhost:${Port.BACKEND_PORT}/bookings/accept/${id}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: token.token,
      },
    });
    const json = await response.json();
    if (response.ok) {
      setRender(Math.random);
    } else {
      Error(json.error, modal);
    }
  }

  const declineBooking = async (id) => {
    const response = await fetch(`http://localhost:${Port.BACKEND_PORT}/bookings/decline/${id}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: token.token,
      },
    });
    const json = await response.json();
    if (response.ok) {
      setRender(Math.random);
    } else {
      Error(json.error, modal);
    }
  }

  const BookingsForThisListing = () => {
    if (bookings !== []) {
      return (
        bookings.map((e, i) => (
          <div key={i}>
            <hr/>
            <p>Booking Owner: {e.owner}</p>
            <p>Check-In Date: {e.dateRange[0]}</p>
            <p>Check-Out Date: {e.dateRange[1]}</p>
            <p>Total Price: ${e.totalPrice}</p>
            <p>Booking Status: {e.status}</p>
            <button className="button" type="button" onClick={() => acceptBooking(e.id)}>Accept</button>
            <button className="button" type="button" onClick={() => declineBooking(e.id)}>Decline</button>
            <hr/>
          </div>
        ))
      );
    } else {
      return (
        <h2>No Bookings</h2>
      );
    }
  }

  const ListingInformation = () => {
    return (
      <p>Listing Posted: {listingInfo.listingInfo.postedOn}</p>
    )
  }

  if (token.token !== '') {
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
        <h1>Bookings</h1>
        <div>
          <BookingsForThisListing/>
        </div>
        <h1>Listing Information</h1>
        <div>
          <ListingInformation/>
        </div>
      </main>
      <footer>
      </footer>
    </section>
    );
  } else {
    return (
      <section>
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
          <h1>You must log in to view this page</h1>
        </main>
        <footer>
        </footer>
      </section>
    );
  }
}

export default ViewBookings;
