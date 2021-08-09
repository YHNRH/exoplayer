import { Utils } from '@nativescript/core';
// This is used for definition purposes only, it does not generate JavaScript for it.
import { VideoSource } from '.';
export function fromResource(name) {
    const video = new VideoSource();
    return video.loadFromResource(name) ? video : null;
}
export function fromFile(path) {
    const video = new VideoSource();
    return video.loadFromFile(path) ? video : null;
}
export function fromNativeSource(source) {
    const video = new VideoSource();
    return video.setNativeSource(source) ? video : null;
}
export function fromUrl(url) {
    const video = new VideoSource();
    return video.loadFromUrl(url) ? video : null;
}
export function fromFileOrResource(path) {
    if (!isFileOrResourcePath(path)) {
        throw new Error("Path \"" + "\" is not a valid file or resource.");
    }
    if (path.indexOf(Utils.RESOURCE_PREFIX) === 0) {
        return fromResource(path.substr(Utils.RESOURCE_PREFIX.length));
    }
    return fromFile(path);
}
export function isFileOrResourcePath(path) {
    return Utils.isFileOrResourcePath(path);
}
//# sourceMappingURL=common.js.map