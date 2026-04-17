export function logBody(req, res, next) {
    console.log(`BODY:`, JSON.stringify(req.body, null, 2));
    next()
}