"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.knownRequestHandler = void 0;
const knownRequestHandler = (error) => {
    const { code, meta } = error;
    console.log({ code, meta });
    if (code === 'P2002') {
        const result = {
            path: String(meta === null || meta === void 0 ? void 0 : meta.modelName),
            message: `${meta === null || meta === void 0 ? void 0 : meta.target} must be unique`,
        };
        return result;
    }
    else if (error.code === 'P2003') {
        if (error.message.includes('`prisma.course.delete()` invocation')) {
            const result = {
                path: meta === null || meta === void 0 ? void 0 : meta.modelName,
                message: 'Delete failed',
            };
            return result;
        }
    }
    else if (error.code === 'P2025') {
        const result = {
            path: '',
            message: (meta === null || meta === void 0 ? void 0 : meta.cause) || 'Record not found!',
        };
        return result;
    }
    return { path: '', message: '' };
};
exports.knownRequestHandler = knownRequestHandler;
