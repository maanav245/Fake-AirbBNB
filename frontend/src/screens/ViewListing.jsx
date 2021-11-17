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
import { ProgressBar, OverlayTrigger, Popover, Badge, Form, Modal, Button, FloatingLabel } from 'react-bootstrap';
import Ratings from 'react-ratings-declarative';
import 'bootstrap/dist/css/bootstrap.min.css'
import { ViewingInfoTypeTitle, BookingContainer, ViewingBodyInfo, ViewingInfoText, RatingProgress, RatingPopover, RatingButtonPrimary, ViewingTitle, StyledSection, StyledHeader, StyledMain, Banner } from '../components/StyledComponents'

function ViewListing () {
  const { token, listingInfo, viewListingId, modal, user } = React.useContext(StoreContext);
  const [dateRange, setDateRange] = React.useState(null);
  console.log(listingInfo.listingInfo);
  const formD = listingInfo.listingInfo
  const [reviewList, setreviewList] = React.useState({ one: [], two: [], three: [], four: [], five: [] })
  const [showModal, setShowModal] = React.useState(false);
  const [showReviewModal, setShowReviewModal] = React.useState(false);
  const [rating, setRating] = React.useState('0');
  const [review, setReview] = React.useState('');
  const [totalReviews, setTotalReviews] = React.useState(0);
  const [bStatus, setBStatus] = React.useState('Not booked');
  const [bID, setBID] = React.useState('');
  console.log(rating);
  console.log(review);
  const closeModal = () => setShowModal(false);
  const displayModal = () => setShowModal(true);
  const closeReviewModal = () => setShowReviewModal(false);
  const displayReviewModal = () => setShowReviewModal(true);
  const [specificReviews, setSpecificReviews] = React.useState([]);
  const [canReview, setCanReview] = React.useState(false);
  const [totalRating, setTotalRating] = React.useState(0);
  const [render, setRender] = React.useState(Math.random());

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

  const generateRatingPopover = (

      <Popover style={{ maxWidth: '100vw', zIndex: '0' }}>
           <RatingPopover>
            <Popover.Header as="h3">{totalReviews} ratings</Popover.Header>
              <Popover.Body style={{ display: 'flex', flexDirection: 'column' }}>
                <RatingProgress>
                  <a style={{ cursor: 'pointer' }} href="javascript:void(0)" onClick={function () {
                    setSpecificReviews(reviewList.one);
                    displayReviewModal();
                  }}> 1 star </a> : ({reviewList.one.length})
                 <ProgressBar style={{ height: '5vh', width: '70%', marginTop: '0.5vh', marginLeft: '1vw' }} now={(reviewList.one.length / totalReviews) * 100} label={`${Math.round((reviewList.one.length / totalReviews) * 100)}%`}/>
                </RatingProgress>

                <RatingProgress>
                  <a style={{ cursor: 'pointer' }} href="javascript:void(0)" onClick={function () {
                    setSpecificReviews(reviewList.two);
                    displayReviewModal();
                  }}> 2 star </a> : ({reviewList.two.length})
                  <ProgressBar style={{ height: '5vh', width: '70%', marginTop: '0.5vh', marginLeft: '1vw' }} now={(reviewList.two.length / totalReviews) * 100} label={`${Math.round((reviewList.two.length / totalReviews) * 100)}%`} />
                 </RatingProgress>

                <RatingProgress>
                  <a style={{ cursor: 'pointer' }} href="javascript:void(0)" onClick={function () {
                    setSpecificReviews(reviewList.three);
                    displayReviewModal();
                  }}> 3 star </a> : ({reviewList.three.length})
                  <ProgressBar style={{ height: '5vh', width: '70%', marginTop: '0.5vh', marginLeft: '1vw' }} now={(reviewList.three.length / totalReviews) * 100} label={`${Math.round((reviewList.three.length / totalReviews) * 100)}%`} />
                </RatingProgress>

                <RatingProgress>
                  <a style={{ cursor: 'pointer' }} href="javascript:void(0)" onClick={function () {
                    setSpecificReviews(reviewList.four);
                    displayReviewModal();
                  }}> 4 star</a> : ({reviewList.four.length})
                 <ProgressBar style={{ height: '5vh', width: '70%', marginTop: '0.5vh', marginLeft: '1vw' }} now={(reviewList.four.length / totalReviews) * 100} label={`${Math.round((reviewList.four.length / totalReviews) * 100)}%`}/>
                </RatingProgress>

                <RatingProgress>
                  <a style={{ cursor: 'pointer' }} href="javascript:void(0)" onClick={function () {
                    setSpecificReviews(reviewList.five);
                    displayReviewModal();
                  }}> 5 star </a> : ({reviewList.five.length})
                 <ProgressBar style={{ height: '5vh', width: '70%', marginTop: '0.5vh', marginLeft: '1vw' }} now={(reviewList.five.length / totalReviews) * 100} label={`${Math.round((reviewList.five.length / totalReviews) * 100)}%`}/>
                </RatingProgress>

              </Popover.Body>
           </RatingPopover>
      </Popover>

  );

  async function getReviewList () {
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
      const tempRev = { one: [], two: [], three: [], four: [], five: [] }

      let sum = 0;
      for (let index = 0; index < json.listing.reviews.length; index++) {
        sum = parseInt(json.listing.reviews[index].rating) + sum;
        if (json.listing.reviews[index].rating === '1') {
          tempRev.one.push(json.listing.reviews[index])
        } else if (json.listing.reviews[index].rating === '2') {
          tempRev.two.push(json.listing.reviews[index])
        } else if (json.listing.reviews[index].rating === '3') {
          tempRev.three.push(json.listing.reviews[index])
        } else if (json.listing.reviews[index].rating === '4') {
          tempRev.four.push(json.listing.reviews[index])
        } else if (json.listing.reviews[index].rating === '5') {
          tempRev.five.push(json.listing.reviews[index])
        }
      }
      setreviewList(tempRev);
      console.log(sum);
      setTotalReviews(json.listing.reviews.length);
      if (sum !== 0 && json.listing.reviews.length !== 0) {
        setTotalRating(sum / json.listing.reviews.length);
      }
    } else {
      Error(json.error, modal);
    }
  }

  function ProduceReviewsList () {
    return (
      Object.keys(reviewList).map((key, s) => (
        reviewList[key].map((e, i) => (
            <div className="review_itself" key={i}>
              <div className="review_user">{e.name}</div>
              <RatingButtonPrimary>
                <Ratings
                  rating={parseInt(e.rating)}
                  widgetDimensions="2vw"
                  widgetSpacings="0.2vw"
                >
                  <Ratings.Widget widgetRatedColor="Gold" />
                  <Ratings.Widget widgetRatedColor="Gold" />
                  <Ratings.Widget widgetRatedColor="Gold" />
                  <Ratings.Widget widgetRatedColor="Gold" />
                  <Ratings.Widget widgetRatedColor="Gold" />
                </Ratings>
              </RatingButtonPrimary>
              <div className="review_body">{e.review}</div>
            </div>
        ))
      ))
    );
  }

  function ProduceSpecificReviews () {
    return (
      specificReviews.map((e, i) => (
          <div className="review_itself" key={i}>
            <div className="review_user">{e.name}</div>
            <RatingButtonPrimary>
                <Ratings
                  rating={parseInt(e.rating)}
                  widgetDimensions="1vw"
                  widgetSpacings="0.2vw"
                >
                  <Ratings.Widget widgetRatedColor="Gold" />
                  <Ratings.Widget widgetRatedColor="Gold" />
                  <Ratings.Widget widgetRatedColor="Gold" />
                  <Ratings.Widget widgetRatedColor="Gold" />
                  <Ratings.Widget widgetRatedColor="Gold" />
                </Ratings>
              </RatingButtonPrimary>
            <div className="review_body">{e.review}</div>
          </div>
      ))
    );
  }

  React.useEffect(async () => {
    getReviewList()
  }, [showModal])

  React.useEffect(async () => {
    if (token.token !== '') {
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
        let actStatus = 'not booked';
        for (let index = 0; index < json.bookings.length; index++) {
          const element = json.bookings[index];
          console.log(element.owner)
          console.log(user.user);
          console.log(element.listingId)
          console.log(viewListingId.viewListingId)
          if (element.owner === user.user && parseInt(element.listingId) === viewListingId.viewListingId) {
            if (actStatus === 'not booked' || actStatus === 'booked') {
              console.log('Inside if : ' + element.status);
              actStatus = element.status;
            }
            setBID(element.id);

            if (element.status === 'accepted') {
              answer = true;
            }
            console.log(answer)
          }
        }
        console.log('final status is: ' + actStatus);
        setBStatus(actStatus);
      } else {
        Error(json.error, modal);
        answer = false;
      }
      setCanReview(answer);
    }
  }, [render])
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
      console.log(render);
      setRender(Math.random());
    } else {
      Error(json.error, modal);
    }
  }

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
        <StyledMain>

          <ViewingTitle>{listingInfo.listingInfo.title}</ViewingTitle>

          <div className="image_location">
            <Carousel>
              <div>
                  <img src={listingInfo.listingInfo.thumbnail} />

              </div>
              <GenerateCarousel/>
            </Carousel>
          </div>
          <ViewingBodyInfo>
            <ViewingInfoText>

              <ViewingInfoTypeTitle>
                <h1>{formD.metadata.type}</h1>
                Bedrooms: {formD.metadata.bedrooms.length} {' '}
                Beds: {formD.metadata.totalbedrooms} {' '}
                Bathrooms: {formD.metadata.bathrooms}
              </ViewingInfoTypeTitle>
              <p>{formD.address.street}, {formD.address.city}, {formD.address.state}, {formD.address.postcode}, {formD.address.country}</p>

            </ViewingInfoText>
            {token.token !== '' && <BookingContainer>
              <h1>${formD.price} per night</h1>
              <Calendar value={dateRange} className="react-calendar" selectRange={true} onChange={function (e) {
                setDateRange(e)
                console.log(dateRange);
              } }/>
              <div className="book_btn_container">
                  <button id={'confirmBookButton'} type="button" className="btn btn-primary " onClick={function () {
                    submitBooking();
                  }}>Book </button>
                  <Badge bg="secondary">{bStatus}</Badge>
              </div>
            </BookingContainer>}
          </ViewingBodyInfo>
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

          <Modal show={showReviewModal} onHide={closeReviewModal}>
            <Modal.Header closeButton>
              <Modal.Title>Reviews</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <ProduceSpecificReviews ></ProduceSpecificReviews>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={closeReviewModal}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>

          <div className="review_box">
            <h1 className="reviews_title">Reviews</h1>
            {console.log(totalRating)}
            <OverlayTrigger trigger="click" placement="right" overlay={generateRatingPopover}>
              <RatingButtonPrimary>
                <Ratings
                  rating={totalRating}
                  widgetDimensions="3vw"
                  widgetSpacings="0.2vw"
                >
                  <Ratings.Widget widgetRatedColor="Gold" />
                  <Ratings.Widget widgetRatedColor="Gold" />
                  <Ratings.Widget widgetRatedColor="Gold" />
                  <Ratings.Widget widgetRatedColor="Gold" />
                  <Ratings.Widget widgetRatedColor="Gold" />
                </Ratings>
              </RatingButtonPrimary>

            </OverlayTrigger>
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
}

export default ViewListing;
