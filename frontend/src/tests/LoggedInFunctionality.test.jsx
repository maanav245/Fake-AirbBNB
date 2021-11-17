import { mount } from 'enzyme';
import * as React from 'react';
import HostedListings from '../screens/HostedListings';
import NewListing from '../screens/NewListing';
import EditListing from '../screens/EditListing';
import ViewBookings from '../screens/ViewBookings';
import ViewListing from '../screens/ViewListing';
import { StyledForm, ListingsContainer, BookingContainer } from '../components/StyledComponents';
import { StoreContext } from '../Store';

describe('HostedListings', () => {
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

describe('NewListing', () => {
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

describe('EditListing', () => {
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

describe('ViewBookings', () => {
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

describe('ViewListing', () => {
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
