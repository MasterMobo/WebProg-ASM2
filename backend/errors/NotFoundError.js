const APIError = require("./APIError");
class NotFoundError extends APIError {
    constructor(message) {
        super(message);
        this.code = 404;
    }
}

module.exports = NotFoundError;
