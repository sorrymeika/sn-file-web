const { Service } = require("egg");

class TestService extends Service {
    async test(...args) {
        const { ctx } = this;
        return ctx.rpc.invoke('auth.login', args);
    }
}

module.exports = TestService;