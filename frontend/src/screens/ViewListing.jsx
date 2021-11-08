
import React from 'react';
import LoggedInButtons from '../components/LoggedInButtons';
import LoginButton from '../components/LoginButton';

import { StoreContext } from '../Store';
import Modal from '../components/Modal';
import Port from '../config.json';
import Error from '../Error';
import 'react-calendar/dist/Calendar.css';

function ViewListing () {
  const { token, modal, viewListingId } = React.useContext(StoreContext);
  const [info, setinfo] = React.useState({});
  console.log(info);
  React.useEffect(async () => {
    const newInfo = await getSingleListing(viewListingId.viewListingId);
    setinfo(newInfo);
  }, [])

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

    <h1>{info.title}</h1>

  </main>
  <footer>
  </footer>
</section>
  );
}

export default ViewListing;
