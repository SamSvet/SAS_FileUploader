export const localShoesOptions = [{
    LABEL: "Mandatory checks",
    options: [{LABEL: 'Product', VALUE: 'Product - value should be in ("Boot","Sandal","Slipper")', ISFIXED: 1},
        {LABEL: 'Stores', VALUE: 'Stores - Stores >= 1 and Age <= 100', ISFIXED: 1}
    ]
},
    {
        LABEL:"Optional checks",
        options: [{ LABEL: 'Region', VALUE: 'Region - value should be in ("Africa","Western Europe","Pacific")', ISFIXED: 0 },
         { LABEL: 'Returns', VALUE: 'Returns - Returns >= 100.0 and Returns <= 10000.0', ISFIXED:0}]
    },
]