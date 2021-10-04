import React from "react"
import Datetime from "react-datetime"
import "react-datetime/css/react-datetime.css"
import moment from "moment"
import {FloatLabelInput} from "./FloatLabelInput"

export const DateTimePicker = ({...props}) => {
    function renderInput(innerProps) {
        // function test(e){
        //   console.log(innerProps, e)
        //   innerProps.onClick(e)
        // }
        // return (
        //     <div className="form-label-group">
        //         <input {...innerProps}
        //                className="form-control-plaintext border-dark border-left-0 border-right-0 border-top-0"
        //                placeholder={innerProps.label}
        //                name={innerProps.name}
        //                // onChange={innerProps.onChange}
        //                // onClick={innerProps.onClick}
        //         />
        //         <label htmlFor={innerProps.id}>{innerProps.label}</label>
        //     </div>
        // )
        return (
            <FloatLabelInput props={innerProps} name={innerProps.name} title={innerProps.label} onChange={innerProps.onChange}/>
        )
    }

    function renderDay(props, currentDate, selectedDate) {
        if (currentDate.isSame(selectedDate)) {
            return <td {...props}
                       style={{
                           backgroundColor: '#212529',
                           color: '#fff',
                           textShadow: '0 -1px 0 rgba(0, 0, 0, 0.25)'
                      }}
            >{currentDate.date()}</td>
        }
        if (currentDate.isSame(moment(new Date().setHours(0, 0, 0, 0)))) {
            return <td {...props} className={'rdtDay'}
                       style={{fontWeight: 'bold'}}
            >{currentDate.date()}</td>
        }
        return <td {...props}>{currentDate.date()}</td>
    }

    function renderMonth(props, month, year, selectedDate) {
        if (!selectedDate && month + 1 == moment(new Date()).format('M')) {
            return <td {...props}
                       style={{
                           backgroundColor: '#212529',
                           color: '#fff',
                           textShadow: '0 -1px 0 rgba(0, 0, 0, 0.25)'
                       }}
            >{moment(month + 1, 'M').format('MMMM').substring(0, 3)}</td>
        }
        if (selectedDate && month + 1 == selectedDate.format('M')) {
            return <td {...props}
                       style={{
                           backgroundColor: '#212529',
                           color: '#fff',
                           textShadow: '0 -1px 0 rgba(0, 0, 0, 0.25)'
                       }}
            >{moment(month + 1, 'M').format('MMMM').substring(0, 3)}</td>
        }
        return <td {...props}>{moment(month + 1, 'M').format('MMMM').substring(0, 3)}</td>
    }

    function renderYear(props, year, selectedDate) {
        if (!selectedDate && year == moment(new Date()).format('YYYYYY')) {
            return <td {...props} style={{
                backgroundColor: '#212529',
                color: '#fff',
                textShadow: '0 -1px 0 rgba(0, 0, 0, 0.25)'
            }}>{year}</td>
        }
        if (selectedDate && year == selectedDate.format('YYYYYY')) {
            return <td {...props} style={{
                backgroundColor: '#212529',
                color: '#fff',
                textShadow: '0 -1px 0 rgba(0, 0, 0, 0.25)'
            }}>{year}</td>
        }
        return <td {...props}>{year}</td>
    }

    return (
        <Datetime
            renderInput={renderInput}
            renderDay={renderDay}
            renderMonth={renderMonth}
            renderYear={renderYear}
            // inputProps={{id: props.id, label: props.label, name: props.name, onClick: props.callbackOnClick, onChange: props.callbackOnChange}}
            inputProps={{id: props.id, label: props.label, name: props.name, onChange: props.onChange}}
            {...props}
        />
    )
}