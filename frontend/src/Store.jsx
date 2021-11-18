import React from 'react';
import PropTypes from 'prop-types';

export const StoreContext = React.createContext(null);

Store.propTypes = {
  children: PropTypes.object.isRequired,
};

function Store ({ children }) {
  const [page, setPage] = React.useState(0);
  const [token, setToken] = React.useState('');
  const [modal, setModal] = React.useState('');
  const [users, setUsers] = React.useState(JSON.parse(localStorage.getItem('users')));
  const [user, setUser] = React.useState('');
  const [listingInfo, setlistingInfo] = React.useState({});
  const [editListingId, seteditListingId] = React.useState('');
  const [filters, setFilters] = React.useState({});
  const [viewListingId, setViewListingId] = React.useState('');
  const [bookingsListingId, setBookingsListingId] = React.useState('');

  const store = {
    // The page number
    page: { page, setPage },
    // The token of the user
    token: { token, setToken },
    // The specific information in the modal
    modal: { modal, setModal },
    // Info about multiple users
    users: { users, setUsers },
    // Email of the user
    user: { user, setUser },
    // Specific listing info about a particular listing
    listingInfo: { listingInfo, setlistingInfo },
    // The id of a listing about to be edited
    editListingId: { editListingId, seteditListingId },
    // The filters required
    filters: { filters, setFilters },
    // The id of a listing about to be viewed
    viewListingId: { viewListingId, setViewListingId },
    // The id of a listing about to be booked
    bookingsListingId: { bookingsListingId, setBookingsListingId },
  }

  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
}

export default Store;
