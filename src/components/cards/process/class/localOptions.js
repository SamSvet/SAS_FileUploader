export const localClassOptions = [{
    LABEL: "Mandatory checks",
    options: [{LABEL: 'Sex', VALUE: 'Sex - value should be in ("M","F")', ISFIXED: 1},
        {LABEL: 'Age', VALUE: 'Age - Age >= 10 and Age <= 16', ISFIXED: 1}
    ]
},
    {
        LABEL:"Optional checks",
        options: [{ LABEL: 'Height', VALUE: 'Height - Height >= 50.0 and Height <= 70.0', ISFIXED: 0 },
         { LABEL: 'Weight', VALUE: 'Weight - Weight >= 80.0 and Weight <= 120.0', ISFIXED:0}]
    },
]