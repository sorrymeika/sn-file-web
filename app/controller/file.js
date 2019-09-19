const { Controller } = require("egg");
const sharp = require("sharp");

class FileController extends Controller {
    async upload() {
        const { ctx } = this;
        const stream = await ctx.getFileStream();
        const result = await ctx.sonofs.upload(stream.mime, stream);

        console.log(result);

        ctx.body = {
            success: true,
            fileName: result
        };
    }

    async file() {
        const { ctx } = this;
        try {
            const result = await ctx.sonofs.getFile(ctx.query.name);
            ctx.type = result.mime;

            let buffer = result.buffer;

            if (result.mime == 'image/jpeg' || result.mime == 'image/png') {
                let width;
                let height;
                let quality;
                let shouldHandle = false;
                // enum { 0: '仅原格式为jpg才压缩', 1: '导出jpeg', 2: '支持webp的导出webp，否则导出jpg' }
                let type = 0;

                if (ctx.query.o && /(?:^|,)(\d+)(?:-(\d))$/.test(ctx.query.o)) {
                    quality = Number(RegExp.$1);
                    type = Number(RegExp.$2);
                    shouldHandle = true;
                }
                if (ctx.query.o && /(?:^|,)(\d+)x(\d+)(?:$|,)/.test(ctx.query.o)) {
                    width = Number(RegExp.$1);
                    height = Number(RegExp.$2);
                    shouldHandle = true;
                }
                if (shouldHandle) {
                    let sp = sharp(result.buffer);
                    if (width && height) {
                        sp = sp.resize(width, height);
                    }
                    if (quality) {
                        const isWebP = type == 2 || (type == 0 && result.mime == 'image/jpeg');
                        if (type == 1 || (isWebP && !ctx.accepts().includes('image/webp'))) {
                            sp = sp.jpeg({
                                quality
                            });
                            ctx.type = 'image/jpeg';
                        } else if (isWebP) {
                            sp = sp.webp({
                                quality
                            });
                            ctx.type = 'image/webp';
                        }
                    }
                    buffer = await sp.toBuffer();
                }
            }
            ctx.append('Cache-Control', 'max-age=' + (24 * 60 * 60 * 365));
            ctx.body = buffer;
        } catch (e) {
            console.error(e);
            ctx.body = "";
        }
    }
}

module.exports = FileController;