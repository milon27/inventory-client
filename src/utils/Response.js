const Response = (success, title, desc, type) => {
    return { success: success, title: title, desc: desc, type: type }
}//Response(false/true, "message title" , "message description", "danger-bootstrap color")
export default Response;