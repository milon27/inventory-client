
export default function Input({ title, name, value, onChange, type = "text" }) {
    return (
        <>
            <label htmlFor="">{title}:</label>
            <input type={type}
                className="form-control"
                name={name}
                placeholder={title}
                value={value}
                onChange={onChange}
                required
            />
        </>
    )
}
