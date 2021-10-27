import React from 'react';
import LoggedInButtons from '../components/LoggedInButtons';
import LoginButton from '../components/LoginButton';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import { StoreContext } from '../Store';
import Port from '../config.json';
import Error from '../Error';
import Modal from '../components/Modal';

function NewListing () {
  const { page, token, modal } = React.useContext(StoreContext);
  const [title, setTitle] = React.useState('');
  const [address, setAddress] = React.useState({});
  const [price, setPrice] = React.useState(0);
  const [thumbnail, setThumbnail] = React.useState('');
  const [metadata, setMetadata] = React.useState({});
  const [numBedrooms, setNumBedrooms] = React.useState(0);
  const [bedrooms, setBedrooms] = React.useState([]);

  React.useEffect(() => {
    if (numBedrooms >= 0) {
      setBedrooms(new Array(numBedrooms));
    } else {
      setBedrooms([]);
    }
  }, [numBedrooms]);

  React.useEffect(() => {
    setMetadata({ ...metadata, bedrooms: bedrooms });
    console.log(metadata.bedrooms);
  }, [bedrooms]);

  const createListing = () => {
    const data = { title: title, address: address, price: price, thumbnail: thumbnail, metadata: metadata };
    console.log(data);

    fetch(`http://localhost:${Port.BACKEND_PORT}/listings/new`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: token.token,
      },
      body: JSON.stringify(data)
    }).then((response) => {
      if (response.ok) {
        console.log(response.json());
      } else {
        Error(response.json(), modal);
      }
    }).catch((e) => Error(e), modal);
    page.setPage(3);
  };

  const BedroomFields = () => {
    if (numBedrooms > 0) {
      return (
        [...Array(numBedrooms)].map((e, i) => (
          <div key={i}>
            <input key={`${i}-number`} className="input" type="number" onChange={({ target }) => {
              setBedrooms(Object.values({ ...bedrooms, [i]: { ...bedrooms[i], number: target.value } }))
            }} placeholder={`Number of beds in bedroom ${i + 1}`}/>
            <input key={`${i}-type`} className="input" type="text" onChange={({ target }) => {
              setBedrooms(Object.values({ ...bedrooms, [i]: { ...bedrooms[i], type: target.value } }))
            }} placeholder={`Type of beds in bedroom ${i + 1}`}/>
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
          <h1>Create New Listing</h1>
          <form>
            <input className="input" type="text" onChange={({ target }) => setTitle(target.value)} placeholder="Listing Title"/>
            <input className="input" type="text" onChange={({ target }) => setAddress({ ...address, street: target.value })} placeholder="Street Address"/>
            <input className="input" type="text" onChange={({ target }) => setAddress({ ...address, city: target.value })} placeholder="City/Suburb"/>
            <input className="input" type="text" onChange={({ target }) => setAddress({ ...address, state: target.value })} placeholder="State"/>
            <input className="input" type="number" onChange={({ target }) => setAddress({ ...address, postcode: target.value })} placeholder="Postcode"/>
            <input className="input" type="text" onChange={({ target }) => setAddress({ ...address, country: target.value })} placeholder="Country"/>
            <input className="input" type="number" onChange={({ target }) => setPrice(target.value)} placeholder="Price Per Night"/>
            <input className="input" type="file" onChange={({ target }) => setThumbnail(target.value)}/>
            <input className="input" type="text" onChange={({ target }) => setMetadata({ ...metadata, type: target.value })} placeholder="Property Type"/>
            <input className="input" type="number" onChange={({ target }) => setMetadata({ ...metadata, bathrooms: target.value })} placeholder="Number of Bathrooms"/>
            <input className="input" type="number" onChange={({ target }) => setNumBedrooms(parseInt(target.value))} placeholder="Number of Bedrooms"/>
            {BedroomFields()}
            <input className="input" type="textarea" onChange={({ target }) => setMetadata({ ...metadata, amenities: target.value })} placeholder="Property Amenities"/>
          </form>
          <Router>
            <Link className="button" to={'/hosted-listings'} onClick={createListing}>
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
    )
  }
}

export default NewListing;
