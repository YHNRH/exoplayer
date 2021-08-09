import type { VideoSource as IVideoSource } from '.';
export * from './common';
export declare class VideoSource implements IVideoSource {
    android: any;
    ios: any;
    height: any;
    width: any;
    loadFromResource(name: string): boolean;
    loadFromFile(filePath: string): boolean;
    loadFromUrl(url: string): boolean;
    setNativeSource(source: any): boolean;
}
