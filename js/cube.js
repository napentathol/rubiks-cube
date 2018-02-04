const Cube = (function () {

    const mockFunction = function () {};
    const mockFace = {
        getTileAt: function getFaceAt() { return 0; },
        rotate: mockFunction
    };

    return class Cube {
        constructor() {
            this.whiteFace =    new Face(constants.WHITE);
            this.redFace =      new Face(constants.RED);
            this.yellowFace =   new Face(constants.YELLOW);
            this.orangeFace =   new Face(constants.ORANGE);
            this.greenFace =    new Face(constants.GREEN);
            this.blueFace =     new Face(constants.BLUE);

            this.whiteFace  .setAdjacentFaces(this.orangeFace,  this.blueFace,   this.redFace,    this.greenFace);
            this.redFace    .setAdjacentFaces(this.whiteFace,   this.blueFace,   this.yellowFace, this.greenFace);
            this.greenFace  .setAdjacentFaces(this.whiteFace,   this.redFace,    this.yellowFace, this.orangeFace);
            this.blueFace   .setAdjacentFaces(this.whiteFace,   this.orangeFace, this.yellowFace, this.redFace);
            this.yellowFace .setAdjacentFaces(this.redFace,     this.blueFace,   this.orangeFace, this.greenFace);
            this.orangeFace .setAdjacentFaces(this.yellowFace,  this.blueFace,   this.whiteFace,  this.greenFace);
        }

        render(ctx) {
            ctx.lineWidth = constants.TILE_LINE_WIDTH;
            ctx.strokeStyle = 'black';

            for( let i = 0; i < constants.HORZ_TILES; i++) {
                for( let j = 0; j < constants.VERT_TILES; j++) {
                    let tile = this.getTileAtPos(i, j);

                    if(tile !== 0) {
                        let color = Cube.colorFromType(tile);
                        ctx.beginPath();
                        ctx.fillStyle = color;
                        ctx.rect(
                            constants.OFFSET + i * constants.TILE_SIZE,
                            constants.OFFSET + j* constants.TILE_SIZE,
                            constants.TILE_SIZE, constants.TILE_SIZE );
                        ctx.fill();
                        ctx.stroke();
                    }
                }
            }

            ctx.lineWidth = constants.FACE_LINE_WIDTH;
            ctx.strokeStyle = 'grey';

            for(let i = 0; i < constants.HORZ_FACES; i++) {
                for(let j = 0; j < constants.VERT_FACES; j++) {
                    ctx.beginPath();
                    ctx.rect(
                        constants.OFFSET + i * constants.FACE_SIZE,
                        constants.OFFSET + j* constants.FACE_SIZE,
                        constants.FACE_SIZE, constants.FACE_SIZE );
                    ctx.stroke();
                }
            }
        }

        getTileObj() {
            let out = {};

            out.version = '0.1';
            out.white =     this.whiteFace.clone();
            out.red =       this.redFace.clone();
            out.orange =    this.orangeFace.clone();
            out.yellow =    this.yellowFace.clone();
            out.green =     this.greenFace.clone();
            out.blue =      this.blueFace.clone();

            return out;
        }

        restoreFromTileObj(tileObj) {
            if(tileObj.version === '0.1') {
                this.whiteFace  .cloneFrom(tileObj.white);
                this.redFace    .cloneFrom(tileObj.red);
                this.orangeFace .cloneFrom(tileObj.orange);
                this.yellowFace .cloneFrom(tileObj.yellow);
                this.greenFace  .cloneFrom(tileObj.green);
                this.blueFace   .cloneFrom(tileObj.blue);
            } else {
                throw "Unknown version!";
            }
        }

        getTileAtPos(i,j) {
            if(i<0 || i>constants.HORZ_TILES || j<0 || j>constants.VERT_TILES) return 0;

            return this.getFaceForTile(i,j).getTileAt(
                i % constants.TILES_PER_FACE,
                j % constants.TILES_PER_FACE);
        }

        getFaceForTile(i,j) {
            let face = mockFace;

            if(i < 3) {
                if(j >= 3 && j < 6) {
                    face = this.greenFace;
                }
            } else if(i < 6) {
                if(j < 3) {
                    face = this.whiteFace
                } else if(j < 6) {
                    face = this.redFace
                } else if(j < 9) {
                    face = this.yellowFace
                } else if(j < 12) {
                    face = this.orangeFace
                }
            } else if(i < 9) {
                if(j >= 3 && j < 6) {
                    face = this.blueFace;
                }
            }

            return face;
        }

        rotate(ccw, i, j) {
            this.getFaceForTile(i * constants.TILES_PER_FACE, j * constants.TILES_PER_FACE)
                .rotate(ccw);
        }

        commandRotate(rotationCommand) {
            if( typeof rotationCommand !== "object" )
                throw "Rotation command must be an object";
            if( typeof rotationCommand.face  !== "number" || rotationCommand.face < 1 || rotationCommand.face > 6)
                throw "Rotation command must have a 'face' parameter that is a number between 1 and 6 inclusive";
            if( typeof rotationCommand.ccw !== "boolean" )
                throw "Rotation command must have a 'ccw' parameter that is a boolean";

            switch(rotationCommand.face) {
                default: throw "Invalid face!";
                case constants.WHITE:
                    this.rotate(rotationCommand.ccw, 1, 0); return;
                case constants.RED:
                    this.rotate(rotationCommand.ccw, 1, 1); return;
                case constants.ORANGE:
                    this.rotate(rotationCommand.ccw, 1, 3); return;
                case constants.YELLOW:
                    this.rotate(rotationCommand.ccw, 1, 2); return;
                case constants.GREEN:
                    this.rotate(rotationCommand.ccw, 0, 1); return;
                case constants.BLUE:
                    this.rotate(rotationCommand.ccw, 2, 1); return;
            }
        }

        findSideTilePosition(mainType, type2) {
            let out = this.whiteFace.findSideTilePosition(mainType, type2)
                || this.redFace.findSideTilePosition(mainType, type2)
                || this.orangeFace.findSideTilePosition(mainType, type2)
                || this.yellowFace.findSideTilePosition(mainType, type2)
                || this.greenFace.findSideTilePosition(mainType, type2)
                || this.blueFace.findSideTilePosition(mainType, type2);

            if(out === null) throw "Tile position not found. " + {
                mainType: mainType,
                type2: type2
            };

            return out;
        }

        static colorFromType(type) {
            switch(type) {
                default:
                    return '#333';
                case constants.GREEN:
                    return '#3c0';
                case constants.RED:
                    return '#c03';
                case constants.BLUE:
                    return '#03c';
                case constants.ORANGE:
                    return '#e70';
                case constants.YELLOW:
                    return '#ee0';
                case constants.WHITE:
                    return '#ccc'
            }
        }
    }
})();