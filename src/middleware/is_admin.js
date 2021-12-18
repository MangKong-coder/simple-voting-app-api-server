export default async (req, res, next) => {
    if (!req.admin) {
        const error = new Error('Not an admin');
        error.statusCode = 403;
        throw error;
    }
    next()
}