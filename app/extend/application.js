const sonofs = require('sonofs');

const sfsClient = sonofs.createFileClient({
    tmpDir: '/Users/sunlu/Desktop/workspace/nodejs/data/tmp',
    registry: {
        port: 8123
    }
});

module.exports = {
    get sonofs() {
        return sfsClient;
    },
};