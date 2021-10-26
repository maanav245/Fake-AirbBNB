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

  const store = {
    page: { page, setPage },
    token: { token, setToken },
    modal: { modal, setModal },
  }

  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
}

export default Store;
