export function errorHandler (err, req, res, next) {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Server Problem!";
    res.status(statusCode).json({
        success:false,
        message,
    })
}

