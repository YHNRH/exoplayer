import { View, Property, EventData } from '@nativescript/core';
export interface VideoEventData extends EventData {
    data?: any;
}
/**
 * Video aspect/fill handling
 */
export declare enum VideoFill {
    default = "default",
    aspect = "aspect",
    aspectFill = "aspectFill",
    fill = "fill"
}
export declare class Video extends View {
    static finishedEvent: string;
    static playbackReadyEvent: string;
    static playbackStartEvent: string;
    static seekToTimeCompleteEvent: string;
    static currentTimeUpdatedEvent: string;
    static chaptersLoadedEvent: string;
    /**
     * ignore modifying iOS AVAudioSession category change on initialization
     * by default, auto changes to: AVAudioSessionCategoryPlayAndRecord
     */
    static iosIgnoreAudioSessionChange: boolean;
    _emit: any;
    src: string;
    srcType: number;
    imgSrc: string;
    imgType: number;
    subtitles: string;
    subtitleSource: string;
    observeCurrentTime: boolean;
    autoplay: boolean;

    token: String;

    controls: boolean;
    loop: boolean;
    muted: boolean;
    fill: VideoFill;
    detectChapters: boolean;
    backgroundAudio: boolean;
    encryptionKey: string;
    encryptionIV: string;
    encryption: string;
    static IMAGETYPEMONO: number;
    static IMAGETYPESTEREOTOPBOTTOM: number;
    static IMAGETYPESTEREOLEFTRIGHT: number;
}
export declare const encryptionKeyProperty: Property<Video, any>;
export declare const encryptionIVProperty: Property<Video, any>;
export declare const encryptionProperty: Property<Video, any>;
export declare const srcProperty: Property<Video, any>;
export declare const srcTypeProperty: Property<Video, any>;
export declare const imgSrcProperty: Property<Video, any>;
export declare const imgTypeProperty: Property<Video, any>;
export declare const subtitlesProperty: Property<Video, any>;
export declare const subtitleSourceProperty: Property<Video, any>;
export declare const videoSourceProperty: Property<Video, any>;
export declare const imageSourceProperty: Property<Video, any>;
export declare const isLoadingProperty: Property<Video, boolean>;
export declare const observeCurrentTimeProperty: Property<Video, boolean>;
export declare const autoplayProperty: Property<Video, boolean>;
export declare const controlsProperty: Property<Video, boolean>;
export declare const loopProperty: Property<Video, boolean>;
export declare const mutedProperty: Property<Video, boolean>;
export declare const backgroundAudioProperty: Property<Video, boolean>;
export declare const fillProperty: Property<Video, VideoFill>;
