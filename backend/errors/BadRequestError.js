const APIError = require("./APIError");
class BadRequestError extends APIError {
    constructor(message) {
        super(message);
        this.code = 400;
    }
}

module.exports = BadRequestError;
