
import React from 'react';
import LoggedInButtons from '../components/LoggedInButtons';
import LoginButton from '../components/LoginButton';
import '../App.css';
import { StoreContext } from '../Store';
import Modal from '../components/Modal';
import 'react-calendar/dist/Calendar.css';
import Port from '../config.json';
import Calendar from 'react-calendar'
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import InfiniteScroll from 'react-infinite-scroller';

function ViewListing () {
  const { token, listingInfo, viewListingId, modal } = React.useContext(StoreContext);
  const [dateRange, setDateRange] = React.useState(null);
  console.log(listingInfo.listingInfo);
  const formD = listingInfo.listingInfo

  function GenerateCarousel () {
    if (listingInfo.listingInfo.metadata.images === undefined || listingInfo.listingInfo.metadata.images.length === 0) {
      console.log('error');
      return null;
    } else {
      console.log('normal');
      return (
        (listingInfo.listingInfo.metadata.images).map((e, i) => (
        <div key={i}>
          <img src={e} />

        </div>
        ))
      )
    }
  }

  async function submitBooking () {
    if (dateRange === null) {
      return
    }
    const diffTime = Math.abs(dateRange[1] - dateRange[0]);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    console.log(listingInfo.listingInfo.price * diffDays);
    const bookingData = {
      dateRange: dateRange,
      totalPrice: listingInfo.listingInfo.price * diffDays
    }
    const response = await fetch(`http://localhost:${Port.BACKEND_PORT}/bookings/new/${viewListingId.viewListingId}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: token.token,
      },
      body: JSON.stringify(bookingData)
    });
    const json = await response.json();
    if (response.ok) {
      return json.listing;
    } else {
      Error(json.error, modal);
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
        <main className="viewing_main">

          <h1 className="viewing_title">{listingInfo.listingInfo.title}</h1>

          <div className="image_location">
            <Carousel>
              <div>
                  <img src={listingInfo.listingInfo.thumbnail} />

              </div>
              <GenerateCarousel/>
            </Carousel>
          </div>
          <div className="viewing_body_info">
            <div className="viewing_info_text">
              <p>{formD.address.street}, {formD.address.city}, {formD.address.state}, {formD.address.postcode}, {formD.address.country}</p>
              <p>${formD.price} per night</p>
              <p>Type: {formD.metadata.type}</p>
              <p>Number of beds: {formD.metadata.totalbedrooms}</p>
              {console.log(formD.metadata)}
              <p>Number of bathrooms: {formD.metadata.bathrooms}</p>
              <p>Average rating: TODO</p>
              <p>Number of reviews: {formD.reviews.length}</p>
            </div>
            <div className="booking_container">
              <div>Booking</div>
              <Calendar value={dateRange} className="react-calendar" selectRange={true} onChange={function (e) {
                setDateRange(e)
                console.log(dateRange);
              } }/>
              <div className="book_btn_container">
                  <button type="button" className="btn btn-primary " onClick={function () {
                    submitBooking();
                  }}>Book</button>
              </div>
            </div>
          </div>
          <div className="review_box">
            <h1 className="reviews_title">Reviews</h1>
            <InfiniteScroll
              pageStart={0}

              hasMore={true || false}
              loader={<div className="loader" key={0}>Loading ...</div>}
            >

            </InfiniteScroll>

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
