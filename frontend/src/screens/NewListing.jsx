import React from 'react';
import LoggedInButtons from '../components/LoggedInButtons';
import LoginButton from '../components/LoginButton';
import { StoreContext } from '../Store';
import Port from '../config.json';
import Error from '../Error';
import Modal from '../components/Modal';
import LinkButton from '../components/LinkButton'

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

  async function createListing () {
    let totalbedrooms = 0;
    for (let index = 0; index < metadata.bedrooms.length; index++) {
      totalbedrooms = parseInt(totalbedrooms) + parseInt(metadata.bedrooms[index].number);
    }
    const newMetadata = { ...metadata, totalbedrooms: totalbedrooms }
    const actMetadata = { ...newMetadata, images: [] };

    const data = { title: title, address: address, price: price, thumbnail: thumbnail, metadata: actMetadata };
    const response = await fetch(`http://localhost:${Port.BACKEND_PORT}/listings/new`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: token.token,
      },
      body: JSON.stringify(data)
    });
    const json = await response.json();
    if (response.ok) {
      console.log(json);
    } else {
      Error(json.error, modal);
    }
    page.setPage(3);
  }

  const BedroomFields = () => {
    if (numBedrooms > 0) {
      console.log(bedrooms);
      return (
        [...Array(numBedrooms)].map((e, i) => (
          <div key={i} className="listingInput">
            <label htmlFor={`${i}-number`}>Number of beds in bedroom {i + 1}:</label>
            <input id={`${i}-number`} key={`${i}-number`} className="input" type="number" onChange={({ target }) => {
              setBedrooms(Object.values({ ...bedrooms, [i]: { ...bedrooms[i], number: target.value } }))
            }} placeholder="1"/>
            <label htmlFor={`${i}-type`}>Type of beds in bedroom {i + 1}:</label>
            <input id={`${i}-type`} key={`${i}-type`} className="input" type="text" onChange={({ target }) => {
              setBedrooms(Object.values({ ...bedrooms, [i]: { ...bedrooms[i], type: target.value } }))
            }} placeholder="Single/Double/etc."/>
          </div>
        ))
      );
    } else {
      return null;
    }
  }

  // From ASS2
  function fileToDataUrl (file) {
    const validFileTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    const valid = validFileTypes.find((type) => type === file.type);
    if (!valid) {
      throw Error('provided file is not a png, jpg or jpeg image.');
    }

    const reader = new FileReader();
    const dataUrlPromise = new Promise((resolve, reject) => {
      reader.onerror = reject;
      reader.onload = () => resolve(reader.result);
    });
    reader.readAsDataURL(file);
    return dataUrlPromise;
  }
  async function uploadImage (e) {
    const dataURL = await fileToDataUrl(e.target.files[0]);
    console.log(dataURL);
    setThumbnail(dataURL);
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
            <div className="listingInput">
              <label htmlFor="listingTitle">Listing Title:</label>
              <input id="listingTitle" className="input" type="text" onChange={({ target }) => setTitle(target.value)} placeholder="Beach House"/>
            </div>
            <div className="listingInput">
              <label htmlFor="addressStreet">Street Address:</label>
              <input id="addressStreet" className="input" type="text" onChange={({ target }) => setAddress({ ...address, street: target.value })} placeholder="10 Example Street"/>
            </div>
            <div className="listingInput">
              <label htmlFor="addressCity">City/Suburb:</label>
              <input id="addressCity" className="input" type="text" onChange={({ target }) => setAddress({ ...address, city: target.value })} placeholder="Sydney"/>
            </div>
            <div className="listingInput">
              <label htmlFor="addressState">State:</label>
              <input id="addressState" className="input" type="text" onChange={({ target }) => setAddress({ ...address, state: target.value })} placeholder="NSW"/>
            </div>
            <div className="listingInput">
              <label htmlFor="addressPostcode">Postcode:</label>
              <input id="addressPostcode" className="input" type="number" onChange={({ target }) => setAddress({ ...address, postcode: target.value })} placeholder="2000"/>
            </div>
            <div className="listingInput">
              <label htmlFor="addressCountry">Country:</label>
              <input id="addressCountry" className="input" type="text" onChange={({ target }) => setAddress({ ...address, country: target.value })} placeholder="Australia"/>
            </div>
            <div className="listingInput">
              <label htmlFor="propertyPrice">Price Per Night:</label>
              <input id="propertyPrice" className="input" type="number" onChange={({ target }) => setPrice(target.value)} placeholder="$100"/>
            </div>
            <div className="listingInput">
              <label htmlFor="propertyThumbnail">Property Thumbnail:</label>
              <input id="propertyThumbnail" className="input fileInput" type="file" onChange={uploadImage}/>
            </div>
            <div className="listingInput">
              <label htmlFor="propertyType">Property Type:</label>
              <input id="propertyType" className="input" type="text" onChange={({ target }) => setMetadata({ ...metadata, type: target.value })} placeholder="House/Apartment/etc."/>
            </div>
            <div className="listingInput">
              <label htmlFor="numBathrooms">Number of Bathrooms:</label>
              <input id="numBathrooms" className="input" type="number" onChange={({ target }) => setMetadata({ ...metadata, bathrooms: target.value })} placeholder="2"/>
            </div>
            <div className="listingInput">
              <label htmlFor="numBedrooms">Number of Bedrooms:</label>
              <input id="numBedrooms" className="input" type="number" onChange={({ target }) => setNumBedrooms(parseInt(target.value))} placeholder="4"/>
            </div>
            {BedroomFields()}
            <div className="listingInput">
              <label htmlFor="amenities">Property Amenities:</label>
              <input id="amenities" className="input" type="textarea" onChange={({ target }) => setMetadata({ ...metadata, amenities: target.value })} placeholder="Kitchen/Pool/WiFi/etc."/>
            </div>
          </form>
          <LinkButton to={'/hosted-listings'} onClick={createListing} value="Confirm"/>
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
