import React from 'react'
type ButtonTypes = "primary" | "secondary" | "alert"
interface ButtonProps {
    title:string,
    icon:string,
    type?:ButtonTypes
}

function Button(props: ButtonProps) {
    const {
        title,  
        icon,
        type = "primary"
    } = props

    return (
        <button>
            {title}
        </button>
    )
}

export default Button
