import React from 'react';
import { StoreContext } from '../Store';
import Modal from '../components/Modal';
import LoggedInButtons from '../components/LoggedInButtons';
import LoginButton from '../components/LoginButton';
import Port from '../config.json';
import Error from '../Error';
import PropTypes from 'prop-types';
import { LinkButton } from '../components/LinkButton'
import Logo from '../components/Logo'
import { StyledSection, StyledHeader, StyledMain, Banner } from '../components/StyledComponents'

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

  const acceptBooking = async (booking) => {
    const response = await fetch(`http://localhost:${Port.BACKEND_PORT}/bookings/accept/${booking.id}`, {
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

  const BookingRequestButtons = ({ booking }) => {
    if (booking.status === 'pending') {
      return (
        <div>
          <LinkButton id={`accept${booking.id}`} to={'.'} onClick={() => acceptBooking(booking)} value="Accept"/>
          <LinkButton id={`decline${booking.id}`} to={'.'} onClick={() => declineBooking(booking.id)} value="Decline"/>
        </div>
      );
    } else {
      return null;
    }
  }

  BookingRequestButtons.propTypes = {
    booking: PropTypes.object.isRequired,
  };

  const BookingsForThisListing = () => {
    if (bookings !== []) {
      return (
        bookings.map((e, i) => (
          <div key={i}>
            <hr/>
            <p>Booking Owner: {e.owner}</p>
            <p>Check-In Date: {formatDate(e.dateRange[0])}</p>
            <p>Check-Out Date: {formatDate(e.dateRange[1])}</p>
            <p>Total Price: ${e.totalPrice}</p>
            <p>Booking Status: {e.status}</p>
            <BookingRequestButtons booking={e}/>
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

  const formatDate = (date) => {
    if (date === null || date === undefined) {
      return;
    }
    const year = date.split('-')[0];
    const month = date.split('-')[1];
    const day = date.split('-')[2].split('T')[0];
    const formattedDate = day + '/' + month + '/' + year;
    return formattedDate;
  }

  const getDays = (date) => {
    const today = new Date();
    const diff = today - Date.parse(date);
    const diffDays = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return diffDays;
  }

  const getDays2 = (date1, date2) => {
    const diff = Date.parse(date2) - date1;
    const diffDays = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return diffDays;
  }

  const getDaysBooked = () => {
    let totalDays = 0;
    const today = new Date();
    const thisYear = new Date(`1/1/${today.getFullYear()}`);
    for (let i = 0; i < bookings.length; i++) {
      if (Date.parse(bookings[i].dateRange[1]) >= thisYear) {
        totalDays += getDays2(Math.max(Date.parse(bookings[i].dateRange[0]), thisYear), bookings[i].dateRange[1]);
      }
    }
    return totalDays;
  }

  const getProfit = () => {
    const days = getDaysBooked();
    const price = listingInfo.listingInfo.price;
    return days * price;
  }

  const ListingInformation = () => {
    return (
      <div>
        <p>Listing Posted: {formatDate(listingInfo.listingInfo.postedOn)}</p>
        <p>Days Live: {getDays(listingInfo.listingInfo.postedOn)}</p>
        <p>Days Booked This Year: {getDaysBooked()}</p>
        <p>Listing Profit This Year: ${getProfit()}</p>
      </div>
    )
  }

  if (token.token !== '') {
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
        <h1>Listing Information</h1>
        <div>
          <ListingInformation/>
        </div>
        <h1>Booking Requests</h1>
        <div>
          <BookingsForThisListing/>
        </div>
      </StyledMain>
      <footer>
      </footer>
    </StyledSection>
    );
  } else {
    return (
      <StyledSection>
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
          <h1>You must log in to view this page</h1>
        </StyledMain>
        <footer>
        </footer>
      </StyledSection>
    );
  }
}

export default ViewBookings;
