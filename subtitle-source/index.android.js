import { Utils, path, knownFolders } from '@nativescript/core';
export * from './common';
export class SubtitleSource {
    loadFromResource(name) {
        this.android = null;
        var res = Utils.android.getApplicationContext().getResources();
        if (res) {
            var UrlPath = "android.resource://org.nativescript.videoPlayer/R.raw." + name;
            this.android = UrlPath;
        }
        return this.android != null;
    }
    loadFromUrl(url) {
        this.android = null;
        this.android = url;
        return this.android != null;
    }
    loadFromFile(filePath) {
        var fileName = Utils.isString(filePath) ? filePath.trim() : "";
        if (fileName.indexOf("~/") === 0) {
            fileName = path.join(knownFolders.currentApp().path, fileName.replace("~/", ""));
        }
        this.android = fileName;
        return this.android != null;
    }
}
//# sourceMappingURL=index.android.js.map