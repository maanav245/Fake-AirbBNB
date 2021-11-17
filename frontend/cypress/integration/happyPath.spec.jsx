context('Happy Path', () => {
  before(() => {
    cy.visit('localhost:3000');
  })
  it('Registers Successfully', () => {
    const name = 'John Smith';
    const email = 'example14@email.com';
    const password1 = 'password';
    const password2 = 'password';

    cy.get('[id=loginButton]')
      .click()

    cy.get('[id=registerButton]')
      .click()

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
      .click()
  });
  it('Creates a new listing successfully', () => {
    const title = 'New House 100';
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
      .click()

    cy.get('[id=newListingButton]')
      .click()

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
      .click()
  });
});
