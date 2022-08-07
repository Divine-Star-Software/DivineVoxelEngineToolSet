import type { ElementTreeData } from "Meta/Elements/ElementTreeData.types";
export declare type BaseComponentProps = {
    children?: ElementTreeData;
} & any;
export declare type Component<T> = (props: any) => [ElementTreeData, (set: Record<keyof T, any>) => void];
