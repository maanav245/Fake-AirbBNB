
### 2.1. Feature Set 1. Admin Auth 

This focuses on the basic user interface to register and log in to the site. Login and registration are required to gain access to making bookings as a guest, leave reviews and to manage your own listings as a host.

#### 2.1.1. Login Screen


#### 2.1.2. Register Screen


#### 2.1.3. Logout Button


#### 2.1.4. Items on all screens

### 2.2. Feature Set 2. Creating & Editing & Publishing a Hosted Listing


#### 2.2.1. Hosted Listings Screen
* A unique route must exist for this screen
* A screen of all of YOUR listings (that you created) is displayed, where each listing shows the:
	- Title
	- Property Type
	- Number of **beds** (not bedrooms)
	- Number of bathrooms
	- Thumbnail of the listing
	- SVG rating of the listing (based on user ratings)
	- Number of total reviews
	- Price (per night)

#### 2.2.2. Hosted Listing Create
screen that requires you to provide the following details:
	- Listing Title
	- Listing Address
	- Listing Price (per night)
	- Listing Thumbnail
	- Property Type
	- Number of bathrooms on the property
	- Property bedrooms (e.g. each bedroom could include number of beds and their type)
	- Property amenities

#### 2.2.3. Edit AirBrB Listing

* The user should be able to edit the following: 
	- Title
	- Address
	- Thumbnail
	- Price (per night)
	- Type
	- Number of bathrooms
	- Bedrooms (incorporate editing of beds as part of bedrooms) (**\***)
	- Amenities
	- List of property images


#### 2.2.4. Publishing a listing

### 2.3. Feature Set 3. Landing Page: Listings and Search 

When the app loads, regardless of whether a user is logged in or not, they can access the landing screen. The landing screen displays a number of listings that you as a guest may be able to book (on another screen). 

#### 2.3.1. Listings Screen
* This screen displays a list of all listings (rows or thumbnails). The information displayed in each listing is:
  * Title
  * Thumbnail of property (or video if advanced)
  * Number of total reviews
  * (any more information you want, though that's optional).


#### 2.3.2. Search Filters
* On this listings screen, a search section must exist for the user to filter via search parameters.


### 2.4. Feature Set 4. Viewing and Booking Listings

#### 2.4.1. View a Selected Listing

 * On this screen the user is given the listing they have decided to view in 2.4.1. This consists of:
	- Title
	- Address (displayed as a string, e.g. 1/101 Kensington Street, Kensington, NSW)
	- Amenities
	- Price:
		- If the user used a date range for search in `2.3.2` - display **price per stay**
		- If the user did not use a date range for search in `2.3.2` - display **price per night**
	- All images of the property including the listing thumbnail (they don't have to be visible all at once)
	- Type
	- Reviews
	- Review rating
	- Number of bedrooms
	- Number of beds
	- Number of bathrooms


#### 2.4.2. Making a booking and checking its status

#### 2.4.3 Leaving a listing review

### 2.5. Feature Set 5. Removing a Listing, Managing Booking Requests 

#### 2.5.1. Removing a live listing

#### 2.5.2. Viewing booking requests and history for a hosted listing

### 2.6. Feature Set 6. Advanced Features

#### 2.6.1 Advanced Listing Rating Viewing
* On hover of star rating a tool tip appears which displays the break down of how many people rated the booking (both in percentage terms and absolute terms) within each star category. (e.g. see Amazon product rating for reference)
* If you click on a particular star rating, another screen should appear (that can be closed) that shows all of the individual reviews left for that rating.

#### 2.6.2 Listing Profits Graph


#### 2.6.3. Listing Upload (TODO)


#### 2.6.4 YouTube Listing Thumbnail (TODO)



