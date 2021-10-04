import React, {useEffect, useReducer } from "react"
import Joyride, { ACTIONS, EVENTS, STATUS } from "react-joyride"
import {tourReducer} from "./tourReducer";
import {TOUR_INITIAL_STATE} from "./tourSteps"
import {tourActionTypes} from "./tourActionTypes"

export const Question = ({clickCount}) => {
    const [tourState, dispatch] = useReducer(tourReducer, TOUR_INITIAL_STATE)

    useEffect(() => {
        if (clickCount>0) {
            // document.querySelectorAll('[id^="react-joyride-portal"]').forEach(element => element.remove())
            // document.querySelectorAll('[id^="react-joyride-step-"]').forEach(element => element.remove())
            dispatch({ type: tourActionTypes.RESTART })
        }
    }, [clickCount])

    useEffect(() => {
        console.log('JoyRide mount')
    }, [])

    useEffect(() => {
        console.log('render')
    } )

    // const steps = useMemo(() => {
    //     return [
    //         {
    //             target: '[tour="target-1"]',
    //             content: 'This is my first step',
    //             placement: 'bottom'
    //         },
    //         {
    //             target: '[tour="target-1"]',
    //             content: 'This is my second step',
    //             placement: 'right'
    //         }
    //     ]
    // }, [isOpen])



    const tourCallBack = (data) => {
        const {action, index, status, type} = data
        if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status) || action === ACTIONS.CLOSE){
            dispatch({type: tourActionTypes.STOP})
            if (!(STATUS.RUNNING === status && action === ACTIONS.CLOSE)){
                // let el1 = document.querySelectorAll('[id^="react-joyride-portal"]')
                // let el2 = document.querySelectorAll('[id^="react-joyride-step-"]')
                // el1.forEach(element => element.remove())
                // el2.forEach(element => element.remove())
                document.querySelectorAll('[id^="react-joyride-portal"]').forEach(element => element.remove())
                document.querySelectorAll('[id^="react-joyride-step-"]').forEach(element => element.remove())
            }
        } else if (type === EVENTS.STEP_AFTER || type === EVENTS.TARGET_NOT_FOUND){
            dispatch({type: tourActionTypes.NEXT_OR_PREV, payload: { stepIndex: index + (action === ACTIONS.PREV ? -1 : 1)} })
        }
    }

    return (
        // <>
        //     <Joyride
        //         run={run}
        //         callback={onRequestClose}
        //         steps={steps}
        //         continuous={true}
        //         scrollToFirstStep={true}
        //         //showSkipButton={true}
        //         showProgress={true}
        //         locale={{next:'->',
        //             back: '<-',
        //             skip: 'Close',
        //             last: 'End'
        //         }}
        //         styles = {{
        //             tooltipContainer: {textAlign: 'left'},
        //             buttonNext: {backgroundColor: '#0d6efd'},
        //             buttonBack: {marginRight: 10, color: '#0d6efd'},
        //         }}
        //     />
        // </>
        <>
            {/*<button className={'btn btn-primary'} onClick={() => dispatch({ type: tourActionTypes.RESTART })}>*/}
            {/*    Start Tour*/}
            {/*</button>*/}
            <Joyride
                {...tourState}
                callback={tourCallBack}
                showProgress={true}
                showSkipButton={true}
                locale={{
                    next:'->',
                   back: '<-',
                    skip: 'Close',
                    last: 'End'
                }}
                styles = {{
                    tooltipContainer: {textAlign: 'left'},
                    buttonNext: {backgroundColor: '#0d6efd'},
                    buttonBack: {marginRight: 10, color: '#0d6efd'},
                }}
            />
        </>
    )

}