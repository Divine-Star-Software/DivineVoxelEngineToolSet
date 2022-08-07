import { ElementTreeData, HTMLInputTypes, InputValueTypes } from "../../libs/et/index.js";
export declare const form: (children: ElementTreeData) => ElementTreeData;
export declare const fileInput: (label: string, inputBind: any, bindToName: string, onLoad?: ((file: string) => void) | undefined) => ElementTreeData;
export declare const input: (inputType: HTMLInputTypes, label: string, valueType: InputValueTypes, inputBind: any, bindToName: string) => ElementTreeData;
export declare const textArea: (className: string, inputBind: any, bindToName: string, cascadeOrigin?: any) => ElementTreeData;
export declare const dataOutput: (inputBind: any, bindToName: string, cascadeOrigin?: any) => ElementTreeData;
export declare const dataInput: (inputBind: any, bindToName: string) => ElementTreeData;
export declare const formOptionSelect: (options: {
    text: string;
    value: string;
    active?: boolean;
}[], onChange: (value: string) => void) => ElementTreeData;
export declare const formButton: (text: string, onClick: Function) => ElementTreeData;
export declare const formText: (text: string) => ElementTreeData;
export declare const formTitle: (text: string) => ElementTreeData;
