import { ItemShapeData } from "libs/dve/Meta/Constructor/ItemShape.type.js";
import { DirectionNames } from "libs/dve/Meta/Util.types.js";
declare type FaceData = {
    xStart: number;
    xEnd: number;
    yStart: number;
    yEnd: number;
    type: Faces;
};
declare type Faces = "west" | "east" | "top" | "bottom";
export declare const TextureProcessor: {
    textureCreator: {
        context: CanvasRenderingContext2D | null;
        imgWidth: number;
        imgHeight: number;
        defineTextureDimensions(width: number, height: number): void;
        setUpImageCreation(): void;
        _loadImages(imgPath: string, width: number, height: number): Promise<Uint8ClampedArray>;
        _combineImageData(totalLength: number, arrays: Uint8ClampedArray[]): Uint8ClampedArray;
        getTextureBuffer(imgPath: string): Promise<[Uint8ClampedArray, number, number]>;
    };
    currentFaces: FaceData[];
    visitedMap: Record<Faces, Record<string, boolean>>;
    _resetVisitedMap(): void;
    faceMap: Record<DirectionNames, number>;
    height: number;
    width: number;
    depth: number;
    currentId: string;
    getPosition: Record<Faces, (face: FaceData) => [number, number, number]>;
    getDimensions: Record<Faces, (face: FaceData) => [number, number, number]>;
    getTruePosition(face: FaceData): {
        xStart: number;
        xEnd: number;
        yStart: number;
        yEnd: number;
    };
    $INIT(): Promise<void>;
    processTexture(id: string, imagePath: string, mode?: 0 | 1): Promise<string | undefined>;
    convertToFlatData(data: ItemShapeData): string;
    _process(data: number[][], x: number, y: number): {
        w: boolean;
        e: boolean;
        t: boolean;
        b: boolean;
    };
    gettopFace(data: number[][], sx: number, y: number): void;
    getbottomFace(data: number[][], sx: number, y: number): void;
    getwestFace(data: number[][], x: number, sy: number): void;
    geteastFace(data: number[][], x: number, sy: number): void;
    getBlankFace(x: number, y: number, face: Faces): {
        xStart: number;
        xEnd: number;
        yStart: number;
        yEnd: number;
        type: Faces;
    };
    visit(x: number, y: number, face: Faces): void;
    visited(x: number, y: number, face: Faces): boolean;
    generateItemData(data: number[][]): void;
    calculateUV(face: FaceData): [number, number, number, number];
    calculateDimensions(face: FaceData): number[];
    generateFaceData(faceData: FaceData[]): ItemShapeData;
};
export {};
