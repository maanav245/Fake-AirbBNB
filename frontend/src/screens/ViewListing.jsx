import React from 'react';
import LoggedInButtons from '../components/LoggedInButtons';
import LoginButton from '../components/LoginButton';
import '../App.css';
import { StoreContext } from '../Store';
import Modal1 from '../components/Modal';
import 'react-calendar/dist/Calendar.css';
import Port from '../config.json';
import Calendar from 'react-calendar'
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import Error from '../Error';
import Logo from '../components/Logo'
import { Badge, Form, Modal, Button, FloatingLabel } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css'
import { StyledSection, StyledHeader, StyledMain, Banner } from '../components/StyledComponents'

function ViewListing () {
  const { token, listingInfo, viewListingId, modal, user } = React.useContext(StoreContext);
  const [dateRange, setDateRange] = React.useState(null);
  console.log(listingInfo.listingInfo);
  const formD = listingInfo.listingInfo
  const [reviewList, setreviewList] = React.useState([])
  const [showModal, setShowModal] = React.useState(false);
  const [rating, setRating] = React.useState('0');
  const [review, setReview] = React.useState('');
  const [bStatus, setBStatus] = React.useState('Not booked');
  const [bID, setBID] = React.useState('');
  console.log(rating);
  console.log(review);
  const closeModal = () => setShowModal(false);
  const displayModal = () => setShowModal(true);
  const [canReview, setCanReview] = React.useState(false);

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

  async function getReviewList (id) {
    const response = await fetch(`http://localhost:${Port.BACKEND_PORT}/listings/${viewListingId.viewListingId}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: token.token,
      },
    });
    const json = await response.json();
    if (response.ok) {
      setreviewList(json.listing.reviews)
    } else {
      Error(json.error, modal);
    }
  }

  function ProduceReviewsList () {
    return (
      reviewList.map((e, i) => (
        <div className="review_itself" key={i}>
          <div className="review_user">{e.name}</div>
          <div className="review_stars">{e.rating} </div>
          <div className="review_body">{e.review}</div>
        </div>
      ))
    );
  }
  React.useEffect(async () => {
    getReviewList()
  }, [showModal])

  React.useEffect(async () => {
    let answer = false;
    const response = await fetch(`http://localhost:${Port.BACKEND_PORT}/bookings`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: token.token,
      },
    });
    const json = await response.json();
    if (response.ok) {
      for (let index = 0; index < json.bookings.length; index++) {
        const element = json.bookings[index];
        console.log(element.owner)
        console.log(user.user);
        console.log(element.listingId)
        console.log(viewListingId.viewListingId)
        if (element.owner === user.user && parseInt(element.listingId) === viewListingId.viewListingId) {
          console.log('entered');
          setBID(element.id);
          setBStatus(element.status);
          answer = true;
          console.log(answer)
        }
      }
    } else {
      Error(json.error, modal);
      answer = false;
    }
    setCanReview(answer);
  }, [])
  console.log(canReview)

  async function submitReview () {
    const review1 = { name: user.user, rating: rating, review: review };
    const data = { review: review1 }
    const response = await fetch(`http://localhost:${Port.BACKEND_PORT}/listings/${viewListingId.viewListingId}/review/${bID}`, {
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
      return json.listing;
    } else {
      Error(json.error, modal);
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
        <StyledSection>
        <Modal1/>
        <StyledHeader>
          <LoggedInButtons/>
          <Banner>
            <Logo/>
          </Banner>
          <Banner>
            <LoginButton/>
          </Banner>
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
                  }}>Book </button>
                  <Badge bg="secondary">{bStatus}</Badge>
              </div>
            </div>
          </div>
          <Modal show={showModal} onHide={closeModal}>
            <Modal.Header closeButton>
              <Modal.Title>Leave a Review</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label> Rating: {'     '} </Form.Label>
                <Form.Select value={rating} onChange={(e) => { setRating(e.target.value) }}>
                  <option value="0">Open this select menu</option>
                  <option value="1">1 (Poor)</option>
                  <option value="2">2 (not bad)</option>
                  <option value="3">3 (Average)</option>
                  <option value="4">4 (Good)</option>
                  <option value="5">5 (Excellent)</option>
                </Form.Select>
              </Form.Group>
              <FloatingLabel controlId="floatingTextarea2" label="Review" value={review} onChange = {(e) => { setReview(e.target.value) }}>
                <Form.Control
                  as="textarea"
                  placeholder="Leave a review here"
                  style={{ height: '20vh' }}
                />
              </FloatingLabel>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={closeModal}>
                Close
              </Button>
              <Button variant="primary" onClick={function () {
                submitReview()
                closeModal()
              }}>
                Submit
              </Button>
            </Modal.Footer>
          </Modal>

          <div className="review_box">
            <h1 className="reviews_title">Reviews</h1>
            {canReview &&
            <button type="button" className="btn btn-primary" onClick={function () {
              displayModal();
              console.log('Being clicked');
            }}>Leave Review</button>
            }
            <ProduceReviewsList/>
          </div>

        </StyledMain>
        <footer>
        </footer>
      </StyledSection>
    );
  } else {
    return (
      <StyledSection>
      <Modal1/>
      <StyledHeader>
        <LoggedInButtons/>
        <Banner>
          <Logo/>
        </Banner>
        <Banner>
          <LoginButton/>
        </Banner>
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
        </div>

        <div className="review_box">
          <h1 className="reviews_title">Reviews</h1>
          <ProduceReviewsList/>
        </div>

      </StyledMain>
      <footer>
      </footer>
    </StyledSection>
    );
  }
}

export default ViewListing;
