import React from 'react';
import LoggedInButtons from '../components/LoggedInButtons';
import LoginButton from '../components/LoginButton';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import { StoreContext } from '../Store';
import Modal from '../components/Modal';
import Port from '../config.json';

function HostedListings () {
  const { page, token, modal, user, listingInfo, editListingId } = React.useContext(StoreContext);
  console.log(token);
  console.log(user.user);
  const [done, setDone] = React.useState([]);
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
      console.log(listings);
      setDone(listings2);
    } else {
      Error(json.error, modal);
    }
  }, []);

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

  const Bar = () => {
    if (done !== []) {
      console.log('rendering');

      for (let index = 0; index < done.length; index++) {
        console.log(done[index]);
      }

      return (

        done.map((e, i) => (
          <div className="listing_cont" key={i}>
            <img className="listing_image" src={e.info.thumbnail}></img>
            <div className="listing_info">{e.info.title} <br /> {e.info.address.street} {', '}  {e.info.address.city} {', '} {e.info.address.state} {', '} {e.info.address.postcode} {', '} {e.info.address.country} {' '}  <br />  {e.info.price} <br />{e.info.metadata.type} <br /> {e.info.metadata.totalbedrooms}  <br /> {e.info.metadata.bathrooms}
            <Router>
            <Link to={'/edit-listings/' + e.id} onClick={function () {
              console.log(e);
              listingInfo.setlistingInfo(e.info);
              editListingId.seteditListingId(e.id)
              page.setPage(5);
            }} >
            Edit
              </Link>
            </Router>
            </div>
          </div>

        ))
      );
    } else {
      return null;
    }
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
          <h1>Hosted Listings</h1>
          <Router>
            <Link className="button" to={'/new-listing'} onClick={() => page.setPage(4)}>
              Create New Listing
            </Link>
          </Router>
          <div id="hosted-listings-area">See hosted listings here</div>
          <div className="hosted_container"> <Bar/>  </div>

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

export default HostedListings;
