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
  const [profit, setProfit] = React.useState(0);

  const store = {
    page: { page, setPage },
    token: { token, setToken },
    modal: { modal, setModal },
    users: { users, setUsers },
    user: { user, setUser },
    listingInfo: { listingInfo, setlistingInfo },
    editListingId: { editListingId, seteditListingId },
    filters: { filters, setFilters },
    viewListingId: { viewListingId, setViewListingId },
    bookingsListingId: { bookingsListingId, setBookingsListingId },
    profit: { profit, setProfit },
  }

  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
}

export default Store;
