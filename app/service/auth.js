const { Service } = require("egg");

class AuthService extends Service {
    verifyToken(accountId, token) {
        const { ctx } = this;
        return ctx.rpc.invoke('auth.verifyToken', [accountId, token]);
    }
}

module.exports = AuthService;