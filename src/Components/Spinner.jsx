export function SpinnerWithMessage(props) {
    return (
        <div className={'spinner-with-message'}>
            <svg width="24" height="24" stroke="#000" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <g className={'spinner'}>
                    <circle cx="12" cy="12" r="9.5" fill="none" stroke-width="3"></circle>
                </g>
            </svg>
            {props.message ? <p>{props.message}</p> : ''}
        </div>
    )
}

export function SpinnerSmall() {
    return (
        <svg width="14"
             height="14"
             stroke="#000"
             viewBox="0 0 24 24"
             className={'inline-block'}
             xmlns="http://www.w3.org/2000/svg">
            <g className={'spinner'}>
                <circle cx="12" cy="12" r="9.5" fill="none" stroke-width="3"></circle>
            </g>
        </svg>
    )
}
