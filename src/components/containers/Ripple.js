import React, {useEffect, useState} from 'react'
import {RippleContainer} from "./RippleContainer"

export const Ripple = ({duration=850, backgroundColor="#ffffff"}) => {
    const [rippleArray, setRippleArray] = useState([])

    useEffect(() => {
        let bounce
        if (rippleArray.length>0){
            window.clearTimeout(bounce)
            bounce = window.setTimeout(() => {
                setRippleArray([])
                window.clearTimeout(bounce)
            }, duration*4)
        }
        return () => window.clearTimeout(bounce)
    }, [rippleArray.length, duration])

    const addRipple = (event) => {
        const rippleContainer = event.currentTarget.getBoundingClientRect()

        const size = rippleContainer.width > rippleContainer.height
            ? rippleContainer.width
            : rippleContainer.height

        const x = event.clientX - rippleContainer.left - size / 2
        const y = event.clientY - rippleContainer.top - size / 2

        const newRipple = {x, y, size, color: backgroundColor, duration: duration+'ms'}
        setRippleArray([...rippleArray, newRipple])
    }

    return(
        <RippleContainer onMouseDown={addRipple} >
            {rippleArray.length>0 &&
            rippleArray.map((ripple, index) =>
                <span
                    key={"span" + index}
                    style={{top: ripple.y, left: ripple.x, width: ripple.size, height: ripple.size,
                        backgroundColor: ripple.color, animationDuration: ripple.duration }}
                />
            )}
        </RippleContainer>
    )
}