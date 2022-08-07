import { CSSLinker } from "./CSSLinker/CSSLinker.js";
import { ElementTreeData } from "Meta/Elements/ElementTreeData.types.js";
import { Controller } from "./Controler/Controler.js";
import { ElementCreator } from "./ElementCreator/ElementCreator.js";
export declare const ElementTree: {
    controller: Controller;
    elementCreator: ElementCreator;
    CSSLinker: CSSLinker;
    bloomRoot: (tree: ElementTreeData) => void;
    bloomBranch: (tree: ElementTreeData, elm: HTMLElement) => void;
    decayRoot: () => void;
    decayBranch: (elm: HTMLElement) => void;
    linkCSS: (importMetalURL: string, path: string) => void;
    stateful: <K, T>(props: K, data: T, onChange?: Function) => [T, (set: Record<keyof T, any>) => void, K];
    cascade: (props: any) => [() => boolean, () => boolean];
    register: {
        __register: Record<string, any>;
        add: (id: string, props: any) => boolean;
        get: (id: string) => any;
        release: (id: string) => boolean;
    };
};
