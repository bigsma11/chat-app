import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import styles from './Join.module.css'
import Div100vh from 'react-div-100vh'

function Join() {
  const [name, setName] = useState('')
  const [room, setRoom] = useState('')

  return (
    <Div100vh>
      <div className={styles.joinOuterContainer}>
        <div className={styles.joinInnerContainer}>
          <h1 className={styles.heading}>Join</h1>
          <form>
            <input
              placeholder="Name"
              type="text"
              className={styles.joinInput}
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
            <input
              placeholder="Room"
              type="text"
              className={styles.joinInput}
              onChange={(e) => setRoom(e.target.value)}
              value={room}
            />
            <Link to={`/chat?name=${name}&room=${room}`}>
              <button className={styles.button} type="submit" disabled={!name || !room}>
                Sign In
              </button>
            </Link>
          </form>
        </div>
      </div>
    </Div100vh>
  )
}

export default Join
