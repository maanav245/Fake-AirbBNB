For this assignment, we were required to write both component and UI tests in
order to test our frontend AirBrB application as much as possible.

Since this assignment was completed as a group, we were required to write at
least six component tests and two UI tests. A breakdown and rationale for each
of these is outlined below.

COMPONENT TESTS:

In general, there were not a whole lot of functional
components that could be accurately tested for this section.
This is primarily due to the nature of writing a significant
amount of logic within functional components themselves. This
is because most logic relies on state or context variables
that can only be accessed within functional components.
However, the following tests outlined below describe some of
the key functionality of our application. Often, these test
specific examples of important concepts that are used
multiple times throughout the frontend. More general testing
is performed as a part of the UI tests as outlined in the
following section.
- App.test.jsx
  - This test involves checking that each route is rendered
    appropriately
  - We manually set the pathname
  - For each path, check that the correct screen is rendered
  - This test is important so we can display the correct
    content, even if a user navigates directly by the browser
    URL
- LinkButton.test.jsx
  - This test involves checking the function of the custom
    LinkButton component
  - This component can be used in place of either an HTML
    button tag or a react-router-dom Link tag
  - It takes in a "to" property that is a pathname used for
    the Link tag
  - If the "to" property is ".", then the Link is simply
    referencing to the current page
  - It also takes in an onClick property describing a
    function to be executed when the component is clicked
  - It also takes in properties for the component value and id
  - This test checks that all of these properties are passed
    correctly and that the component behaves as expected
  - Since this custom component is used so frequently, it is
    vital that we test it thoroughly as an error in this
    component could cause major errors throughout the entire
    application
- LoggedInButtons.test.jsx
  - This test involves checking the conditional render of the
    listings and hosted listings buttons that appear only
    when a user is logged in
  - For this test, we manipulate the context provider to
    supply set values for the user token
  - If the token is empty, then there is no user currently
    logged in so the buttons should not render
  - However, if the token is anything else, the buttons should
    render successfully as checked by the presence of two
    LinkButton components
  - This feature is important to test so that a new user who
    is not logged in will not be able to manipulate the full
    functionality of the application
- LoggedInFunctionality.test.jsx
  - This test involves checking that a logged out user does
    not have full access to the functionality reserved for a
    logged in user
  - In this test, we check all screens that contain some form
    of functionality that is reserved for a logged in user
  - In the case of the HostedListings, NewListing, EditListing
    and ViewBookings screens, the page should only fully
    render when logged in
  - Otherwise, we simply tell the user that they must be
    logged in to view this screen
  - Although, if the previous test passes, the user will not
    be given a button to reach these screens in the first
    place, due to the nature of react-router-dom, the user
    could instead manipulate the browser URL to reach these
    pages when they are otherwise not meant to
  - Furthermore, on the ViewListing screen, a logged out user
    should still have access to view the listing but they will
    not be able to make any bookings
  - For all of these screens, we test the correct
    functionality is returned for both logged out and logged
    in users by again manipulating the test context
- LoginButton.test.jsx
  - This test involves checking the status of the login/logout
    button
  - Again, we are testing a significant conditional render to
    ensure that the correct button is visible depending on the
    state of the user
  - For a logged out user, this button should take them to the
    appropriate page for them to log in or register
  - For a logged in user, this button should log them out
  - It is vital that each of these buttons is available at the
    appropriate time and performs the desired action
  - Otherwise, a user would never be able to log in or log out
    and would have a very poor user experience
  - We test this feature for both logged in and logged out
    users by further manipulating the token variable in the
    test context
- Modal.test.jsx
  - This test involves checking the custom modal component
    that has been created for use in this application
  - Primarily, this modal is used for displaying error
    messages from the backend as a result of a bad fetch
  - By default, this modal is closed at all times
  - However, it is controlled by the modal variable in the
    application context
  - The modal will display whatever error message it is
    given and provide the user with the ability to close the
    message
  - There are also some additional special cases that the
    modal is used for
  - For example, the modal is used to provide a space for
    users to filter listings on the Landing screen
  - This modal window should appear only when the variable
    passed to it is exactly the word "filters"
  - In this test, we check that the modal appears and
    disappears appropriately in all of its possible states
    as described above

UI TESTS:

These UI tests described below are useful for testing the
integration of multiple components to simulate common user
actions and paths. We use Cypress to perform these UI tests
which can be run with the command "yarn run cypress open".
- HappyPath.spec.jsx
  - This spec defines a series of UI tests and actions that
    together define the "Happy Path" of a user given in the
    assignment specification
  - The "Happy Path" of a user is described as:
    - Registers successfully:
      - Navigate to the register screen
      - Fill out all required input
      - Submit
    - Creates a new listing successfully:
      - Navigate to the new listing screen
      - Fill out all required input
      - Submit
    - Updates the thumbnail and title of the listing
      successfully:
      - Navigate to the edit listing screen
      - Modify title and thumbnail input fields
      - Submit
    - Publish a listing successfully:
      - Select the publish button
      - Select dates to publish
      - Submit
    - Unpublish a listing successfully:
      - Select the unpublish button
    - Make a booking successfully:
      - Navigate to the view listing screen
      - Choose a date to book
      - Submit
    - Logs out of the application successfully:
      - Select the logout button
    - Logs back into the application successfully:
      - Navigate to the login screen
      - Fill out all required input
      - Submit
- MyPath.spec.jsx
  - Since this assignment was completed in a pair, we are
    also required to create and test an additional user path
    via a series of integrated UI tests
  - This secondary path is described as:
    - Register first user:
      - Navigate to the register screen
      - Fill out all required input
      - Submit
    - Create a new listing:
      - Navigate to the new listing screen
      - Fill out all required input
      - Submit
    - Publish a listing:
      - Select the publish button
      - Select dates to publish
      - Submit
    - Log out first user:
      - Select the logout button
    - Register second user:
      - Navigate to the register screen
      - Fill out all required input
      - Submit
    - Request a booking:
      - Navigate to the view listing screen
      - Choose a date to book
      - Submit
    - Log out second user:
      - Select the logout button
    - Log back in as the first user:
      - Navigate to the login screen
      - Fill out all required input
      - Submit
    - Accept booking:
      - Navigate to the view bookings screen
      - Accept the booking
    - Log out first user:
      - Select the logout button
    - Log back in as the second user:
      - Navigate to the login screen
      - Fill out all required input
      - Submit
    - Leave a review:
      - Navigate to the view listing screen
      - Select the leave review button
      - Fill out all required input
      - Submit
    - Log out second user:
      - Select the logout button
  - This second UI testing path has been chosen in such a way
    to extend upon the first happy path with some additional
    user actions not yet tested
  - Namely, we test accepting a booking as well as leaving a
    review
  - Additionally, this testing path also deals with multiple
    users both interacting with the application and each
    other in meaningful ways
