module.exports = app => {
    const { router, controller } = app;
    router.get('/test', controller.test.info);
    router.get('/file', controller.file.file);
    router.post('/file/upload', controller.file.upload);
};