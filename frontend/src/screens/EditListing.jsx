import React from 'react';
import LoggedInButtons from '../components/LoggedInButtons';
import LoginButton from '../components/LoginButton';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import { StoreContext } from '../Store';
import Modal from '../components/Modal';

function EditListing () {
  const { listingInfo, token } = React.useContext(StoreContext);

  const res = listingInfo.listingInfo;
  console.log(res);
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
            <h1>Create New Listing</h1>
            <form>
              <input className="input" type="text" value={res.title} placeholder="Listing Title"/>
              <input className="input" type="text" placeholder="Street Address"/>
              <input className="input" type="text" placeholder="City/Suburb"/>
              <input className="input" type="text" placeholder="State"/>
              <input className="input" type="number" placeholder="Postcode"/>
              <input className="input" type="text" placeholder="Country"/>
              <input className="input" type="number" placeholder="Price Per Night"/>
              <input className="input" type="file" />
              <input className="input" type="text" placeholder="Property Type"/>
              <input className="input" type="number" placeholder="Number of Bathrooms"/>
              <input className="input" type="number" placeholder="Number of Bedrooms"/>

              <input className="input" type="textarea" placeholder="Property Amenities"/>
            </form>
            <Router>
              <Link className="button" to={'/hosted-listings'}>
                Confirm
              </Link>
            </Router>
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

export default EditListing
