import React from 'react';
import PropTypes from 'prop-types';

export const StoreContext = React.createContext(null);

Store.propTypes = {
  children: PropTypes.object.isRequired,
};

function Store ({ children }) {
  const [page, setPage] = React.useState(0);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const store = {
    page: { page, setPage },
    email: { email, setEmail },
    password: { password, setPassword },
  }

  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
}

export default Store;
