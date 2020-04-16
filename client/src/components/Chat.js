import React, { useState, useEffect } from 'react'
import queryString from 'query-string'
import io from 'socket.io-client'
import { useLocation } from 'react-router-dom'
import styled from 'styled-components'

let socket

function Chat() {
  let location = useLocation()

  const [name, setName] = useState('')
  const [room, setRoom] = useState('')
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])

  const ENDPOINT = 'localhost:5000'

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

  console.log(message, messages)

  return (
    <OuterContainer>
      <Container>
        <form onSubmit={sendMessage}>
          <input value={message} onChange={(e) => setMessage(e.target.value)} />
        </form>
      </Container>
    </OuterContainer>
  )
}

const OuterContainer = styled.div``
const Container = styled.div``

export default Chat
