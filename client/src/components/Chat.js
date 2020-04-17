import React, { useState, useEffect } from 'react'
import queryString from 'query-string'
import io from 'socket.io-client'
import { useLocation } from 'react-router-dom'
import styled, { createGlobalStyle } from 'styled-components'
import InfoBar from './InfoBar'
import Div100vh from 'react-div-100vh'
import theme from '../theme/theme'
import Input from './Input'
import Messages from './Messages'

let socket

function Chat() {
  let location = useLocation()

  const [name, setName] = useState('')
  const [room, setRoom] = useState('')
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])

  const ENDPOINT = 'http://212.50.225.206'

  // join the room
  useEffect(() => {
    const { name, room } = queryString.parse(location.search)

    socket = io(ENDPOINT)

    setName(name)
    setRoom(room)

    socket.emit('join', { name, room }, () => {})

    return () => {
      socket.emit('disconnect')
      socket.off()
    }
  }, [location.search, ENDPOINT])

  // handle messages
  useEffect(() => {
    socket.on('message', (message) => {
      setMessages([...messages, message])
    })
  }, [messages])

  // function for sending messages
  const sendMessage = (e) => {
    e.preventDefault()
    if (message) {
      socket.emit('sendMessage', message, () => setMessage(''))
    }
  }

  return (
    <>
      <MobileBackground />
      <Div100vh>
        <OuterContainer>
          <Container>
            <InfoBar room={room} />
            <Messages messages={messages} name={name} />
            <Input {...{ message, setMessage, sendMessage }} />
          </Container>
        </OuterContainer>
      </Div100vh>
    </>
  )
}

const MobileBackground = createGlobalStyle`
  @media ${theme.mediaQueries.phone} {
    body {
      background-color: ${theme.color.white}
    }
  }
`

const OuterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: inherit;
`
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: ${theme.color.white};
  border-radius: 8px;
  height: 60%;
  width: 35%;

  @media ${theme.mediaQueries.phone} {
    width: 100%;
    height: 100%;
    border-radius: 0;
  }

  @media ${theme.mediaQueries.pad} {
    width: 60%;
  }
`

export default Chat
