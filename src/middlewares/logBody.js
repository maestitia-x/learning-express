export function logBody(req, res, next) {
    console.log(`BODY: ${req.body}`);
    next()
}