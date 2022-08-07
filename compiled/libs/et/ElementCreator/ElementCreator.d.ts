import type { ElementTreeInterface } from "Meta/ElementTree.interface.js";
import type { ElementTreeData } from "Meta/Elements/ElementTreeData.types";
export declare class ElementCreator {
    attributeSetFunction: Record<keyof import("../index.js").ElementAttributes, Function>;
    elementCreateFunctions: Record<import("Meta/Elements/ElementTreeData.types").ElementTypes, Function>;
    elemntEventFunctions: Record<import("Meta/Elements/ElementTreeData.types").ElementEvents, Function>;
    elementTree: ElementTreeInterface;
    constructor();
    _traverseElementTree(tree: ElementTreeData, parentElm: HTMLElement | DocumentFragment): void;
    createElements(tree: ElementTreeData, parentElm: HTMLElement): void;
    safetlyRemoveAll(): void;
    safetlyRemoveElement(elm: HTMLElement): void;
    _traverseRemoveElements(elm: HTMLElement, cascadeElements: Record<string, HTMLElement[]>, components: string[]): void;
}
