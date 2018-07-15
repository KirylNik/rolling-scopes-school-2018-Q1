import React from 'react'

export default function Comment({comment}) {

    return (
        <li key = {comment.id}>
            <h3>
            {comment.user}
            </h3>
            {comment.text}
        </li>
    )
}