import React from 'react';
import styled from 'styled-components';

const StyledLogo = styled.div`
  color: blue;
  font-size: 20pt;
  padding: 10px;
  font-weight: bold;
  border: solid 1px black;
  border-radius: 20px;
  margin: 10px;
  width: 100px;
  text-align: center;
`
/*
Airbnb logo
*/

function Logo () {
  return (
    <StyledLogo>
      AirBrb
    </StyledLogo>
  )
}

export default Logo;
