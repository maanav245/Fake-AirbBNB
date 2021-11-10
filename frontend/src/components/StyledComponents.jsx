import styled from 'styled-components';

const StyledSection = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`

const StyledHeader = styled.header`
  display: flex;
  justify-content: space-around;
  align-items: center;
  border: 0.5px solid rgb(221, 221, 221);
  box-shadow: rgb(0 0 0 / 7%) 0px 6px 16px;
  margin-bottom: 3vh;
`

const StyledMain = styled.main`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`

const StyledForm = styled.form`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`

export { StyledSection, StyledHeader, StyledMain, StyledForm }
