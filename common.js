import * as videoSource from './video-source';
import * as subtitleSource from './subtitle-source';
import { Utils, View, Property, booleanConverter, ImageSource } from '@nativescript/core';
function onSrcPropertyChanged(view, oldValue, newValue) {
    const video = view;
    let value = newValue;
    if (Utils.isString(value)) {
        value = value.trim();
        video.videoSource = null;
        video['_url'] = value;
        video.isLoadingProperty = true;
        if (Utils.isFileOrResourcePath(value)) {
            video.videoSource = videoSource.fromFileOrResource(value);
            video.isLoadingProperty = false;
        }
        else {
            if (video['_url'] === value) {
                video.videoSource = videoSource.fromUrl(value);
                video.isLoadingProperty = false;
            }
        }
    }
    else if (value instanceof videoSource.VideoSource) {
        video.videoSource = value;
    }
    else {
        video.videoSource = videoSource.fromNativeSource(value);
    }
}
function onSubtitlesPropertyChanged(view, oldValue, newValue) {
    const video = view;
    if (Utils.isString(newValue)) {
        let value = newValue.trim();
        video.subtitleSource = null;
        if (Utils.isFileOrResourcePath(value)) {
            video.subtitleSource = subtitleSource.fromFileOrResource(value);
        }
        else {
            video.subtitleSource = subtitleSource.fromUrl(value);
        }
    }
}
function onImgSrcPropertyChanged(view, oldValue, newValue) {
    const video = view;
    let value = newValue;
    if (Utils.isString(value)) {
        value = value.trim();
        video['_url'] = value;
        video.isLoadingProperty = true;
        if (Utils.isFileOrResourcePath(value)) {
            video.imageSource = ImageSource.fromFileOrResourceSync(value);
            video.isLoadingProperty = false;
        }
        else {
            if (video['_url'] === value) {
                video.imageSource = ImageSource.fromUrl(value);
                video.isLoadingProperty = false;
            }
        }
    }
    else if (value instanceof ImageSource) {
        video.imageSource = value;
    }
    else {
        video.imageSource = new ImageSource(value);
    }
}
/**
 * Video aspect/fill handling
 */
export var VideoFill;
(function (VideoFill) {
    VideoFill["default"] = "default";
    VideoFill["aspect"] = "aspect";
    VideoFill["aspectFill"] = "aspectFill";
    VideoFill["fill"] = "fill";
})(VideoFill || (VideoFill = {}));
export class Video extends View {
    constructor() {
        super(...arguments);
        this.srcType = 0; /// video source file type
        this.imgType = 1;
        this.autoplay = false; /// set true for the video to start playing when ready
        this.controls = true; /// set true to enable the media player's playback controls
        this.loop = false; /// whether the video loops the playback after extends
        this.muted = false;
        this.fill = VideoFill.default;
        this.detectChapters = false;
        this.backgroundAudio = false;
        this.encryptionKey = null;
        this.encryptionIV = null;
        this.encryption = '';
    }
}
Video.finishedEvent = 'finished';
Video.playbackReadyEvent = 'playbackReady';
Video.playbackStartEvent = 'playbackStart';
Video.seekToTimeCompleteEvent = 'seekToTimeComplete';
Video.currentTimeUpdatedEvent = 'currentTimeUpdated';
Video.chaptersLoadedEvent = 'chaptersLoaded';
/**
 * ignore modifying iOS AVAudioSession category change on initialization
 * by default, auto changes to: AVAudioSessionCategoryPlayAndRecord
 */
Video.iosIgnoreAudioSessionChange = false;
Video.IMAGETYPEMONO = 1;
Video.IMAGETYPESTEREOTOPBOTTOM = 2;
Video.IMAGETYPESTEREOLEFTRIGHT = 3;
export const encryptionKeyProperty = new Property({
    name: 'encryptionKey',
});
encryptionKeyProperty.register(Video);
export const encryptionIVProperty = new Property({
    name: 'encryptionIV',
});
encryptionIVProperty.register(Video);
export const encryptionProperty = new Property({
    name: 'encryption',
});
encryptionProperty.register(Video);
export const srcProperty = new Property({
    name: 'src',
    valueChanged: onSrcPropertyChanged,
});
srcProperty.register(Video);
export const srcTypeProperty = new Property({
    name: 'srcType',
});
srcTypeProperty.register(Video);
export const imgSrcProperty = new Property({
    name: 'imgSrc',
    valueChanged: onImgSrcPropertyChanged,
});
imgSrcProperty.register(Video);
export const imgTypeProperty = new Property({
    name: 'imgType',
});
imgTypeProperty.register(Video);
export const subtitlesProperty = new Property({
    name: 'subtitles',
    valueChanged: onSubtitlesPropertyChanged,
});
subtitlesProperty.register(Video);
export const subtitleSourceProperty = new Property({
    name: 'subtitleSource',
});
subtitleSourceProperty.register(Video);
export const videoSourceProperty = new Property({
    name: 'videoSource',
});
videoSourceProperty.register(Video);
export const imageSourceProperty = new Property({
    name: 'imageSource',
});
imageSourceProperty.register(Video);
export const isLoadingProperty = new Property({
    name: 'isLoading',
    valueConverter: booleanConverter,
});
isLoadingProperty.register(Video);
export const observeCurrentTimeProperty = new Property({
    name: 'observeCurrentTime',
    valueConverter: booleanConverter,
});
observeCurrentTimeProperty.register(Video);
export const autoplayProperty = new Property({
    name: 'autoplay',
    valueConverter: booleanConverter,
});
autoplayProperty.register(Video);
export const controlsProperty = new Property({
    name: 'controls',
    valueConverter: booleanConverter,
});
controlsProperty.register(Video);
export const loopProperty = new Property({
    name: 'loop',
    valueConverter: booleanConverter,
});
loopProperty.register(Video);
export const mutedProperty = new Property({
    name: 'muted',
    valueConverter: booleanConverter,
});
mutedProperty.register(Video);
export const backgroundAudioProperty = new Property({
    name: 'backgroundAudio',
    valueConverter: booleanConverter,
});
backgroundAudioProperty.register(Video);
export const fillProperty = new Property({
    name: 'fill',
});
fillProperty.register(Video);
//# sourceMappingURL=common.js.map