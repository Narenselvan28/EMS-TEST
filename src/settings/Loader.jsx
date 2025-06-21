const Loader = () => {
    return (
        <div className="flex space-x-3">
            <div className="w-5 h-5 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            <div className="w-5 h-5 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
            <div className="w-5 h-5 bg-blue-500 rounded-full animate-bounce"></div>
        </div>
    );
};

export default Loader;