module.exports = options => {
    const { excludes } = options;
    return async function auth(ctx, next) {
        const atk = ctx.cookies.get('atk', {
            signed: false
        });
        const aid = ctx.cookies.get('aid', {
            signed: false
        });
        const url = ctx.url;
        if (excludes.some((exclude) => (typeof exclude === 'string' ? url.indexOf(exclude) !== -1 : exclude.test(url)))) {
            await next();
            return;
        }

        const res = await ctx.service.auth.verifyToken(aid, atk);
        if (res && res.success && res.role == 1) {
            await next();
        } else {
            ctx.body = { success: false, code: 10002, message: '账号无权限' };
        }
    };
};
