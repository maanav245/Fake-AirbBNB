For this assignment, we were required to write both component and UI tests in
order to test our frontend AirBrB application as much as possible.

Since this assignment was completed as a group, we were required to write at
least six component tests and two UI tests. A breakdown and rationale for each
of these is outlined below.

COMPONENT TESTS:
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
  - TODO
