import React, { useEffect, useRef } from 'react'
import Message from './Message'
import styled from 'styled-components'

const Messages = ({ messages, name }) => {
  const messagesEndRef = useRef(null)

  useEffect(() => {
    messagesEndRef.current.scrollIntoView({ behavior: 'auto' })
  }, [messages])

  return (
    <Container>
      {messages.map((message, i) => (
        <div key={i}>
          <Message message={message} name={name} />
        </div>
      ))}
      <div ref={messagesEndRef} />
    </Container>
  )
}

const Container = styled.div`
  padding: 5% 0;
  overflow: auto;
  flex: auto;
`

export default Messages
