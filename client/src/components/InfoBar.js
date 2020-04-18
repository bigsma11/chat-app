import React from 'react'
import styled from 'styled-components'
import closeIcon from '../icons/closeIcon.png'
import onlineIcon from '../icons/onlineIcon.png'
import theme from '../theme/theme'

const InfoBar = ({ room }) => {
  return (
    <Container>
      <LeftInnerContainer>
        <OnlineIcon src={onlineIcon} alt="online" />
        <h3>{room}</h3>
      </LeftInnerContainer>
      <RightInnerContainer>
        <a href="/demo/chatapp">
          <img src={closeIcon} alt="close" />
        </a>
      </RightInnerContainer>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${theme.color.blue};
  border-radius: 4px 4px 0 0;
  height: 60px;
  width: 100%;

  @media ${theme.mediaQueries.phone} {
    border-radius: 0;
  }
`

const LeftInnerContainer = styled.div`
  display: flex;
  flex: 0.5;
  align-items: center;
  margin-left: 5%;
  color: ${theme.color.white};
`

const OnlineIcon = styled.img`
  margin-right: 5%;
`
const RightInnerContainer = styled.div`
  display: flex;
  flex: 0.5;
  justify-content: flex-end;
  margin-right: 5%;
`

export default InfoBar
