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
        var headers = new NSMutableDictionary();
        headers.setObjectForKey("Bearer ceyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJLNzFFZFNfTElRcGpYNW55TEs3TnRaS2c1MFMtaDB0NU1fR184ZXJDVlFnIn0.eyJleHAiOjE2MjkxODc0MjksImlhdCI6MTYyOTE4NTYyOSwianRpIjoiMjQxNmFiYzgtYjE0OC00N2M2LWIzMmEtNjI3ODFiYWFhMWFjIiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo4MDg4L2F1dGgvcmVhbG1zL2ludHJhZmFiIiwic3ViIjoiZmE2NDlmNTEtZTU0Ny00NWExLWJhOTUtZDY3NjA1NmNhMTFmIiwidHlwIjoiQmVhcmVyIiwiYXpwIjoiaWZzdy1tZWRpYXRla2EiLCJzZXNzaW9uX3N0YXRlIjoiMDVlZjYyMDgtNGI4Yy00MDg3LTk4NjktZDA0NTExYjA5ZDkwIiwiYWNyIjoiMSIsInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJkZWZhdWx0LXJvbGVzLWludHJhZmFiIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiaWZzdy1tZWRpYXRla2EiOnsicm9sZXMiOlsidXNlciJdfX0sInNjb3BlIjoicHJvZmlsZSBlbWFpbCIsImFwcCI6Imlmc3dfbXRrIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsIm5hbWUiOiJBbm9ueW1vdXMgVXNlciIsInByZWZlcnJlZF91c2VybmFtZSI6ImRldmVsQGluZmJkZXYudGVjaCIsImdpdmVuX25hbWUiOiJBbm9ueW1vdXMiLCJmYW1pbHlfbmFtZSI6IlVzZXIiLCJlbWFpbCI6ImRldmVsQGluZmJkZXYudGVjaCJ9.EC3y4v0CCFC_BiFlKblXkN-nClAqM1pHa0D2uk59pqQpXUF9xSpjXdCAenTmoIJTI9tiQkbm0sGKKsDlVJrd-Kd7uT8kQMHrkJwDDOWZjA2rJp-cpstHk1WsQU9uHHuQDrQQzLLWQI6EZZQE9p31PGelz3iSS2OLvjZFJ1P6b374LuH9RvsGTRlNyA_7DTpLC0qkXOModdGTPWaTRLB_mmwiirnmbirmZUr_aB8hudwJEyCjyXY0SEftlGvplEjq803NbEkQktHGvXPcHtxF_rtvOiSSaKH3vryoWKrvcRv4u9wZTWfTXFyo0BK829csC0KkOOarebkJDLszXY6Vcw"
                ,"Authorization");
        var options = NSDictionary.dictionaryWithDictionary({
            "AVURLAssetHTTPHeaderFieldsKey": headers
        });
        var asset = AVURLAsset.URLAssetWithURLOptions(videoURL, headers);
        var item = AVPlayerItem.playerItemWithAsset(asset);
        console.log("HEADERS? " + headers);
        let player = item;//new AVPlayerItem(videoURL);
        this.ios = player;
        return this.ios != null;
    }
    setNativeSource(source) {
        this.ios = source;
        return source != null;
    }
}
//# sourceMappingURL=index.ios.js.map