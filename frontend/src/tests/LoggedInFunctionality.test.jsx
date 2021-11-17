import { mount } from 'enzyme';
import * as React from 'react';

import { StoreContext } from '../Store';
import HostedListings from '../screens/HostedListings';
import NewListing from '../screens/NewListing';
import EditListing from '../screens/EditListing';
import ViewBookings from '../screens/ViewBookings';
import ViewListing from '../screens/ViewListing';
import { StyledForm, ListingsContainer, BookingContainer } from '../components/StyledComponents';

// Test the hosted listings page loads appropriately
describe('HostedListings', () => {
  // Check that it does not display when not logged in
  // Manipulate the test context to simulate an empty token representing no
  // user logged in
  it('displays an empty page when not logged in', () => {
    const testVal = {
      token: {
        token: '',
      },
      page: {
        setPage: jest.fn(),
      },
    }
    const wrapper = mount(
      <StoreContext.Provider value={testVal}>
        <HostedListings/>
      </StoreContext.Provider>
    );
    expect(wrapper.find(ListingsContainer)).toHaveLength(0);
    expect(wrapper.find('h1').first().text()).toBe('You must log in to view this page');
  });

  // Check that the page displays fully when logged in
  // Manipulate the test context to simulate a non-empty token representing a
  // user is logged in
  it('displays the page when logged in', () => {
    const testVal = {
      token: {
        token: 'abc',
      },
      page: {
        setPage: jest.fn(),
      },
      modal: {
        modal: '',
      }
    }
    const wrapper = mount(
      <StoreContext.Provider value={testVal}>
        <HostedListings/>
      </StoreContext.Provider>
    );
    expect(wrapper.find(ListingsContainer)).toHaveLength(1);
    expect(wrapper.find('h1').first().text()).toBe('Hosted Listings');
  });
});

// Test the new listing page loads appropriately
describe('NewListing', () => {
  // Check that it does not display when not logged in
  // Manipulate the test context to simulate an empty token representing no
  // user logged in
  it('displays an empty page when not logged in', () => {
    const testVal = {
      token: {
        token: '',
      },
    }
    const wrapper = mount(
      <StoreContext.Provider value={testVal}>
        <NewListing/>
      </StoreContext.Provider>
    );
    expect(wrapper.find(StyledForm)).toHaveLength(0);
    expect(wrapper.find('h1').first().text()).toBe('You must log in to view this page');
  });

  // Check that the page displays fully when logged in
  // Manipulate the test context to simulate a non-empty token representing a
  // user is logged in
  it('displays the page when logged in', () => {
    const testVal = {
      token: {
        token: 'abc',
      },
      modal: {
        modal: '',
      }
    }
    const wrapper = mount(
      <StoreContext.Provider value={testVal}>
        <NewListing/>
      </StoreContext.Provider>
    );
    expect(wrapper.find(StyledForm)).toHaveLength(1);
    expect(wrapper.find('h1').first().text()).toBe('Create New Listing');
  });
});

// Test the edit listing page loads appropriately
describe('EditListing', () => {
  // Check that it does not display when not logged in
  // Manipulate the test context to simulate an empty token representing no
  // user logged in
  it('displays an empty page when not logged in', () => {
    const testVal = {
      token: {
        token: '',
      },
    }
    const wrapper = mount(
      <StoreContext.Provider value={testVal}>
        <EditListing/>
      </StoreContext.Provider>
    );
    expect(wrapper.find(StyledForm)).toHaveLength(0);
    expect(wrapper.find('h1').first().text()).toBe('You must log in to view this page');
  });

  // Check that the page displays fully when logged in
  // Manipulate the test context to simulate a non-empty token representing a
  // user is logged in
  it('displays the page when logged in', () => {
    const testVal = {
      token: {
        token: 'abc',
      },
      modal: {
        modal: '',
      },
      listingInfo: {
        listingInfo: {
          address: {
            street: '',
          },
          metadata: {
            type: '',
            bedrooms: [],
          },
        },
      },
    }
    const wrapper = mount(
      <StoreContext.Provider value={testVal}>
        <EditListing/>
      </StoreContext.Provider>
    );
    expect(wrapper.find(StyledForm)).toHaveLength(1);
    expect(wrapper.find('h1').first().text()).toBe('Edit Listing');
  });
});

// Test the view bookings page loads appropriately
describe('ViewBookings', () => {
  // Check that it does not display when not logged in
  // Manipulate the test context to simulate an empty token representing no
  // user logged in
  it('displays an empty page when not logged in', () => {
    const testVal = {
      token: {
        token: '',
      },
    }
    const wrapper = mount(
      <StoreContext.Provider value={testVal}>
        <ViewBookings/>
      </StoreContext.Provider>
    );
    expect(wrapper.find('h1').first().text()).toBe('You must log in to view this page');
  });

  // Check that the page displays fully when logged in
  // Manipulate the test context to simulate a non-empty token representing a
  // user is logged in
  it('displays the page when logged in', () => {
    const testVal = {
      token: {
        token: 'abc',
      },
      modal: {
        modal: '',
      },
      listingInfo: {
        listingInfo: {
          address: {
            street: '',
          },
          metadata: {
            type: '',
            bedrooms: [],
          },
        },
      },
    }
    const wrapper = mount(
      <StoreContext.Provider value={testVal}>
        <ViewBookings/>
      </StoreContext.Provider>
    );
    expect(wrapper.find('h1').first().text()).toBe('Listing Information');
  });
});

// Test the view listing page loads appropriately
describe('ViewListing', () => {
  // Check that it does not display a booking form when not logged in
  // Manipulate the test context to simulate an empty token representing no
  // user logged in
  it('does not let the user book when not logged in', () => {
    const testVal = {
      token: {
        token: '',
      },
      modal: {
        modal: '',
      },
      listingInfo: {
        listingInfo: {
          address: {
            street: '',
          },
          metadata: {
            type: '',
            bedrooms: [],
          },
        },
      },
    }
    const wrapper = mount(
      <StoreContext.Provider value={testVal}>
        <ViewListing/>
      </StoreContext.Provider>
    );
    expect(wrapper.find(BookingContainer)).toHaveLength(0);
  });

  // Check that the page displays fully when logged in
  // Manipulate the test context to simulate a non-empty token representing a
  // user is logged in
  it('lets the user book when logged in', () => {
    const testVal = {
      token: {
        token: 'abc',
      },
      modal: {
        modal: '',
      },
      listingInfo: {
        listingInfo: {
          address: {
            street: '',
          },
          metadata: {
            type: '',
            bedrooms: [],
          },
        },
      },
    }
    const wrapper = mount(
      <StoreContext.Provider value={testVal}>
        <ViewListing/>
      </StoreContext.Provider>
    );
    expect(wrapper.find(BookingContainer)).toHaveLength(1);
  });
});
