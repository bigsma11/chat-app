import React from 'react'
import styled from 'styled-components'
import theme from '../theme/theme'
import ReactEmoji from 'react-emoji'

const Message = ({ message: { user, text }, name }) => {
  let isSentByCurrentUser = false

  const trimmedName = name.trim().toLowerCase()

  if (user === trimmedName) {
    isSentByCurrentUser = true
  }

  return isSentByCurrentUser ? (
    <MessageContainer current>
      <SentText current>{user}</SentText>
      <MessageBox current>
        <MessageText current>{ReactEmoji.emojify(text)}</MessageText>
      </MessageBox>
    </MessageContainer>
  ) : (
    <MessageContainer justifyStart>
      <MessageBox>
        <MessageText>{ReactEmoji.emojify(text)}</MessageText>
      </MessageBox>
      <SentText>{user}</SentText>
    </MessageContainer>
  )
}

const MessageContainer = styled.div`
  display: flex;
  justify-content: ${({ current }) => (current ? 'flex-end' : 'flex-start')};
  padding: 0 5%;
  margin-top: 3px;
`

const SentText = styled.p`
  display: flex;
  align-items: center;
  font-family: Helvetica;
  color: ${theme.color.smoke};
  padding-right: ${({ current }) => current && '10px'};
  padding-left: ${({ current }) => !current && '10px'};
`

const MessageBox = styled.div`
  background-color: ${({ current }) => (current ? theme.color.blue : theme.color.lighter)};
  border-radius: 20px;
  padding: 5px 20px;
  display: inline-block;
  max-width: 80%;
`

const MessageText = styled.p`
  width: 100%;
  letter-spacing: 0;
  float: left;
  font-size: 1.1em;
  word-wrap: break-word;
  color: ${({ current }) => (current ? theme.color.white : theme.color.grey)};
`

export default Message
