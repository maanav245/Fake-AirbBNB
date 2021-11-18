import React from 'react';
import LoggedInButtons from '../components/LoggedInButtons';
import LoginButton from '../components/LoginButton';

import { StoreContext } from '../Store';
import Modal1 from '../components/Modal';
import 'react-calendar/dist/Calendar.css';
import Port from '../config.json';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import Error from '../Error';
import Logo from '../components/Logo'
import { ProgressBar, OverlayTrigger, Popover, Badge, Form, Modal, Button, FloatingLabel } from 'react-bootstrap';
import Ratings from 'react-ratings-declarative';
import 'bootstrap/dist/css/bootstrap.min.css'

import { AllInfoMain, StyledCarousel, StyledCalendar, ReviewBody, ReviewUser, ReviewItself, ReviewBox, ViewingInfoTypeTitle, ViewingBodyInfo, ViewingInfoText, RatingProgress, RatingPopover, RatingButtonPrimary, ViewingTitle, StyledSection, StyledHeader, StyledMain, Banner } from '../components/StyledComponents'

function ViewListing () {
  // Usestates used to control the display off certain modals when clicked, also used to store reviews to calculate stats on them, also used to store booking info
  const { token, listingInfo, viewListingId, modal, user } = React.useContext(StoreContext);
  const [dateRange, setDateRange] = React.useState(null);
  console.log(listingInfo.listingInfo);
  const formD = listingInfo.listingInfo
  const [reviewList, setreviewList] = React.useState({ one: [], two: [], three: [], four: [], five: [] })
  const [showModal, setShowModal] = React.useState(false);
  const [showReviewModal, setShowReviewModal] = React.useState(false);
  const [showBookingModal, setShowBookingModal] = React.useState(false);
  const [rating, setRating] = React.useState('0');
  const [review, setReview] = React.useState('');
  const [totalReviews, setTotalReviews] = React.useState(0);
  const [bStatus, setBStatus] = React.useState('Not booked');
  const [bLongStatus, setBLongStatus] = React.useState('Not booked');
  const [bID, setBID] = React.useState('');
  console.log(rating);
  console.log(review);
  const closeModal = () => setShowModal(false);
  const displayModal = () => setShowModal(true);
  const closeReviewModal = () => setShowReviewModal(false);
  const displayReviewModal = () => setShowReviewModal(true);
  const closeBookingModal = () => setShowBookingModal(false);
  const displayBookingModal = () => setShowBookingModal(true);
  const [specificReviews, setSpecificReviews] = React.useState([]);
  const [canReview, setCanReview] = React.useState(false);
  const [totalRating, setTotalRating] = React.useState(0);
  const [render, setRender] = React.useState(Math.random());

  // A function used to generate the the associated images of particular listing in a user friendly carousel
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

  // A function used to generate the particular stats of a certain review rating, including the number of reviews
  // and total percentage of certain reviews
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

  // Function used to get the reviews of a particular listing and store them in a particular data structures so they can be easily analaysed
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

  // A function used to style the reviews when they are rendered, with their own start ratings
  function ProduceReviewsList () {
    return (
      Object.keys(reviewList).map((key, s) => (
        reviewList[key].map((e, i) => (
            <ReviewItself key={i}>
              <ReviewUser>{e.name}</ReviewUser>
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
              <ReviewBody>{e.review}</ReviewBody>
            </ReviewItself>
        ))
      ))
    );
  }
  // A function used to generate the reviews under a particular rating
  function ProduceSpecificReviews () {
    return (
      specificReviews.map((e, i) => (
          <ReviewItself key={i}>
            <ReviewUser>{e.name}</ReviewUser>
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
            <ReviewBody>{e.review}</ReviewBody>
          </ReviewItself>
      ))
    );
  }
  // A function used to get the review list when page is rendered
  React.useEffect(async () => {
    getReviewList()
  }, [showModal])

  const formatDate = (date) => {
    const year = date.split('-')[0];
    const month = date.split('-')[1];
    const day = date.split('-')[2].split('T')[0];
    const formattedDate = day + '/' + month + '/' + year;
    return formattedDate;
  }
  // A function used to check the booking status of a particular user and to also check if they can leave a review or not
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
        let date1 = 'no date';
        let date2;
        for (let index = 0; index < json.bookings.length; index++) {
          const element = json.bookings[index];
          console.log(element.owner)
          console.log(user.user);
          console.log(element.listingId)
          console.log(viewListingId.viewListingId)
          if (element.owner === user.user && parseInt(element.listingId) === viewListingId.viewListingId) {
            if (actStatus === 'not booked' || element.status === 'pending') {
              console.log('Inside if : ' + element.status);
              actStatus = element.status;
              date1 = element.dateRange[0];
              date2 = element.dateRange[1];
            } else if (element.status === 'accepted' && actStatus !== 'pending') {
              actStatus = element.status;
              date1 = element.dateRange[0];
              date2 = element.dateRange[1];
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
        if (date1 !== 'no date') {
          setBLongStatus('Booking between ' + formatDate(date1) + ' and ' + formatDate(date2) + ' ' + actStatus);
        }
      } else {
        Error(json.error, modal);
        answer = false;
      }
      setCanReview(answer);
    }
  }, [render])
  console.log(canReview)
  // Function used to submit a review
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
  // A function used to submit a booking
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

        <Modal show={showModal} onHide={closeModal}>
            <Modal.Header closeButton>
              <Modal.Title>Leave a Review</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label> Rating: {'     '} </Form.Label>
                <Form.Select id="ratingFormSelect" value={rating} onChange={(e) => { setRating(e.target.value) }}>
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
                  id="ratingFormControl"
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
              <Button id="submitReviewButton" variant="primary" onClick={function () {
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

          <Modal show={showBookingModal} onHide={closeBookingModal}>
            <Modal.Header closeButton>
              <Modal.Title>${formD.price} per night</Modal.Title>
            </Modal.Header>
            <Modal.Body >

              <StyledCalendar value={dateRange} selectRange={true} onChange={function (e) {
                setDateRange(e)
                console.log(dateRange);
              } }/>

            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={closeBookingModal}>
                Close
              </Button>
              <Button variant="primary" onClick={function () {
                submitBooking();
              }}>Book </Button>
              <Badge bg="secondary">{bStatus}</Badge>
            </Modal.Footer>
          </Modal>
            <AllInfoMain>
            <ViewingTitle>{listingInfo.listingInfo.title}</ViewingTitle>

            <div>
              <StyledCarousel>
                <div>
                    <img src={listingInfo.listingInfo.thumbnail} />

                </div>
              <GenerateCarousel/>

              </StyledCarousel>
            </div>
            <ViewingBodyInfo>
              <ViewingInfoText>

                <ViewingInfoTypeTitle>
                  <h1>{formD.metadata.type}</h1>
                  Bedrooms: {formD.metadata.bedrooms.length} {' '} {' '}
                  Beds: {formD.metadata.totalbedrooms} {' '} {' '}
                  Bathrooms: {formD.metadata.bathrooms}
                </ViewingInfoTypeTitle>
                <ViewingInfoTypeTitle>{formD.metadata.authorDescription}</ViewingInfoTypeTitle>
                <ViewingInfoTypeTitle>
                  <h4>Address</h4>
                  <p>{formD.address.street}, {formD.address.city}, {formD.address.state}, {formD.address.postcode}, {formD.address.country}</p>
                </ViewingInfoTypeTitle>
                <ViewingInfoTypeTitle>
                  <h4>Amenities</h4>
                  <ul>
                    {formD.metadata.amenities.map((e, i) => (
                      <li key={i}>{e}</li>
                    ))}
                  </ul>
                </ViewingInfoTypeTitle>
              </ViewingInfoText>
              ·
            </ViewingBodyInfo>
            {token.token !== '' && <div style={{ marginBottom: '8vh' }}> <Button variant="primary" onClick={displayBookingModal}>
                  Book <i className="bi bi-box-arrow-in-up-right"/>
                </Button> {'  '} <Badge pill bg="secondary">{bLongStatus}</Badge> </div>}

            <ReviewBox>
              {console.log(totalRating)}
              <ViewingInfoTypeTitle style={{ display: 'flex', flexDirection: 'row' }}>
              <div style={{ marginTop: '5px', fontSize: '20pt' }}> {totalReviews} Reviews ·  </div>
                <OverlayTrigger trigger="click" placement="bottom" overlay={generateRatingPopover}>
                  <RatingButtonPrimary >
                    <Ratings
                      rating={totalRating}
                      widgetDimensions="30px"
                      widgetSpacings="0.2vw"
                    >
                      <Ratings.Widget widgetRatedColor="Gold" />
                      <Ratings.Widget widgetRatedColor="Gold" />
                      <Ratings.Widget widgetRatedColor="Gold" />
                      <Ratings.Widget widgetRatedColor="Gold" />
                      <Ratings.Widget widgetRatedColor="Gold" />
                    </Ratings>
                    <i className="bi bi-caret-down"></i>
                  </RatingButtonPrimary>

                </OverlayTrigger>

              </ViewingInfoTypeTitle>
              {canReview &&
              <Button style={{ marginBottom: '5vh' }} onClick={function () {
                displayModal();
                console.log('Being clicked');
              }}>Write a Review <i className="bi bi-box-arrow-in-up-right"/> </Button>
              }
              <ProduceReviewsList/>
            </ReviewBox>
          </AllInfoMain>
        </StyledMain>
        <footer>
        </footer>
      </StyledSection>
  );
}

export default ViewListing;
