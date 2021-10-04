import React from "react"


export const CarouselItem = ({children, isActive}) => {
    if (!isActive) return null
    return(
        <>
            {children}
        </>
   )
}