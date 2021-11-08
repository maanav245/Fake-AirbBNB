
import React from 'react';
import LoggedInButtons from '../components/LoggedInButtons';
import LoginButton from '../components/LoginButton';

import { StoreContext } from '../Store';
import Modal from '../components/Modal';
import 'react-calendar/dist/Calendar.css';
import Calendar from 'react-calendar'

function ViewListing () {
  const { token, listingInfo } = React.useContext(StoreContext);
  console.log(listingInfo.listingInfo);

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

          <h1>{listingInfo.listingInfo.title}</h1>

          <div className="booking_container">
            <div>Booking</div>
            <Calendar selectRange={true}/>
            <div className="modal-footer">
                <button type="button" className="btn btn-primary">Book</button>
            </div>
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

          <h1>{listingInfo.listingInfo.title}</h1>

        </main>
        <footer>
        </footer>
      </section>
    );
  }
}

export default ViewListing;
