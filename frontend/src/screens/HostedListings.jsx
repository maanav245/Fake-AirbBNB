import React from 'react';
import LoggedInButtons from '../components/LoggedInButtons';
import LoginButton from '../components/LoginButton';
import { StoreContext } from '../Store';
import Modal from '../components/Modal';
import Port from '../config.json';
import Error from '../Error';
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import PropTypes from 'prop-types';
import LinkButton from '../components/LinkButton'
import Logo from '../components/Logo'
import { StyledSection, StyledHeader, StyledMain, Banner, ListingsContainer, ListingContainer, ListingImage, ListingInfo, ListingButtons } from '../components/StyledComponents'

function HostedListings () {
  const { page, token, modal, user, listingInfo, editListingId, bookingsListingId } = React.useContext(StoreContext);
  // console.log(token);
  // console.log(user.user);
  const [done, setDone] = React.useState([]);
  const [render, setRender] = React.useState(0);
  const [date, setDate] = React.useState([]);
  const [pid, setPid] = React.useState('');
  page.setPage(3);

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
      const sortedListings = await sortListings(listings2);
      setDone(sortedListings);
    } else {
      Error(json.error, modal);
    }
  }, [render]);

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

  function PublishListing () {
    let val = date;
    // console.log('date var is: ' + val.length)
    if (val.length === 0) {
      // console.log('correct')
      val = null
    }
    return (

        <div id="exampleModal">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">Publish Listing</h5>

                </div>
                <div className="modal-body">
                <Calendar value = {val} onChange={function (e) {
                  setDate(e)
                  // console.log(date);
                } } selectRange={true}/>

                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                  <button type="button" className="btn btn-primary" onClick={function () {
                    publish(pid);
                    setPid('');
                  }}>Save changes</button>
                </div>
              </div>
            </div>
          </div>
    );
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
        <LinkButton to={'.'} onClick={() => setPid(listing.id)} value="Publish"/>
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
            <PublishListing/>
            <h1>Hosted Listings</h1>
            <LinkButton to={'/new-listing'} onClick={() => page.setPage(4)} value="Create New Listing"/>
            <ListingsContainer>
              <DisplayListings/>
            </ListingsContainer>
          </StyledMain>
          <footer>
          </footer>
        </StyledSection>
      );
    } else {
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
          <h1>Hosted Listings</h1>
          <LinkButton to={'/new-listing'} onClick={() => page.setPage(4)} value="Create New Listing"/>
          <ListingsContainer>
            <DisplayListings/>
          </ListingsContainer>
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
