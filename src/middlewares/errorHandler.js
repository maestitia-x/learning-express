export function errorHandler (err, req, res, next) {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Sunucu Hatasi";
    res.status(statusCode).json({
        success:false,
        message,
    })
}

