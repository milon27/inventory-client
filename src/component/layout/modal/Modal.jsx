
export default function Modal({ id, title, btnTitle, callback, resetInput, children }) {

    const { setInput, initState } = resetInput;

    const refreshInput = () => {
        setInput(initState);
    }

    return (
        <div className="modal fade" id={id} tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">{title}</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={refreshInput}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        {children}
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={refreshInput} >Close</button>
                        <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={callback}>{btnTitle}</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
