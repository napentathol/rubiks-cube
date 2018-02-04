us.sodiumlabs.solvers.RedT = (function() {
    function whiteInPlace(whiteCubePos) {
        return whiteCubePos.faceType === constants.RED;
    }

    function placeWhite(whiteCubePos) {
        if(whiteCubePos.faceType === constants.ORANGE) {
            return {
                ccw: whiteCubePos.facing === constants.DOWN || whiteCubePos.facing === constants.LEFT,
                face: constants.UTILS.getAdjacentType(whiteCubePos.faceType, whiteCubePos.facing)
            };
        }

        let facingToRed = constants.UTILS.facingFromTypeToType(whiteCubePos.faceType, constants.RED);

        if(whiteCubePos.facing === facingToRed) {
            return {
                ccw: true,
                face: whiteCubePos.faceType
            }
        } else if(constants.UTILS.oppositeFacing(whiteCubePos.facing, facingToRed)) {
            return {
                ccw: true,
                face: whiteCubePos.faceType
            }
        } else {
            let adjacentType = constants.UTILS.getAdjacentType(whiteCubePos.faceType, whiteCubePos.facing);
            return {
                ccw: constants.UTILS.turnFromFacingToFacingCounterClockwise(
                    constants.UTILS.facingFromTypeToType(adjacentType, whiteCubePos.faceType),
                    constants.UTILS.facingFromTypeToType(adjacentType, constants.RED) ),
                face: adjacentType
            }
        }
    }

    return class RedT extends us.sodiumlabs.solvers.AbstractSolver {
        constructor() {
            super();

            this.cube = new Cube();
        }

        getRotation(obj) {
            if(this.isCompleted(obj)) {
                return null;
            }

            this.cube.restoreFromTileObj(obj);

            const whiteCubePos = this.cube.findSideTilePosition(constants.RED, constants.WHITE);

            if(!whiteInPlace(whiteCubePos)) {
                return placeWhite(whiteCubePos);
            }

            throw "Incomplete!";
        }

        isCompleted(obj) {
            return obj.red[1][1] === constants.RED
                && obj.red[0][1] === constants.RED
                && obj.red[2][1] === constants.RED
                && obj.red[1][0] === constants.RED
                && obj.red[1][2] === constants.RED
                && obj.blue[0][1]   === constants.BLUE
                && obj.green[2][1]  === constants.GREEN
                && obj.yellow[1][0] === constants.YELLOW
                && obj.white[1][2]  === constants.WHITE;
        }
    }
})();