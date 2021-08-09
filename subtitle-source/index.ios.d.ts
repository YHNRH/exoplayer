import type { SubtitleSource as ISubtitleSource } from '.';
export * from './common';
export declare class SubtitleSource implements ISubtitleSource {
    android: any;
    ios: any;
    loadFromResource(name: string): boolean;
    loadFromFile(filePath: string): boolean;
    loadFromUrl(url: string): boolean;
}
