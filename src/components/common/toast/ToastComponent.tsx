
interface IToastComonentParameters {
    text: string,
    closeToast?: any
}


export default {
    successToast: ({ text, closeToast }: IToastComonentParameters) => {
        return (
            <div className="d-flex justify-content-start align-items-center" >
                <div style={{ 'fontSize': '25px' }}>
                    <i className="fas fa-check"></i>
                </div>
                <div className="ml-3">
                    <div>{text}</div>
                </div>
            </div>
        )
    },

    errorToast: ({ text, closeToast }: IToastComonentParameters) => {
        return (
            <div className="d-flex justify-content-start align-items-center">
                <div style={{ 'fontSize': '25px' }}>
                    <i className="fas fa-exclamation-triangle"></i>
                </div>
                <div className="ml-3">
                    <div className="font-weight-bold">Error!</div>
                    <div>{text}</div>
                </div>
            </div>
        )
    },

    infoToast: ({ text, closeToast }: IToastComonentParameters) => {
        return (
            <div className="d-flex justify-content-start align-items-center">
                <div style={{ 'fontSize': '25px' }}>
                    <i className="fas fa-info-circle"></i>
                </div>
                <div className="ml-3">
                    <div>{text}</div>
                </div>
            </div>
        )
    }
};



