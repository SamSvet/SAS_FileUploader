export const customStyles = {
    container: (provided) => ({
        ...provided,
        width: 300,
        outline: 'none'
    }),
    control: (provided) => ({
        ...provided,
        backgroundColor: '#f8f9fa',
        //border: '1px solid lightgray',
        border: 0,
        // This line disable the blue border
        boxShadow: 'none',
        "&:hover": {
            borderColor: '#343a40',
            border: '1px solid',
            backgroundColor: '#343a40',
            color: "white"
        },
    }),
    input: (provided) => ({
        ...provided,
        color: "inherit"
    }),
    placeholder: (provided) => {
        return {
            ...provided,
            color: "inherit"
        }
    },
    singleValue: (provided) => {
        return {
            ...provided,
            color: "inherit",
        }
    },
/*    multiValueRemove: (styles, { data }) => ({
        ...styles,
        color: '#343a40',
    }),*/
    dropdownIndicator: (provided) => ({
        //...provided,
        color: "inherit"
    }),
    option: (styles, {isDisabled, isFocused}) => {
        return {
            ...styles,
            backgroundColor: isFocused ? '#f8f9fa' : null,
            color: 'dark',
            cursor: isDisabled ? 'not-allowed' : 'default',
            ':active': {
                ...styles[':active'],
                backgroundColor: '#343a40',
                color: 'white'
            },
        };
    },
    multiValue: (base, state) => {
        return state.data.ISFIXED ? {...base, backgroundColor: "gray"} : base
    },
    multiValueLabel: (base, state) => {
        return state.data.ISFIXED ? {...base, fontWeight: "bold", paddingRight: 6} : base
    },
    multiValueRemove: (base, state) => {
        return state.data.ISFIXED ? {...base, display: "none"} : {...base, color: '#343a40'}
    }
}

export const errorStyles = {
    control: (provided) => ({
    ...provided,
    backgroundColor: '#f8f9fa',
    border: '1px solid #dc3545',
    boxShadow: 'none',
    "&:hover": {
        borderColor: '#343a40',
        border: '1px solid',
        backgroundColor: '#343a40',
        color: "white"
    }})
}

export const widthStyles = {
    container: (provided) => ({
        ...provided,
        width: "100%",
        outline: 'none'
    })
}

export const groupStyles = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
}

export const groupBadgeStyles = {
    backgroundColor: '#EBECF0',
    borderRadius: '2em',
    color: '#172B4D',
    display: 'inline-block',
    fontSize: 12,
    fontWeight: 'normal',
    lineHeight: 1,
    minWidth: 1,
    padding: '0.16666666666667em 0.5em',
    textAlign: 'center'
}