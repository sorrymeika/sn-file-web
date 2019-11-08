exports.keys = 'cookie-secret-key';

exports.logger = {
    level: 'INFO',
    dir: '/data/logs/sn-file-web'
};

exports.security = {
    domainWhiteList: [
        'http://localhost:10020',
        'http://localhost:10021',
        'http://localhost:10022',
        'http://localhost:10023',
        'http://localhost:10100'
    ],
    csrf: {
        enable: false
    }
};

/**
 * CORS middleware
 *
 * @param {Object} [options]
 *  - {String|Function(ctx)} origin `Access-Control-Allow-Origin`, default is request Origin header
 *  - {String|Array} allowMethods `Access-Control-Allow-Methods`, default is 'GET,HEAD,PUT,POST,DELETE,PATCH'
 *  - {String|Array} exposeHeaders `Access-Control-Expose-Headers`
 *  - {String|Array} allowHeaders `Access-Control-Allow-Headers`
 *  - {String|Number} maxAge `Access-Control-Max-Age` in seconds
 *  - {Boolean} credentials `Access-Control-Allow-Credentials`
 *  - {Boolean} keepHeadersOnError Add set headers to `err.header` if an error is thrown
 * @return {Function} cors middleware
 * @api public
 */
exports.cors = {
    credentials: true,
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS',
};

// exports.middleware = ['gzip'];
// exports.gzip = {
//     threshold: 2048,
// };

exports.auth = {
    registry: {
        port: 3006
    }
};

