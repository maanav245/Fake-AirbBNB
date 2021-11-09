import React from 'react';
import LoggedInButtons from '../components/LoggedInButtons';
import LoginButton from '../components/LoginButton';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import { StoreContext } from '../Store';
import Modal from '../components/Modal';
import Port from '../config.json';

function EditListing () {
  const { listingInfo, token, modal, page, editListingId } = React.useContext(StoreContext);
  console.log(editListingId);
  const [title, setTitle] = React.useState('');
  const [street, setStreet] = React.useState('');
  const [city, setCity] = React.useState('');
  const [country, setCountry] = React.useState('');
  const [state, setState] = React.useState('');
  const [post, setPost] = React.useState('');
  const [price, setPrice] = React.useState(0);
  const [thumbnail, setThumbnail] = React.useState('');
  const [type, setType] = React.useState('');
  const [bathrooms, setBathrooms] = React.useState('');
  const [amenities, setAmenities] = React.useState('');
  const [numBedrooms, setNumBedrooms] = React.useState(0);
  const [bedrooms, setBedrooms] = React.useState([]);
  const [newPhoto, setNewPhoto] = React.useState('')
  console.log(bedrooms);

  React.useEffect(() => {
    if (token.token !== '') {
      const arr = listingInfo.listingInfo.metadata.bedrooms
      const len = arr.length;
      if (numBedrooms !== len) {
        if (numBedrooms < bedrooms.length) {
          const arr1 = bedrooms;
          console.log(arr1);
          const end = arr1.pop();
          console.log(arr1);
          setBedrooms(arr1);
          console.log(end);
        }
      }
    }
  }, [numBedrooms]);

  React.useEffect(() => {
    if (token.token !== '') {
      setTitle(listingInfo.listingInfo.title);
      setStreet(listingInfo.listingInfo.address.street);
      setCity(listingInfo.listingInfo.address.city);
      setCountry(listingInfo.listingInfo.address.country);
      setState(listingInfo.listingInfo.address.state);
      setPost(listingInfo.listingInfo.address.postcode);
      setPrice(listingInfo.listingInfo.price);
      setNumBedrooms(listingInfo.listingInfo.totalbedrooms);
      setType(listingInfo.listingInfo.metadata.type);
      setAmenities(listingInfo.listingInfo.metadata.amenities);
      setBathrooms(listingInfo.listingInfo.metadata.bathrooms);
      setBedrooms(listingInfo.listingInfo.metadata.bedrooms);
      const arr = listingInfo.listingInfo.metadata.bedrooms
      const len = arr.length;
      setNumBedrooms(len);
      console.log(listingInfo.listingInfo.metadata.bedrooms);
    }
  }, []);

  async function editListing () {
    let totalbedrooms = 0;
    console.log(bedrooms);
    const imgList = [];
    if (listingInfo.listingInfo.metadata.images === undefined) {
      imgList.push(newPhoto);
    } else {
      listingInfo.listingInfo.metadata.images.push(newPhoto);
    }
    console.log(newPhoto);
    const metadata = { type: type, amenities: amenities, bathrooms: bathrooms, bedrooms: bedrooms, images: imgList }
    for (let index = 0; index < metadata.bedrooms.length; index++) {
      if (metadata.bedrooms[index].number !== '') {
        totalbedrooms = parseInt(totalbedrooms) + parseInt(metadata.bedrooms[index].number);
      }
    }
    const newMetadata = { ...metadata, totalbedrooms: totalbedrooms }
    const address1 = { street: street, state: state, city: city, country: country, postcode: post }
    const data = { title: title, address: address1, price: price, thumbnail: thumbnail, metadata: newMetadata };
    const response = await fetch(`http://localhost:${Port.BACKEND_PORT}/listings/` + editListingId.editListingId, {
      method: 'PUT',
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
      if (bedrooms[numBedrooms - 1] !== undefined) {
        return (
          [...Array(numBedrooms)].map((e, i) => (
            <div key={i} className="listingInput">
              <label htmlFor={`${i}-number`}>Number of beds in bedroom {i + 1}:</label>
              <input id={`${i}-number`} key={`${i}-number`} className="input" value={bedrooms[i].number} type="number" onChange={({ target }) => {
                setBedrooms(Object.values({ ...bedrooms, [i]: { ...bedrooms[i], number: target.value } }))
              }} placeholder="1"/>
              <label htmlFor={`${i}-type`}>Type of beds in bedroom {i + 1}:</label>
              <input id={`${i}-type`} key={`${i}-type`} className="input" value={bedrooms[i].type} type="text" onChange={({ target }) => {
                setBedrooms(Object.values({ ...bedrooms, [i]: { ...bedrooms[i], type: target.value } }))
              }} placeholder="Single/Double/etc."/>
            </div>
          ))
        );
      } else {
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
      }
    } else {
      return null;
    }
  }

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

  async function addImage (e) {
    const dataURL = await fileToDataUrl(e.target.files[0]);
    setNewPhoto(dataURL);
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
            <h1>Edit Listing</h1>

            <form>
              <div className="listingInput">
                <label htmlFor="editListingTitle">Listing Title:</label>
                <input id="editListingTitle" className="input" type="text" value={title} onChange={({ target }) => setTitle(target.value)} placeholder="Beach House"/>
              </div>
              <div className="listingInput">
                <label htmlFor="editAddressStreet">Street Address:</label>
                <input id="editAddressStreet" className="input" type="text" value={street} onChange={({ target }) => setStreet(target.value)} placeholder="10 Example Street"/>
              </div>
              <div className="listingInput">
                <label htmlFor="editAddressCity">City/Suburb:</label>
                <input id="editAddressCity" className="input" type="text" value={city} onChange={({ target }) => setCity(target.value)} placeholder="Sydney"/>
              </div>
              <div className="listingInput">
                <label htmlFor="editAddressState">State:</label>
                <input id="editAddressState" className="input" type="text" value={state} onChange={({ target }) => setState(target.value)} placeholder="NSW"/>
              </div>
              <div className="listingInput">
                <label htmlFor="editAddressPostcode">Postcode:</label>
                <input id="editAddressPostcode" className="input" type="number" value={post} onChange={({ target }) => setPost(target.value)} placeholder="2000"/>
              </div>
              <div className="listingInput">
                <label htmlFor="editAddressCounty">Country:</label>
                <input id="editAddressCountry" className="input" type="text" value={country} onChange={({ target }) => setCountry(target.value)} placeholder="Australia"/>
              </div>
              <div className="listingInput">
                <label htmlFor="editPropertyPrice">Price Per Night:</label>
                <input id="editPropertyPrice" className="input" type="number" value={price} onChange={({ target }) => setPrice(target.value)} placeholder="$100"/>
              </div>
              <div className="listingInput">
                <label htmlFor="editPropertyThumbnail">Property Thumbnail:</label>
                <input id="editPropertyThumbnail" className="input" type="file" onChange={uploadImage}/>
              </div>
              <div className="listingInput">
                <label htmlFor="editPropertyType">Property Type:</label>
                <input id="editPropertyType" className="input" type="text" value={type} onChange={({ target }) => setType(target.value)} placeholder="House/Apartment/etc."/>
              </div>
              <div className="listingInput">
                <label htmlFor="editNumBathrooms">Number of Bathrooms:</label>
                <input id="editNumBathrooms" className="input" type="number" value={bathrooms} onChange={({ target }) => setBathrooms(target.value)} placeholder="2"/>
              </div>
              <div className="listingInput">
                <label htmlFor="editNumBedrooms">Number of Bedrooms:</label>
                <input id="editNumBedrooms" className="input" type="number" value={numBedrooms} onChange={({ target }) => setNumBedrooms(parseInt(target.value))} placeholder="4"/>
              </div>
              {BedroomFields()}
              <div className="listingInput">
                <label htmlFor="editAmenities">Property Amenities:</label>
                <input id="editAmenities" className="input" type="textarea" value={amenities} onChange={({ target }) => setAmenities(target.value)} placeholder="Kitchen/Pool/WiFi/etc."/>
              </div>
            </form>
            <Router>
              <Link className="button" to={'/hosted-listings'} onClick={editListing}>
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
