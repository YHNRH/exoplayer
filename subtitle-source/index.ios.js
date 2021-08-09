import { Utils, path, knownFolders } from '@nativescript/core';
// global.moduleMerge(common, exports);
export * from './common';
export class SubtitleSource {
    loadFromResource(name) {
        let subtitleUrl = NSBundle.mainBundle.URLForResourceWithExtension(name, null);
        let subtitles = NSString.stringWithContentsOfURLEncodingError(subtitleUrl, NSUTF8StringEncoding);
        this.ios = subtitles;
        return this.ios != null;
    }
    loadFromFile(filePath) {
        var fileName = Utils.isString(filePath) ? filePath.trim() : "";
        if (fileName.indexOf("~/") === 0) {
            fileName = path.join(knownFolders.currentApp().path, fileName.replace("~/", ""));
        }
        let subtitleUrl = NSURL.fileURLWithPath(fileName);
        let subtitles = NSString.stringWithContentsOfURLEncodingError(subtitleUrl, NSUTF8StringEncoding);
        this.ios = subtitles;
        return this.ios != null;
    }
    loadFromUrl(url) {
        let subtitleUrl = NSURL.URLWithString(url);
        let subtitles = NSString.stringWithContentsOfURLEncodingError(subtitleUrl, NSUTF8StringEncoding);
        this.ios = subtitles;
        return this.ios != null;
    }
}
//# sourceMappingURL=index.ios.js.map