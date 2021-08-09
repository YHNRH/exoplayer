import { VideoSource } from '.';
export declare function fromResource(name: string): VideoSource;
export declare function fromFile(path: string): VideoSource;
export declare function fromNativeSource(source: any): VideoSource;
export declare function fromUrl(url: string): VideoSource;
export declare function fromFileOrResource(path: string): VideoSource;
export declare function isFileOrResourcePath(path: string): boolean;
