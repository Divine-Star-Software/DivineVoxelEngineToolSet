import { ItemShapeData } from "libs/dve/Meta/Constructor/ItemShape.type.js";
import { DirectionNames } from "libs/dve/Meta/Util.types.js";
import { TextureCreator } from "./TextureCreator.js";

type FaceData = {
  xStart: number;
  xEnd: number;
  yStart: number;
  yEnd: number;
  type: Faces;
};

type Faces = "west" | "east" | "top" | "bottom";
const POSFunction: Record<Faces, (face: FaceData) => [number, number, number]> =
  {
    top: (face) => {
      const yStart = Math.abs(face.yEnd - (TextureProcessor.height - 1));
      let y = (yStart + 1) / TextureProcessor.height;

      let x =
        (face.xStart + (face.xEnd - face.xStart + 1) / 2) /
        TextureProcessor.width;
      return [x, y, 0];
    },
    bottom: (face) => {
      const yStart = Math.abs(face.yEnd - (TextureProcessor.height - 1));
      let y = yStart / TextureProcessor.height;

      let x =
        (face.xStart + (face.xEnd - face.xStart + 1) / 2) /
        TextureProcessor.width;
      return [x, y, 0];
    },
    east: (face) => {
      const yStart = Math.abs(face.yEnd - (TextureProcessor.height - 1));

      let y =
        (yStart + (face.yEnd - face.yStart + 1) / 2) / TextureProcessor.height;

      let x = (face.xStart + 1) / TextureProcessor.width;
      return [x, y, 0];
    },
    west: (face) => {
      const yStart = Math.abs(face.yEnd - (TextureProcessor.height - 1));

      let y =
        (yStart + (face.yEnd - face.yStart + 1) / 2) / TextureProcessor.height;

      let x = face.xEnd / TextureProcessor.width;
      return [x, y, 0];
    },
  };

const DIMFunction: Record<Faces, (face: FaceData) => [number, number, number]> =
  {
    top: (face) => {
      const width = (face.xEnd + 1 - face.xStart) / TextureProcessor.width;
      return [width / 2, TextureProcessor.depth / 2, 0];
    },
    bottom: (face) => {
      const width = (face.xEnd + 1 - face.xStart) / TextureProcessor.width;
      return [width / 2, TextureProcessor.depth / 2, 0];
    },
    east: (face) => {
      const height = (face.yEnd - face.yStart + 1) / TextureProcessor.height;
      return [0, TextureProcessor.depth / 2, height / 2];
    },
    west: (face) => {
      const height = (face.yEnd - face.yStart + 1) / TextureProcessor.height;
      return [0, TextureProcessor.depth / 2, height / 2];
    },
  };

