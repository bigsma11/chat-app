import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import styles from './Join.module.css'
import cx from 'classnames'

function Join() {
  const [name, setName] = useState('')
  const [room, setRoom] = useState('')

  return (
    <div className={styles.joinOuterContainer}>
      <div className={styles.joinInnerContainer}>
        <h1 className={styles.heading}>Join</h1>
        <div>
          <input
            placeholder="Name"
            className={styles.joinInput}
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </div>
        <div>
          <input
            placeholder="Room"
            className={cx(styles.joinInput, styles.mt20)}
            onChange={(e) => setRoom(e.target.value)}
            value={room}
          />
        </div>
        <Link to={`/chat?name=${name}&room=${room}`}>
          <button
            className={cx(styles.button, styles.mt20)}
            type="submit"
            disabled={!name || !room}
          >
            Sign In
          </button>
        </Link>
      </div>
    </div>
  )
}

export default Join
