const Face = (function() {
    return class Face {
        constructor(type) {
            this.tile = [
                [type, type, type],
                [type, type, type],
                [type, type, type]
            ];

            this.up = undefined;
            this.right = undefined;
            this.down = undefined;
            this.left = undefined;
        }

        clone() {
            return [
                [this.tile[0][0], this.tile[0][1], this.tile[0][2]],
                [this.tile[1][0], this.tile[1][1], this.tile[1][2]],
                [this.tile[2][0], this.tile[2][1], this.tile[2][2]]
            ];
        }

        cloneFrom(parent) {
            this.tile[0][0] = parent[0][0];
            this.tile[0][1] = parent[0][1];
            this.tile[0][2] = parent[0][2];
            this.tile[1][0] = parent[1][0];
            this.tile[1][1] = parent[1][1];
            this.tile[1][2] = parent[1][2];
            this.tile[2][0] = parent[2][0];
            this.tile[2][1] = parent[2][1];
            this.tile[2][2] = parent[2][2];
        }

        setAdjacentFaces(up, right, down, left) {
            this.up = up;
            this.right = right;
            this.down = down;
            this.left = left;
        }

        getFaceType() {
            return this.tile[1][1];
        }

        getAdjacentTiles(adjFace) {
            switch (adjFace.getFaceType()) {
                case this.up.getFaceType() :
                    return [this.tile[0][0], this.tile[1][0], this.tile[2][0]];
                case this.right.getFaceType() :
                    return [this.tile[2][0], this.tile[2][1], this.tile[2][2]];
                case this.down.getFaceType() :
                    return [this.tile[2][2], this.tile[1][2], this.tile[0][2]];
                case this.left.getFaceType() :
                    return [this.tile[0][2], this.tile[0][1], this.tile[0][0]];
                default :
                    throw "not an adjacent face";
            }
        }

        setAdjacentTiles(adjFace, tiles) {
            switch (adjFace.getFaceType()) {
                case this.up.getFaceType() :
                    this.tile[0][0] = tiles[0];
                    this.tile[1][0] = tiles[1];
                    this.tile[2][0] = tiles[2];
                    return;
                case this.right.getFaceType() :
                    this.tile[2][0] = tiles[0];
                    this.tile[2][1] = tiles[1];
                    this.tile[2][2] = tiles[2];
                    return;
                case this.down.getFaceType() :
                    this.tile[2][2] = tiles[0];
                    this.tile[1][2] = tiles[1];
                    this.tile[0][2] = tiles[2];
                    return;
                case this.left.getFaceType() :
                    this.tile[0][2] = tiles[0];
                    this.tile[0][1] = tiles[1];
                    this.tile[0][0] = tiles[2];
                    return;
                default :
                    throw "not an adjacent face";
            }
        }

        rotate(ccw = false) {
            let upTiles = this.up.getAdjacentTiles(this);
            let rightTiles = this.right.getAdjacentTiles(this);
            let downTiles = this.down.getAdjacentTiles(this);
            let leftTiles = this.left.getAdjacentTiles(this);

            if (ccw) {
                this.up.setAdjacentTiles(this, rightTiles);
                this.right.setAdjacentTiles(this, downTiles);
                this.down.setAdjacentTiles(this, leftTiles);
                this.left.setAdjacentTiles(this, upTiles);

                this.tile = [
                    [this.tile[2][0], this.tile[1][0], this.tile[0][0]],
                    [this.tile[2][1], this.tile[1][1], this.tile[0][1]],
                    [this.tile[2][2], this.tile[1][2], this.tile[0][2]],
                ]
            } else {
                this.up.setAdjacentTiles(this, leftTiles);
                this.right.setAdjacentTiles(this, upTiles);
                this.down.setAdjacentTiles(this, rightTiles);
                this.left.setAdjacentTiles(this, downTiles);

                this.tile = [
                    [this.tile[0][2], this.tile[1][2], this.tile[2][2]],
                    [this.tile[0][1], this.tile[1][1], this.tile[2][1]],
                    [this.tile[0][0], this.tile[1][0], this.tile[2][0]],
                ]
            }
        }

        findSideTilePosition(mainType, type2) {
            if (this.tile[1][0] === mainType && this.up.getAdjacentTiles(this)[1] === type2) {
                return {
                    i: 1,
                    j: 0,
                    faceType: this.getFaceType(),
                    facing: constants.UP
                }
            }
            if (this.tile[2][1] === mainType && this.right.getAdjacentTiles(this)[1] === type2) {
                return {
                    i: 2,
                    j: 1,
                    faceType: this.getFaceType(),
                    facing: constants.RIGHT
                }
            }
            if (this.tile[1][2] === mainType && this.down.getAdjacentTiles(this)[1] === type2) {
                return {
                    i: 1,
                    j: 2,
                    faceType: this.getFaceType(),
                    facing: constants.DOWN
                }
            }
            if (this.tile[0][1] === mainType && this.left.getAdjacentTiles(this)[1] === type2) {
                return {
                    i: 0,
                    j: 1,
                    faceType: this.getFaceType(),
                    facing: constants.LEFT
                }
            }
        }

        getTileAt(i, j) {
            return this.tile[i][j];
        }
    };
})();