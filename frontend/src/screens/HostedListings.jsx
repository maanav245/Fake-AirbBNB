import React from 'react';
import LoggedInButtons from '../components/LoggedInButtons';
import LoginButton from '../components/LoginButton';
import { StoreContext } from '../Store';
import Modal1 from '../components/Modal';
import Port from '../config.json';
import Error from '../Error';
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import PropTypes from 'prop-types';
import LinkButton from '../components/LinkButton'
import Logo from '../components/Logo'
import ProfitGraph from '../components/ProfitGraph';
import { Modal, Button } from 'react-bootstrap';
import { StyledSection, StyledHeader, StyledMain, Banner, ListingsContainer, ListingContainer, ListingImage, ListingInfo, ListingButtons } from '../components/StyledComponents'

function HostedListings () {
  const { page, token, modal, user, listingInfo, editListingId, bookingsListingId } = React.useContext(StoreContext);
  // console.log(token);
  // console.log(user.user);
  const closePublishModal = () => setShowPublishModal(false);
  const displayPublishModal = () => setShowPublishModal(true);
  const [done, setDone] = React.useState([]);
  const [render, setRender] = React.useState(0);
  const [date, setDate] = React.useState(null);
  const [pid, setPid] = React.useState('');
  const [bookings, setBookings] = React.useState([]);
  const [showPublishModal, setShowPublishModal] = React.useState(false);
  page.setPage(3);
  console.log(bookings);

  React.useEffect(async () => {
    const listings = [];
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
      // console.log('got fetch');
      // console.log(json.listings);

      for (let i = 0; i < json.listings.length; i++) {
        if (json.listings[i].owner === user.user) {
          if (!listings.includes(json.listings[i].owner)) {
            // console.log(json.listings[i].id);
            listings.push(json.listings[i].id);
          }
        }
      }
      for (let i = 0; i < listings.length; i++) {
        const res = await getSingleListing(listings[i]);
        if (!listings2.includes(res)) {
          listings2.push({ id: listings[i], info: res });
        }
      }
      sortListings(listings2).then(response => {
        setDone(response);
        getBookings(response).then((res) => {
          setBookings([...res.reverse()]);
        })
      });
    } else {
      Error(json.error, modal);
    }
  }, [render]);

  const getBookings = async (list) => {
    const bookings2 = [];
    const bookingMap = new Map();
    const response = await fetch(`http://localhost:${Port.BACKEND_PORT}/bookings`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: token.token,
      },
    });
    const json = await response.json();
    const TodayDate = new Date();
    const num = parseInt(TodayDate.getMonth()) + 1
    if (response.ok) {
      for (let i = 0; i < json.bookings.length; i++) {
        console.log(json.bookings);
        console.log(user.user)
        console.log(done);
        for (let index = 0; index < list.length; index++) {
          const element = list[index].id;
          console.log(element);
          console.log(parseInt(json.bookings[i].listingId));

          console.log('month of booking is: ' + num);
          if (parseInt(json.bookings[i].listingId) === element && json.bookings[i].status === 'accepted' &&
          parseInt(json.bookings[i].dateRange[0].split('-')[1]) === num) {
            console.log('success')
            if (bookingMap.has(json.bookings[i].dateRange[0])) {
              bookingMap.set(json.bookings[i].dateRange[0], bookingMap.get(json.bookings[i].dateRange[0]) + json.bookings[i].totalPrice)
            } else {
              bookingMap.set(json.bookings[i].dateRange[0], json.bookings[i].totalPrice)
            }
          }
        }
      }
    } else {
      Error(json.error, modal);
    }
    bookingMap.forEach(function (value, key) {
      bookings2.push({ date: key, price: value });
    })
    return bookings2;
  }

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
    return listings2.sort((a, b) => (a.info.title > b.info.title) ? 1 : ((b.info.title > a.info.title) ? -1 : 0));
  }

  async function publish (id) {
    const publishData = { availability: date }
    const response = await fetch(`http://localhost:${Port.BACKEND_PORT}/listings/publish/${id}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: token.token,
      },
      body: JSON.stringify(publishData)
    });
    const json = await response.json();
    if (response.ok) {
      setRender(Math.random);
    } else {
      Error(json.error, modal);
    }
  }

  async function unpublish (id) {
    const response = await fetch(`http://localhost:${Port.BACKEND_PORT}/listings/unpublish/${id}`, {
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

  async function deleteSingleListing (id) {
    // console.log('clicked delete')
    // console.log(id);
    const response = await fetch(`http://localhost:${Port.BACKEND_PORT}/listings/${id}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: token.token,
      },
    });
    const json = await response.json();
    if (!response.ok) {
      Error(json.error, modal);
    }
    setRender(Math.random);
  }

  const PublishButton = ({ listing }) => {
    if (listing.info.published) {
      return (
        <LinkButton to={'.'} onClick={() => unpublish(listing.id)} value="Unpublish"/>
      )
    } else {
      return (
        <LinkButton to={'.'} onClick={function () {
          setPid(listing.id);
          displayPublishModal();
        }} value="Publish"/>
      )
    }
  }

  PublishButton.propTypes = {
    listing: PropTypes.object.isRequired,
  };

  const DisplayListings = () => {
    if (done !== []) {
      // console.log('rendering');

      for (let index = 0; index < done.length; index++) {
        // console.log(done[index]);
      }
      return (
        done.map((e, i) => (
          <ListingContainer key={i}>
            <div>
              <ListingImage src={e.info.thumbnail}>
              </ListingImage>
              <ListingButtons>
                <LinkButton to={'/edit-listings/' + e.id} onClick={function () {
                  // console.log(e);
                  listingInfo.setlistingInfo(e.info);
                  editListingId.seteditListingId(e.id);
                  page.setPage(5);
                }} value="Edit"/>
                <LinkButton to={'.'} onClick={() => deleteSingleListing(e.id)} value="Delete"/>
                <PublishButton listing={e}/>
              </ListingButtons>
            </div>
            <ListingInfo>
              <h2>{e.info.title}</h2>
              <p>{e.info.address.street}, {e.info.address.city}, {e.info.address.state}, {e.info.address.postcode}, {e.info.address.country}</p>
              <p>${e.info.price} per night</p>
              <p>Type: {e.info.metadata.type}</p>
              <p>Number of beds: {e.info.metadata.totalbedrooms}</p>
              { /* console.log(e.info.metadata) */}
              <p>Number of bathrooms: {e.info.metadata.bathrooms}</p>
              <p>Average rating: TODO</p>
              <p>Number of reviews: {e.info.reviews.length}</p>
            </ListingInfo>
            <LinkButton to={'/view-bookings/' + e.id} onClick={function () {
              listingInfo.setlistingInfo(e.info);
              bookingsListingId.setBookingsListingId(e.id);
              page.setPage(7);
            }} value="View Bookings"/>
          </ListingContainer>
        ))
      );
    } else {
      return (
        <h2>No Hosted Listings</h2>
      );
    }
  }

  if (token.token !== '') {
    if (pid !== '') {
      return (
        <StyledSection>
          <Modal1/>
          <StyledHeader>
          <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
            <LoggedInButtons/>
            <Banner>
              <Logo/>
            </Banner>
            <Banner>
              <LoginButton/>
            </Banner>
          </StyledHeader>
          <StyledMain>

          <Modal show={showPublishModal} onHide={closePublishModal}>
            <Modal.Header closeButton>
              <Modal.Title>Reviews</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Calendar value = {date} onChange={function (e) {
                setDate(e)
                // console.log(date);
              } } selectRange={true}/>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={closePublishModal}>
                Close
              </Button>
              <Button type="button" className="btn btn-primary" onClick={function () {
                publish(pid);
                setPid('');
                closePublishModal();
              }}>Save changes</Button>

            </Modal.Footer>
          </Modal>

            <h1>Hosted Listings</h1>
            <LinkButton to={'/new-listing'} onClick={() => page.setPage(4)} value="Create New Listing"/>
            <ListingsContainer>
              <DisplayListings/>
            </ListingsContainer>
            <ProfitGraph bookings={bookings}/>
          </StyledMain>
          <footer>
          </footer>
        </StyledSection>
      );
    } else {
      return (
      <StyledSection>
        <Modal1/>
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
          <h1>Hosted Listings</h1>
          <LinkButton to={'/new-listing'} onClick={() => page.setPage(4)} value="Create New Listing"/>
          <ListingsContainer>
            <DisplayListings/>
          </ListingsContainer>
          <ProfitGraph bookings={bookings}/>
        </StyledMain>
        <footer>
        </footer>
      </StyledSection>
      );
    }
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

export default HostedListings;