export const TextureProcessor = {
  textureCreator: TextureCreator,

  currentFaces: <FaceData[]>[],

  visitedMap: <Record<Faces, Record<string, boolean>>>{
    top: {},
    bottom: {},
    east: {},
    west: {},
  },

  _resetVisitedMap() {
    this.visitedMap = {
      top: {},
      bottom: {},
      east: {},
      west: {},
    };
  },

  faceMap: <Record<DirectionNames, number>>{
    top: 0,
    bottom: 1,
    east: 2,
    west: 3,
    south: 4,
    north: 5,
  },

  height: 16,
  width: 16,
  depth: 1 / 16,
  currentId: "",

  getPosition: POSFunction,
  getDimensions: DIMFunction,

  getTruePosition(face: FaceData) {
    return {
      xStart: face.xStart / (this.width - 1),
      xEnd: face.xEnd / (this.width - 1),
      yStart: Math.abs(face.yEnd - (this.height - 1)) / (this.height - 1),
      yEnd: Math.abs(face.yStart - (this.height - 1)) / (this.height - 1),
    };
  },

  async $INIT() {
    this.textureCreator.setUpImageCreation();
  },

  async processTexture(id: string, imagePath: string, mode: 0 | 1 = 0) {
    this.currentId = id;
    const textureData = await this.textureCreator.getTextureBuffer(imagePath);
    const processedTextureData: number[][] = [];
    const rawData = textureData[0];
    let width = textureData[1];
    let height = textureData[2];

    let x = 0;
    let y = 0;
    for (let i = 0; i < rawData.length; i += 4) {
      if (!processedTextureData[y]) {
        processedTextureData[y] = [];
      }
      if (rawData[i + 3]) {
        processedTextureData[y].push(1);
      } else {
        processedTextureData[y].push(0);
      }
      x++;
      if (x == width) {
        y++;
        x = 0;
      }
    }

    this.width = width;
    this.height = height;
    this.generateItemData(processedTextureData);

    const data = this.generateFaceData(this.currentFaces);
    this.currentFaces = [];
    if (mode == 0) {
      return JSON.stringify(data, null, 2);
    }
    if (mode == 1) {
      return this.convertToFlatData(data);
    }
  },

  convertToFlatData(data: ItemShapeData) {
    const flatData: number[] = [];
    for (const face of data.faces) {
      flatData.push(this.faceMap[face.direction]);
      flatData.push(...face.uvs);
      flatData.push(...face.dimensions);
      flatData.push(...face.position);
    }
    const returnData = {
      id: this.currentId,
      faces: flatData,
    };
    return JSON.stringify(returnData);
  },

  _process(data: number[][], x: number, y: number) {
    let addwest = false;
    let addeast = false;
    let addbottom = false;
    let addtop = false;

    if (!data[y - 1]) {
      addtop = true;
    }
    if (data[y - 1]) {
      if (!data[y - 1][x]) {
        addtop = true;
      }
    }

    if (!data[y + 1]) {
      addbottom = true;
    }
    if (data[y + 1]) {
      if (!data[y + 1][x]) {
        addbottom = true;
      }
    }

    if (!data[y][x - 1]) {
      addwest = true;
    }

    if (!data[y][x + 1]) {
      addeast = true;
    }

    return {
      w: addwest,
      e: addeast,
      t: addtop,
      b: addbottom,
    };
  },

  gettopFace(data: number[][], sx: number, y: number) {
    const face = this.getBlankFace(sx, y, "top");
    let endX = sx;
    for (let x = sx; x < this.width; x++) {
      const result = this._process(data, x, y);
      this.visit(x, y, "top");
      if (!result.t || !data[y][x] || x == this.width - 1) {
        if (x == this.width - 1) {
          endX = x;
        } else {
          endX = x - 1;
        }
        break;
      }
    }
    face.xEnd = endX;
    this.currentFaces.push(face);
  },

  getbottomFace(data: number[][], sx: number, y: number) {
    const face = this.getBlankFace(sx, y, "bottom");
    let endX = sx;
    for (let x = sx; x < this.width; x++) {
      const result = this._process(data, x, y);
      this.visit(x, y, "bottom");
      if (!result.b || !data[y][x] || x == this.width - 1) {
        if (x == this.width - 1) {
          endX = x;
        } else {
          endX = x - 1;
        }
        break;
      }
    }
    face.xEnd = endX;
    this.currentFaces.push(face);
  },

  getwestFace(data: number[][], x: number, sy: number) {
    const face = this.getBlankFace(x, sy, "west");
    let endY = sy;
    for (let y = sy; y < this.height; y++) {
      const result = this._process(data, x, y);
      this.visit(x, y, "west");
      if (!result.w || !data[y][x] || y == this.height - 1) {
        if (y == this.height - 1) {
          endY = y;
        } else {
          endY = y - 1;
        }

        break;
      }
    }
    face.yEnd = endY;
    this.currentFaces.push(face);
  },

  geteastFace(data: number[][], x: number, sy: number) {
    const face = this.getBlankFace(x, sy, "east");
    let endY = sy;
    for (let y = sy; y < this.height; y++) {
      const result = this._process(data, x, y);
      this.visit(x, y, "east");
      if (!result.e || !data[y][x] || y == this.height - 1) {
        if (y == this.height - 1) {
          endY = y;
        } else {
          endY = y - 1;
        }
        break;
      }
    }
    face.yEnd = endY;
    this.currentFaces.push(face);
  },

  getBlankFace(x: number, y: number, face: Faces) {
    return {
      xStart: x,
      xEnd: x,
      yStart: y,
      yEnd: y,
      type: face,
    };
  },

  visit(x: number, y: number, face: Faces) {
    this.visitedMap[face][`${x}-${y}`] = true;
  },

  visited(x: number, y: number, face: Faces) {
    return this.visitedMap[face][`${x}-${y}`];
  },

  generateItemData(data: number[][]) {
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        if (!data[y][x]) continue;
        const result = this._process(data, x, y);
        if (result.t && !this.visited(x, y, "top")) {
          this.visit(x, y, "top");
          this.gettopFace(data, x, y);
        }
        if (result.b && !this.visited(x, y, "bottom")) {
          this.visit(x, y, "bottom");
          this.getbottomFace(data, x, y);
        }
        if (result.w && !this.visited(x, y, "west")) {
          this.visit(x, y, "west");
          this.getwestFace(data, x, y);
        }
        if (result.e && !this.visited(x, y, "east")) {
          this.visit(x, y, "east");
          this.geteastFace(data, x, y);
        }
      }
    }
    this._resetVisitedMap();
  },

  calculateUV(face: FaceData): [number, number, number, number] {
    const ws = face.xStart / this.width;
    const we = (face.xEnd + 1) / this.width;
    const hs = face.yStart / this.height;
    const he = (face.yEnd + 1) / this.height;
    return [ws, we, hs, he];
  },
  calculateDimensions(face: FaceData) {
    const width = (face.xEnd - face.xStart) / (this.width - 1);
    const height = (face.yEnd - face.yStart) / (this.height - 1);
    return [width, this.depth, height];
  },

  generateFaceData(faceData: FaceData[]) {
    const data: ItemShapeData = {
      id: this.currentId,
      faces: [],
    };

    data.faces.push(
      {
        direction: "south",
        uvs: [0, 1, 0, 1],
        dimensions: [0.5, 0, 0.5],
        position: [0.5, 0.5, -this.depth / 2],
      },
      {
        direction: "north",
        uvs: [0, 1, 0, 1],
        dimensions: [0.5, 0, 0.5],
        position: [0.5, 0.5, this.depth / 2],
      }
    );
    for (const face of faceData) {
      const uv = this.calculateUV(face);
      const dim = this.getDimensions[face.type](face);
      const pos = this.getPosition[face.type](face);

      data.faces.push({
        direction: face.type,
        uvs: uv,
        dimensions: dim,
        position: pos,
      });
    }

    return data;
  },
};
