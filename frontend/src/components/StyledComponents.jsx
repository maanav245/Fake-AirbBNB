import styled from 'styled-components';
import Calendar from 'react-calendar'
import { Carousel } from 'react-responsive-carousel';

const StyledCarousel = styled(Carousel)`
  width: 70vw;

`

const StyledSection = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`

const StyledHeader = styled.header`
  width: 100vw;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border: 0.5px solid rgb(221, 221, 221);
  box-shadow: rgb(0 0 0 / 7%) 0px 6px 16px;
  margin-bottom: 3vh;
`

const StyledMain = styled.main`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`

const StyledForm = styled.form`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`

const StyledInput = styled.input`
  height: 40px;
  margin: 10px;
  font-size: 12pt;
  border-radius: 10px;
  border: 1px solid black;
  width: 260px;
`

const StyledFileInput = styled(StyledInput)`
  &::-webkit-file-upload-button {
    display: none;
  }

  &::before {
    background-color: blue;
    color: white;
    content: "Upload Thumbnail";
    padding: 5px;
    margin-top: 2px;
    margin-left: 4px;
    margin-right: 4px;
    border-radius: 10px;
    display: inline-block;
  }
`

const Banner = styled.div`
  flex: 1;
  justify-content: center;
  align-items: center;
  display: flex;
`

const ListingsContainer = styled.div`
  width: 90vw;
  display: flex;
  flex-direction: column;
  background-color: beige;
  margin-bottom: 20vh;
`

const ListingContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin: auto;
  width: 100%;
  height: 100%;
  border: 2px solid black;
  align-items: center;
`

const ListingImage = styled.img`
  height: 100%;
  width: 100%;
  max-height: 70vh;
  max-width: 50vw;
  padding: 20px;
`

const ListingInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 55%;
  margin: 10px;
`

const ListingButtons = styled.div`
  @media (max-width: 768px) {
    flex-direction: column;
  }
  display: flex;
`

const ViewingTitle = styled.h1`
  font-family: Circular, -apple-system, BlinkMacSystemFont, Roboto, "Helvetica Neue", sans-serif;
  font-weight: 500;
  margin-top: 2vh;

`

const ViewingMain = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 6.5vw;
`
const RatingButtonPrimary = styled.div`
  background-colour: white;
  cursor: pointer;
`

const RatingPopover = styled.div`
  width: 65vw;
  height: 60vh;
`
const RatingProgress = styled.div`
  padding: 1vw;
  display: flex;
  flex-direction: row;

`
const ViewingBodyInfo = styled.div`
  width: 90vw;
  margin-top: 10vh;

  display: flex;
  flex-direction: row;
  margin-bottom: 5vh;
`
const ViewingInfoText = styled.div`

order: 1;

`
const BookingContainer = styled.div`
  margin-left: auto;
  order: 2;

  width: fit-content;
  height: 70vh;
  background-color: white;
  border: 1px solid rgb(221, 221, 221);
  border-radius: 5%;
  padding: 3%;
  box-shadow: rgb(0 0 0 / 12%) 0px 6px 16px;
`

const ViewingInfoTypeTitle = styled.div`
  width: 70vw;

  font-family: Circular, -apple-system, BlinkMacSystemFont, Roboto, "Helvetica Neue", sans-serif;
  font-weight: 300;

  padding-bottom: 1vh;
  margin-bottom: 8vh;
  border-bottom: 0.5px rgb(214, 214, 214) solid;

`
const ReviewBox = styled.div`

  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 5vh;

`

const ReviewsList = styled.div`
  overflow-y: scroll;
  height: 70vh;
`

const ReviewItself = styled.div`
  width: 100%;
  height: 20vh;
`

const ReviewUser = styled.div` 
  font-size: large;
  font-weight: bold;
  height: 5vh;
`

const ReviewBody = styled.div`
  font-size: medium;
  height: 10vh;
`
const StyledCalendar = styled(Calendar)`
  margin: auto;
`
const AllInfoMain = styled.div`
  margin-left: 5vw;
`

export { AllInfoMain, StyledCarousel, StyledCalendar, ReviewsList, ReviewBody, ReviewUser, ReviewItself, ReviewBox, ViewingInfoTypeTitle, BookingContainer, ViewingInfoText, ViewingBodyInfo, RatingProgress, RatingPopover, RatingButtonPrimary, ViewingMain, ViewingTitle, StyledSection, StyledHeader, StyledMain, StyledForm, StyledInput, StyledFileInput, Banner, ListingsContainer, ListingContainer, ListingImage, ListingInfo, ListingButtons }
