import { Utils, path, knownFolders } from '@nativescript/core';
// global.moduleMerge(common, exports);
export * from './common';
export class VideoSource {
    loadFromResource(name) {
        let videoURL = NSBundle.mainBundle.URLForResourceWithExtension(name, null);
        let player = new AVPlayerItem(videoURL);
        this.ios = player;
        return this.ios != null;
    }
    loadFromFile(filePath) {
        var fileName = Utils.isString(filePath) ? filePath.trim() : "";
        if (fileName.indexOf("~/") === 0) {
            fileName = path.join(knownFolders.currentApp().path, fileName.replace("~/", ""));
        }
        let videoURL = NSURL.fileURLWithPath(fileName);
        let player = new AVPlayerItem(videoURL);
        this.ios = player;
        return this.ios != null;
    }
    loadFromUrl(url) {
        let videoURL = NSURL.URLWithString(url);
        let player = new AVPlayerItem(videoURL);
        this.ios = player;
        return this.ios != null;
    }
    setNativeSource(source) {
        this.ios = source;
        return source != null;
    }
}
//# sourceMappingURL=index.ios.js.map