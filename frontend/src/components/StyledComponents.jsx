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

const StyledInput = styled.input`
  height: 40px;
  margin: 10px;
  font-size: 12pt;
  border-radius: 10px;
  border: 1px solid black;
  width: 260px;
`

const StyledFileInput = styled(StyledInput)`
  &::-webkit-file-upload-button {
    display: none;
  }

  &::before {
    background-color: blue;
    color: white;
    content: "Upload Thumbnail";
    padding: 5px;
    margin-top: 2px;
    margin-left: 4px;
    margin-right: 4px;
    border-radius: 10px;
    display: inline-block;
  }
`

export { StyledSection, StyledHeader, StyledMain, StyledForm, StyledInput, StyledFileInput }
