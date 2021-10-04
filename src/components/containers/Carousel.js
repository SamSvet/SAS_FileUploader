import React, {useState} from 'react'
import "./carousel.css"
import Chevron from "../Chevron"


export const Carousel = React.forwardRef(({children, ...props}, ref) => {
    const [current, setCurrent] = useState(0)
    const childrenCount = children.length

    const cycleIncrement = (prevVal, incVal, overallCnt) => {
        return (prevVal + incVal) >= 0 ? Math.abs( (prevVal + incVal) % overallCnt ) : overallCnt-1
    }

    return (
        <section className={`${props.className}`}>
            <div className={'d-flex justify-content-between ' }>
                <button className="btn btn-sm no-outline align-self-center button-chevron"  onClick={e => setCurrent((prev) => cycleIncrement(prev, -1, childrenCount))}>
                    <Chevron className={'slider-chevron'} style={{transform: 'rotate(180deg)'}}/>
                </button>
                <div ref={ref} className={'d-flex justify-content-center align-items-start container'} style={{height: props.maxHeight+'px'}}>
                    {children.map((child, idx) =>
                        <div key={idx} className={`slide ${idx===current ? 'active' : ''}`}>
                            {/*{idx === current && child}*/}
                            {child}
                            {/*<CarouselItem isActive={idx === current}>{child}</CarouselItem>*/}
                        </div>
                    )}
                </div>
                <button className="btn btn-sm no-outline align-self-center button-chevron" onClick={e => setCurrent((prev) => cycleIncrement(prev, 1, childrenCount))}>
                    <Chevron className={'slider-chevron '} />
                </button>
            </div>

            <div className={'d-flex justify-content-center align-items-center'}>
                {children.map((child, idx) =>
                    <button className={`carousel-pages float-center ${idx===current ? 'active' : ''}`} key={idx} onClick={e => setCurrent(idx)}/>
                )}
            </div>
        </section>
    )
}
)