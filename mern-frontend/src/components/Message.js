import React from 'react'

// Credit @ https://www.youtube.com/watch?v=7_fo3nrqiY8

const getStyle = (props)=>{
    let baseClass = "alert ";
    if(props.message.msgError) // if the message is an error, display with this specific Bootstrap class
        baseClass = baseClass + "alert-danger";
    else
        baseClass = baseClass + "alert-primary";
    return baseClass + " text-center";
}

const Message = props=>{
    return(
        <div className={getStyle(props)} role="alert">
            {props.message.msgBody}
        </div>
    )
}

export default Message;