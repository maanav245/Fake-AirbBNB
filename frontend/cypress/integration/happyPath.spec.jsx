context('Happy Path', () => {

  // Start by navigating to the correct URL
  before(() => {
    cy.visit('localhost:3000');
  });

  // All unique user and listing variables are controlled by this
  // Change this variable to generate new unique users and listings
  // We recommend that you restart the server before running this test
  // to ensure uniqueness and improve performance
  const x = 1;

  const title1 = 'NewHouse1' + x;
  const title2 = 'NewHouse2' + x;
  const email1 = 'example1' + x + '@email.com';

  // This variable should be the name of an existing live listing that can be
  // booked
  const title3 = 'NewHouse3';

  // Test registration
  it('Registers Successfully', () => {
    const name = 'John Smith';
    const email = email1;
    const password1 = 'password';
    const password2 = 'password';

    cy.get('[id=loginButton]')
      .click();

    cy.get('[id=registerButton]')
      .click();

    cy.get('[id=registerName]')
      .focus()
      .type(name);

    cy.get('[id=registerEmail]')
      .focus()
      .type(email);

    cy.get('[id=registerPassword1]')
      .focus()
      .type(password1);

    cy.get('[id=registerPassword2]')
      .focus()
      .type(password2);

    cy.get('[id=submitRegister]')
      .click();
  });

  // Test listing creation
  it('Creates a new listing successfully', () => {
    const title = title1;
    const street = '10 Example Street';
    const city = 'Sydney';
    const state = 'NSW';
    const postcode = '2000';
    const country = 'Australia';
    const price = '100';
    const thumbnail = 'house.jpeg';
    const type = 'house';
    const bathrooms = '2';
    const bedrooms = '3';
    const bedroom1NumBeds = '1';
    const bedroom1TypeBeds = 'queen';
    const bedroom2NumBeds = '2';
    const bedroom2TypeBeds = 'single';
    const bedroom3NumBeds = '1';
    const bedroom3TypeBeds = 'double';
    const amenities = 'pool';

    cy.get('[id=hostedListingsButton]')
      .click();

    cy.get('[id=newListingButton]')
      .click();

    cy.get('[id=listingTitle]')
      .focus()
      .type(title);

    cy.get('[id=addressStreet]')
      .focus()
      .type(street);

    cy.get('[id=addressCity]')
      .focus()
      .type(city);

    cy.get('[id=addressState]')
      .focus()
      .type(state);

    cy.get('[id=addressPostcode]')
      .focus()
      .type(postcode);

    cy.get('[id=addressCountry]')
      .focus()
      .type(country);

    cy.get('[id=propertyPrice]')
      .focus()
      .type(price);

    // Test thumbnail file upload
    cy.fixture(thumbnail).then(fileContent => {
      cy.get('[id=propertyThumbnail]')
        .attachFile(thumbnail);
    });

    cy.get('[id=propertyType]')
      .focus()
      .type(type);

    cy.get('[id=numBathrooms]')
      .focus()
      .type(bathrooms);

    cy.get('[id=numBedrooms]')
      .focus()
      .type(bedrooms);

    cy.get('[id=0-number]')
      .focus()
      .type(bedroom1NumBeds);

    cy.get('[id=0-type]')
      .focus()
      .type(bedroom1TypeBeds);

    cy.get('[id=1-number]')
      .focus()
      .type(bedroom2NumBeds);

    cy.get('[id=1-type]')
      .focus()
      .type(bedroom2TypeBeds);

    cy.get('[id=2-number]')
      .focus()
      .type(bedroom3NumBeds);

    cy.get('[id=2-type]')
      .focus()
      .type(bedroom3TypeBeds);

    cy.get('[id=amenities]')
      .focus()
      .type(amenities);

    cy.get('[id=confirmNewListing]')
      .click();
  });

  // Test listing editing
  it('Updates the thumbnail and title of the listing successfully', () => {
    const title = title1;
    const newTitle = title2;
    const newThumbnail = 'house2.jpeg'

    cy.wait(500);

    cy.get(`[id=editListing${title}]`)
      .click();

    cy.get('[id=editListingTitle]')
      .focus()
      .clear()
      .type(newTitle);

    cy.fixture(newThumbnail).then(fileContent => {
      cy.get('[id=editPropertyThumbnail]')
        .attachFile(newThumbnail);
    });

    cy.get('[id=confirmEditListing]')
      .click();
  });

  // Test listing publishing
  it('publishes a listing successfully', () => {
    const title = title2;

    cy.wait(500);

    cy.get(`[id=publish${title}]`)
      .click();

    cy.get('.react-calendar')
      .click()
      .click();

    cy.get('[id=confirmPublishButton]')
      .click();
  });

  // Test listing unpublishing
  it('unpublishes a listing successfully', () => {
    const title = title2;

    cy.wait(500);

    cy.get(`[id=unpublish${title}]`)
      .click();
  });

  // Test booking
  it('makes a booking successfully', () => {
    const title = title3;

    cy.get('[id=listingsButton]')
      .click();

    cy.get(`[id=view${title}]`)
      .click();

    cy.get('.react-calendar')
      .click()
      .click()
      .click();

    cy.get('[id=confirmBookButton]')
      .click();
  });

  // Test user log out
  it('logs out of the application successfully', () => {
    cy.get('[id=logoutButton]')
      .click();
  });

  // Test user log in
  it('logs back into the application successfully', () => {
    const email = email1;
    const password = 'password';

    cy.get('[id=loginButton]')
      .click();

    cy.get('[id=loginEmail]')
      .focus()
      .type(email);

    cy.get('[id=loginPassword]')
      .focus()
      .type(password);

    cy.get('[id=confirmLoginButton]')
      .click();
  });

});
