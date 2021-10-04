export const TOUR_STEPS = [
    {
        target: '[tour="target-0"]',
        content: 'Добро пожаловать в SAS FileUploader.\n Это приложение позволяет загружать внешние списки',
        placement: 'bottom',
        disableBeacon: true
    },
    {
        target: '[tour="target-1"]',
        content: 'This is my first step',
        placement: 'bottom',
        disableBeacon: true
    },
    // {
    //     target: '[tour="target-1"]',
    //     content: 'This is my second step',
    //     placement: 'right',
    //     disableBeacon: true
    // }
]

export const TOUR_INITIAL_STATE = {
    run: false,
    continuous: true,
    loading: false,
    stepIndex: 0,
    steps: TOUR_STEPS,
    key: new Date(), // This field makes the tour to re-render when the tour is restarted
}