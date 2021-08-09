import { SubtitleSource } from '.';
export declare function fromResource(name: string): SubtitleSource;
export declare function fromFile(path: string): SubtitleSource;
export declare function fromUrl(url: string): SubtitleSource;
export declare function fromFileOrResource(path: string): SubtitleSource;
export declare function isFileOrResourcePath(path: string): boolean;
