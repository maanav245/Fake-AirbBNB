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
import InfiniteScroll from 'react-infinite-scroll-component';
import Error from '../Error';
import Logo from '../components/Logo'
import { StyledSection, StyledHeader, StyledMain } from '../components/StyledComponents'

function ViewListing () {
  const { token, listingInfo, viewListingId, modal } = React.useContext(StoreContext);
  const [dateRange, setDateRange] = React.useState(null);
  console.log(listingInfo.listingInfo);
  const formD = listingInfo.listingInfo
  const [infiniteList, setInfiniteList] = React.useState(Array.from({ length: 10 }))

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

  function GenerateRandoms () {
    setInfiniteList(infiniteList.concat(Array.from({ length: 10 })));
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
        <StyledSection>
        <Modal/>
        <StyledHeader>
          <LoggedInButtons/>
          <div className="banner">
            <Logo/>
          </div>
          <div className="banner">
            <LoginButton/>
          </div>
        </StyledHeader>
        <StyledMain className="viewing_main">

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
              dataLength={infiniteList.length}
              next={GenerateRandoms}
              hasMore={true}
              loader={<h4>Loading...</h4>}
            >
                {infiniteList.map((e, i) => (
                  <div className="review_itself" key={i}>
                    <div className="review_user">Matt</div>
                    <div className="review_stars"> 4.93 </div>
                    <div className="review_body"> Nice Place</div>
                  </div>
                ))}
            </InfiniteScroll>

          </div>

        </StyledMain>
        <footer>
        </footer>
      </StyledSection>
    );
  } else {
    return (
    <StyledSection>
        <Modal/>
        <StyledHeader>
          <LoggedInButtons/>
          <div className="banner">
            <Logo/>
          </div>
          <div className="banner">
            <LoginButton/>
          </div>
        </StyledHeader>
        <StyledMain>

          <h1>{listingInfo.listingInfo.title}</h1>

        </StyledMain>
        <footer>
        </footer>
      </StyledSection>
    );
  }
}

export default ViewListing;
