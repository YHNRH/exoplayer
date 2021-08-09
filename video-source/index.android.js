import { Application, Utils, path, knownFolders } from '@nativescript/core';
export * from './common';
export class VideoSource {
    loadFromResource(name) {
        this.android = null;
        const res = Utils.android.getApplicationContext().getResources();
        if (res) {
            const packageName = Application.android.context.getPackageName();
            this.android = `android.resource://${packageName}/R.raw.${name}`;
        }
        return this.android != null;
    }
    loadFromUrl(url) {
        this.android = null;
        this.android = url;
        return this.android != null;
    }
    loadFromFile(filePath) {
        let fileName = Utils.isString(filePath) ? filePath.trim() : "";
        if (fileName.indexOf("~/") === 0) {
            fileName = path.join(knownFolders.currentApp().path, fileName.replace("~/", ""));
        }
        this.android = fileName;
        return this.android != null;
    }
    setNativeSource(source) {
        this.android = source;
        return source != null;
    }
    get height() {
        if (this.android && typeof this.android.getHeight === 'function') {
            return this.android.getHeight();
        }
        return NaN;
    }
    get width() {
        if (this.android && typeof this.android.getWidth === 'function') {
            return this.android.getWidth();
        }
        return NaN;
    }
}
//# sourceMappingURL=index.android.js.map