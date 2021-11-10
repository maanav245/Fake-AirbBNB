import React from 'react';
import LoggedInButtons from '../components/LoggedInButtons';
import LoginButton from '../components/LoginButton';
import { StoreContext } from '../Store';
import Port from '../config.json';
import Error from '../Error';
import Modal from '../components/Modal';
import LinkButton from '../components/LinkButton'
import Logo from '../components/Logo'
import { StyledSection, StyledHeader, StyledMain, StyledForm, StyledInput, StyledFileInput, Banner } from '../components/StyledComponents'

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
      StyledHeaders: {
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
            <StyledInput id={`${i}-number`} key={`${i}-number`} type="number" onChange={({ target }) => {
              setBedrooms(Object.values({ ...bedrooms, [i]: { ...bedrooms[i], number: target.value } }))
            }} placeholder="1"/>
            <label htmlFor={`${i}-type`}>Type of beds in bedroom {i + 1}:</label>
            <StyledInput id={`${i}-type`} key={`${i}-type`} type="text" onChange={({ target }) => {
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
          <h1>Create New Listing</h1>
          <StyledForm>
            <div className="listingInput">
              <label htmlFor="listingTitle">Listing Title:</label>
              <StyledInput id="listingTitle" type="text" onChange={({ target }) => setTitle(target.value)} placeholder="Beach House"/>
            </div>
            <div className="listingInput">
              <label htmlFor="addressStreet">Street Address:</label>
              <StyledInput id="addressStreet" type="text" onChange={({ target }) => setAddress({ ...address, street: target.value })} placeholder="10 Example Street"/>
            </div>
            <div className="listingInput">
              <label htmlFor="addressCity">City/Suburb:</label>
              <StyledInput id="addressCity" type="text" onChange={({ target }) => setAddress({ ...address, city: target.value })} placeholder="Sydney"/>
            </div>
            <div className="listingInput">
              <label htmlFor="addressState">State:</label>
              <StyledInput id="addressState" type="text" onChange={({ target }) => setAddress({ ...address, state: target.value })} placeholder="NSW"/>
            </div>
            <div className="listingInput">
              <label htmlFor="addressPostcode">Postcode:</label>
              <StyledInput id="addressPostcode" type="number" onChange={({ target }) => setAddress({ ...address, postcode: target.value })} placeholder="2000"/>
            </div>
            <div className="listingInput">
              <label htmlFor="addressCountry">Country:</label>
              <StyledInput id="addressCountry" type="text" onChange={({ target }) => setAddress({ ...address, country: target.value })} placeholder="Australia"/>
            </div>
            <div className="listingInput">
              <label htmlFor="propertyPrice">Price Per Night:</label>
              <StyledInput id="propertyPrice" type="number" onChange={({ target }) => setPrice(target.value)} placeholder="$100"/>
            </div>
            <div className="listingInput">
              <label htmlFor="propertyThumbnail">Property Thumbnail:</label>
              <StyledFileInput id="propertyThumbnail" type="file" onChange={uploadImage}/>
            </div>
            <div className="listingInput">
              <label htmlFor="propertyType">Property Type:</label>
              <StyledInput id="propertyType" type="text" onChange={({ target }) => setMetadata({ ...metadata, type: target.value })} placeholder="House/Apartment/etc."/>
            </div>
            <div className="listingInput">
              <label htmlFor="numBathrooms">Number of Bathrooms:</label>
              <StyledInput id="numBathrooms" type="number" onChange={({ target }) => setMetadata({ ...metadata, bathrooms: target.value })} placeholder="2"/>
            </div>
            <div className="listingInput">
              <label htmlFor="numBedrooms">Number of Bedrooms:</label>
              <StyledInput id="numBedrooms" type="number" onChange={({ target }) => setNumBedrooms(parseInt(target.value))} placeholder="4"/>
            </div>
            {BedroomFields()}
            <div className="listingInput">
              <label htmlFor="amenities">Property Amenities:</label>
              <StyledInput id="amenities" type="textarea" onChange={({ target }) => setMetadata({ ...metadata, amenities: target.value })} placeholder="Kitchen/Pool/WiFi/etc."/>
            </div>
          </StyledForm>
          <LinkButton to={'/hosted-listings'} onClick={createListing} value="Confirm"/>
        </StyledMain>
        <footer>
        </footer>
      </StyledSection>
    );
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
    )
  }
}

export default NewListing;
