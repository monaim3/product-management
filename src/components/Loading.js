const Loading = () => {
    return(
        <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#EFF1F3" }}> <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 mx-auto mb-4" style={{ borderColor: "#4E6E5D" }}></div>
        <p className="text-lg font-medium" style={{ color: "#4E6E5D" }}>Loading product...</p> </div> </div>
    )
}
export default Loading;