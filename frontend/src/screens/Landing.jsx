import React from 'react';
import Modal from '../components/Modal';
import LoggedInButtons from '../components/LoggedInButtons';
import LoginButton from '../components/LoginButton';

function Landing () {
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
      </main>
      <footer>
      </footer>
    </section>
  );
}

export default Landing;
