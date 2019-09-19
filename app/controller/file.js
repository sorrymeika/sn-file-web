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

            if (ctx.query.size && /^(\d+)x(\d+)$/.test(ctx.query.size)) {
                const width = Number(RegExp.$1);
                const height = Number(RegExp.$2);
                if (result.mime == 'image/jpeg' || result.mime == 'image/png') {
                    ctx.body = await sharp(result.buffer)
                        .resize(width, height)
                        .toBuffer();
                    return;
                }
            }
            ctx.body = result.buffer;
        } catch (e) {
            console.error(e);
            ctx.body = "";
        }
    }
}

module.exports = FileController;