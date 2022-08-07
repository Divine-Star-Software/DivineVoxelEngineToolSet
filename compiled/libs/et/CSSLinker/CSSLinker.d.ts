export declare class CSSLinker {
    loadedCSS: Record<string, boolean>;
    loadAndAppendCSS(moduleMetaURL: string, path: string): Promise<void>;
}
