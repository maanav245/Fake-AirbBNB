import React from 'react';
import LoggedInButtons from '../components/LoggedInButtons';
import LoginButton from '../components/LoginButton';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import { StoreContext } from '../Store';
import Modal from '../components/Modal';
import Port from '../config.json';
import Error from '../Error';
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';

function HostedListings () {
  const { page, token, modal, user, listingInfo, editListingId } = React.useContext(StoreContext);
  console.log(token);
  console.log(user.user);
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
      console.log('got fetch');
      console.log(json.listings);

      for (let i = 0; i < json.listings.length; i++) {
        if (json.listings[i].owner === user.user) {
          if (!listings.includes(json.listings[i].owner)) {
            console.log(json.listings[i].id);
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
    if (!response.ok) {
      Error(json.error, modal);
    }
  }

  function PublishListing () {
    let val = date;
    console.log('date var is: ' + val.length)
    if (val.length === 0) {
      console.log('correct')
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
                  console.log(date);
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
    console.log('clicked delete')
    console.log(id);
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

  const DisplayListings = () => {
    if (done !== []) {
      console.log('rendering');

      for (let index = 0; index < done.length; index++) {
        console.log(done[index]);
      }

      return (
        done.map((e, i) => (
          <div className="listing_cont" key={i}>
            <div>
              <img className="listing_image" src={e.info.thumbnail}></img>
              <div className="listing_buttons">
                <Router>
                  <Link className="button listing_button" to={'/edit-listings/' + e.id} onClick={function () {
                    console.log(e);
                    listingInfo.setlistingInfo(e.info);
                    editListingId.seteditListingId(e.id)
                    page.setPage(5);
                  }} >
                    Edit
                  </Link>
                </Router>
                <button className="button listing_button" type="button" onClick={() => deleteSingleListing(e.id)}>Delete</button>
                <button className="button listing_button" type="button" onClick={() => setPid(e.id)}>Publish</button>
              </div>
            </div>
            <div className="listing_info">
              <h2>{e.info.title}</h2>
              <p>{e.info.address.street}, {e.info.address.city}, {e.info.address.state}, {e.info.address.postcode}, {e.info.address.country}</p>
              <p>${e.info.price} per night</p>
              <p>Type: {e.info.metadata.type}</p>
              <p>Number of beds: {e.info.metadata.totalbedrooms}</p>
              {console.log(e.info.metadata)}
              <p>Number of bathrooms: {e.info.metadata.bathrooms}</p>
              <p>Average rating: TODO</p>
              <p>Number of reviews: {e.info.reviews.length}</p>
            </div>
          </div>
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
            <PublishListing/>
            <h1>Hosted Listings</h1>
            <Router>
              <Link className="button" to={'/new-listing'} onClick={() => page.setPage(4)}>
                Create New Listing
              </Link>
            </Router>
            <div className="hosted_container">
              <DisplayListings/>
            </div>
          </main>
          <footer>
          </footer>
        </section>
      );
    } else {
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

          <h1>Hosted Listings</h1>
          <Router>
            <Link className="button" to={'/new-listing'} onClick={() => page.setPage(4)}>
              Create New Listing
            </Link>
          </Router>
          <div className="hosted_container">
            <DisplayListings/>
          </div>
        </main>
        <footer>
        </footer>
      </section>
      );
    }
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

export default HostedListings;
