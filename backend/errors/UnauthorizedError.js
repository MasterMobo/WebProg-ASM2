const APIError = require("./APIError");
class UnauthorizedError extends APIError {
    constructor(message) {
        super(message);
        this.code = 401;
    }
}

module.exports = UnauthorizedError;
