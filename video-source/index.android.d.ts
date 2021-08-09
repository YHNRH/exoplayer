import type { VideoSource as IVideoSource } from '.';
export * from './common';
export declare class VideoSource implements IVideoSource {
    android: any;
    ios: any;
    loadFromResource(name: string): boolean;
    loadFromUrl(url: string): boolean;
    loadFromFile(filePath: string): boolean;
    setNativeSource(source: any): boolean;
    get height(): number;
    get width(): number;
}
