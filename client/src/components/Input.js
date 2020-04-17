import React from 'react'
import styled from 'styled-components'
import theme from '../theme/theme'
import { StyledButton } from './styled'

const Input = ({ message, setMessage, sendMessage }) => {
  return (
    <StyledForm onSubmit={sendMessage}>
      <StyledInput
        type="text"
        placeholder="Type a message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <StyledButton>send</StyledButton>
    </StyledForm>
  )
}

const StyledForm = styled.form`
  display: flex;
  border-top: 2px solid ${theme.color.light};
`

const StyledInput = styled.input`
  border: none;
  border-radius: 0;
  padding: 5%;
  width: 80%;
  font-size: 1.2em;
`

export default Input
