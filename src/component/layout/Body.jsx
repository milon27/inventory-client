
export default function Body({ children }) {
    return (
        <div className="container my-3 " style={{ minHeight: '80vh' }}>
            <div className="row">
                <div className="col-md-12">
                    {children}
                </div>
            </div>
        </div>
    )
}
