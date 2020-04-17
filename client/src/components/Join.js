import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Div100vh from 'react-div-100vh'
import styled from 'styled-components'
import theme from '../theme/theme'
import { StyledButton } from './styled'

function Join() {
  const [name, setName] = useState('')
  const [room, setRoom] = useState('')

  return (
    <Div100vh>
      <OuterContainer>
        <InnerContainer>
          <StyledHeading>Join</StyledHeading>
          <form>
            <StyledInput
              placeholder="Name"
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
            <StyledInput
              placeholder="Room"
              type="text"
              onChange={(e) => setRoom(e.target.value)}
              value={room}
            />

            <Link to={`/chat?name=${name}&room=${room}`}>
              <JoinButton type="submit" disabled={!name || !room}>
                Sign in
              </JoinButton>
            </Link>
          </form>
        </InnerContainer>
      </OuterContainer>
    </Div100vh>
  )
}

const OuterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: inherit;
  background-color: ${theme.color.dark};
`

const InnerContainer = styled.div`
  width: 20%;

  @media ${theme.mediaQueries.phone} {
    width: 90%;
  }

  @media ${theme.mediaQueries.pad} {
    width: 25%;
  }
`

const StyledHeading = styled.h1`
  color: ${theme.color.white};
  font-size: 2.5em;
  margin-top: 0;
  padding-bottom: 10px;
  border-bottom: 2px solid ${theme.color.white};
`

const StyledInput = styled.input`
  border-radius: 0;
  width: 100%;
  padding: 15px 20px;
  margin-bottom: 20px;
  outline: none;
`

const JoinButton = styled(StyledButton)`
  width: 100%;
  border-radius: 5px;
`

export default Join
