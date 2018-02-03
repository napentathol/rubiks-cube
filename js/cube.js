const Cube = (function () {
    class Face {
        constructor(type) {
            this.face = [
                [type, type, type],
                [type, type, type],
                [type, type, type]
            ];

            this.up = undefined;
            this.right = undefined;
            this.down = undefined;
            this.left = undefined;
        }

        setAdjacentFaces(up, right, down, left) {
            this.up = up;
            this.right = right;
            this.down = down;
            this.left = left;
        }

        getFaceType() {
            return this.face[1][1];
        }

        getAdjacentTiles(adjFace) {
            switch(adjFace.getFaceType()) {
                case this.up.getFaceType() :
                    return [this.face[0][0], this.face[1][0], this.face[2][0]];
                case this.right.getFaceType() :
                    return [this.face[2][0], this.face[2][1], this.face[2][2]];
                case this.down.getFaceType() :
                    return [this.face[2][2], this.face[1][2], this.face[0][2]];
                case this.left.getFaceType() :
                    return [this.face[0][2], this.face[0][1], this.face[0][0]];
                default :
                    throw "not an adjacent face";
            }
        }

        setAdjacentTiles(adjFace, tiles) {
            switch(adjFace.getFaceType()) {
                case this.up.getFaceType() :
                    this.face[0][0] = tiles[0];
                    this.face[1][0] = tiles[1];
                    this.face[2][0] = tiles[2];
                    return;
                case this.right.getFaceType() :
                    this.face[2][0] = tiles[0];
                    this.face[2][1] = tiles[1];
                    this.face[2][2] = tiles[2];
                    return;
                case this.down.getFaceType() :
                    this.face[2][2] = tiles[0];
                    this.face[1][2] = tiles[1];
                    this.face[0][2] = tiles[2];
                    return;
                case this.left.getFaceType() :
                    this.face[0][2] = tiles[0];
                    this.face[0][1] = tiles[1];
                    this.face[0][0] = tiles[2];
                    return;
                default :
                    throw "not an adjacent face";
            }
        }

        rotate(ccw = false) {
            let upTiles = this.up       .getAdjacentTiles(this);
            let rightTiles = this.right .getAdjacentTiles(this);
            let downTiles = this.down   .getAdjacentTiles(this);
            let leftTiles = this.left   .getAdjacentTiles(this);

            if(ccw) {
                this.up     .setAdjacentTiles(this,rightTiles);
                this.right  .setAdjacentTiles(this,downTiles);
                this.down   .setAdjacentTiles(this,leftTiles);
                this.left   .setAdjacentTiles(this,upTiles);

                this.face = [
                    [this.face[2][0], this.face[1][0], this.face[0][0]],
                    [this.face[2][1], this.face[1][1], this.face[0][1]],
                    [this.face[2][2], this.face[1][2], this.face[0][2]],
                ]
            } else {
                this.up     .setAdjacentTiles(this,leftTiles);
                this.right  .setAdjacentTiles(this,upTiles);
                this.down   .setAdjacentTiles(this,rightTiles);
                this.left   .setAdjacentTiles(this,downTiles);

                this.face = [
                    [this.face[0][2], this.face[1][2], this.face[2][2]],
                    [this.face[0][1], this.face[1][1], this.face[2][1]],
                    [this.face[0][0], this.face[1][0], this.face[2][0]],
                ]
            }
        }

        getFaceAt(i,j) {
            return this.face[i][j];
        }
        setFaceAt(i,j,type) {
            this.face[i][j] = type;
        }
    }

    const mockFunction = function () {};
    const mockFace = {
        getFaceAt: function getFaceAt() { return 0; },
        setFaceAt: mockFunction,
        rotate: mockFunction
    };

    return class Cube {
        constructor() {
            this.whiteFace = new Face(6);
            this.redFace = new Face(2);
            this.yellowFace = new Face(5);
            this.orangeFace = new Face(4);
            this.greenFace = new Face(1);
            this.blueFace = new Face(3);

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

        getTileArray() {
            let out = [];

            for( let i = 0; i < constants.HORZ_TILES; i++) {
                out[i] = [];

                for( let j = 0; j < constants.VERT_TILES; j++) {
                    out[i][j] = this.getTileAtPos(i, j);
                }
            }

            return out;
        }

        restoreFromTileArray(array) {
            for( let i = 0; i < constants.HORZ_TILES; i++) {
                for( let j = 0; j < constants.VERT_TILES; j++) {
                    this.setTileAtPos(i,j,array[i][j]);
                }
            }
        }

        getTileAtPos(i,j) {
            if(i<0 || i>constants.HORZ_TILES || j<0 || j>constants.VERT_TILES) return 0;

            return this.getFaceForTile(i,j).getFaceAt(
                i % constants.TILES_PER_FACE,
                j % constants.TILES_PER_FACE);
        }

        setTileAtPos(i,j,type) {
            this.getFaceForTile(i, j).setFaceAt(i % constants.TILES_PER_FACE, j % constants.TILES_PER_FACE, type);
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
            let face = mockFace;
            if( j === 0 && i === 1 ) {
                face = this.whiteFace;
            } else if( j === 1 && i === 0 ) {
                face = this.greenFace;
            } else if( j === 1 && i === 1 ) {
                face = this.redFace;
            } else if( j === 1 && i === 2 ) {
                face = this.blueFace;
            } else if( j === 2 && i === 1 ) {
                face = this.yellowFace;
            } else if( j === 3 && i === 1 ) {
                face = this.orangeFace;
            }
            face.rotate(ccw);
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
                case 1: this.rotate(rotationCommand.ccw, 0, 1); return; // green
                case 2: this.rotate(rotationCommand.ccw, 1, 1); return; // red
                case 3: this.rotate(rotationCommand.ccw, 2, 1); return; // blue
                case 4: this.rotate(rotationCommand.ccw, 1, 3); return; // orange
                case 5: this.rotate(rotationCommand.ccw, 1, 2); return; // yellow
                case 6: this.rotate(rotationCommand.ccw, 1, 0); return; // white
            }
        }

        static colorFromType(type) {
            switch(type) {
                default:
                    return '#333';
                case 1:
                    return '#3c0';
                case 2:
                    return '#c03';
                case 3:
                    return '#03c';
                case 4:
                    return '#e70';
                case 5:
                    return '#ee0';
                case 6:
                    return '#ccc'
            }
        }
    }
})();