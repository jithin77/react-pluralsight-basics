import React  from 'react'

export default function Button(props) {
    const incrementer = () => props.onClickHandler(props.increment)
    return (
        <button onClick= {incrementer}>{props.increment}</button>
    )
}

