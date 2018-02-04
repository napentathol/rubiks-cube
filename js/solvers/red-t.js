us.sodiumlabs.solvers.RedT = (function() {
    function whiteInPlace(whiteCubePos) {
        return whiteCubePos.faceType === constants.RED;
    }

    function blueInPlace(whiteCubePos, blueCubePos) {
        return blueCubePos.faceType === constants.RED
            && constants.UTILS.clockwiseFacing(whiteCubePos.facing, blueCubePos.facing);
    }

    function yellowInPlace(blueCubePos, yellowCubePos) {
        return yellowCubePos.faceType === constants.RED
            && constants.UTILS.clockwiseFacing(blueCubePos.facing, yellowCubePos.facing);
    }

    function greenInPlace(greenCubePos) {
        return greenCubePos.faceType === constants.RED;
    }

    function placeWhite(whiteCubePos) {
        if(whiteCubePos.faceType === constants.ORANGE) {
            return {
                ccw: false,
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
                ccw: constants.UTILS.counterClockwiseFacing(
                    constants.UTILS.facingFromTypeToType(adjacentType, whiteCubePos.faceType),
                    constants.UTILS.facingFromTypeToType(adjacentType, constants.RED) ),
                face: adjacentType
            }
        }
    }

    function placeBlue(whiteCubePos, blueCubePos) {
        let whiteAdjacentType = constants.UTILS.getAdjacentType(whiteCubePos.faceType, whiteCubePos.facing);
        let blueAdjacentType = constants.UTILS.getAdjacentType(blueCubePos.faceType, blueCubePos.facing);

        if(blueCubePos.faceType === constants.RED) {
            return {
                ccw: true,
                face: blueAdjacentType
            }
        } else if(blueCubePos.faceType === constants.ORANGE) {
            if(whiteAdjacentType === blueAdjacentType) {
                return {
                    ccw: whiteCubePos.facing === constants.RIGHT || whiteCubePos.facing === constants.LEFT,
                    face: constants.RED
                }
            } else {
                return {
                    ccw: true,
                    face: blueAdjacentType
                }
            }
        }

        let facingToRed = constants.UTILS.facingFromTypeToType(blueCubePos.faceType, constants.RED);

        if(facingToRed === blueCubePos.facing) {
            return {
                ccw: false,
                face: blueCubePos.faceType
            }
        } else if(constants.UTILS.oppositeFacing(blueCubePos.facing, facingToRed)) {
            if(whiteAdjacentType === blueCubePos.faceType) {
                return {
                    ccw: true,
                    face: constants.RED
                }
            } else {
                return {
                    ccw: false,
                    face: blueCubePos.faceType
                }
            }
        } else if(!constants.UTILS.clockwiseFacing(whiteCubePos.facing, blueCubePos.facing)) {
            return {
                ccw: whiteCubePos.facing === blueCubePos.facing,
                face: constants.RED
            }
        } else {
            return {
                ccw: constants.UTILS.counterClockwiseFacing(
                    constants.UTILS.facingFromTypeToType(blueAdjacentType, blueCubePos.faceType),
                    constants.UTILS.facingFromTypeToType(blueAdjacentType, constants.RED) ),
                face: blueAdjacentType
            }
        }
    }

    function placeYellow(whiteCubePos, blueCubePos, yellowCubePos) {
        let whiteAdjacentType = constants.UTILS.getAdjacentType(whiteCubePos.faceType, whiteCubePos.facing);
        let blueAdjacentType = constants.UTILS.getAdjacentType(blueCubePos.faceType, blueCubePos.facing);
        let yellowAdjacentType = constants.UTILS.getAdjacentType(yellowCubePos.faceType, yellowCubePos.facing);

        if(yellowCubePos.faceType === constants.RED) {
            return {
                ccw: false,
                face: yellowAdjacentType
            }
        } else if(blueCubePos.faceType === constants.ORANGE) {
            if(whiteAdjacentType === yellowAdjacentType || blueAdjacentType === yellowAdjacentType) {
                return {
                    ccw: true,
                    face: constants.RED
                }
            } else {
                return {
                    ccw: true,
                    face: yellowAdjacentType
                }
            }
        }

        let facingToRed = constants.UTILS.facingFromTypeToType(yellowCubePos.faceType, constants.RED);

        if(facingToRed === yellowCubePos.facing) {
            return {
                ccw: false,
                face: yellowCubePos.faceType
            }
        } else if(constants.UTILS.oppositeFacing(yellowCubePos.facing, facingToRed)) {
            if(blueAdjacentType === yellowCubePos.faceType || whiteAdjacentType === yellowCubePos.faceType) {
                return {
                    ccw: false,
                    face: constants.RED
                }
            } else {
                return {
                    ccw: true,
                    face: yellowCubePos.faceType
                }
            }
        } else if(!constants.UTILS.oppositeFacing(whiteCubePos.facing, yellowCubePos.facing)) {
            return {
                ccw: yellowCubePos.facing === blueCubePos.facing,
                face: constants.RED
            }
        } else {
            return {
                ccw: constants.UTILS.counterClockwiseFacing(
                    constants.UTILS.facingFromTypeToType(yellowAdjacentType, yellowCubePos.faceType),
                    constants.UTILS.facingFromTypeToType(yellowAdjacentType, constants.RED) ),
                face: yellowAdjacentType
            }
        }
    }

    function placeGreen(blueCubePos, greenCubePos) {
        let oppositeBlue = constants.UTILS.oppositeFacing(blueCubePos.facing, greenCubePos.facing);
        let greenAdjacentType = constants.UTILS.getAdjacentType(greenCubePos.faceType, greenCubePos.facing);

        if(greenCubePos.faceType === constants.ORANGE) {
            let onTheSides = greenCubePos.facing === constants.LEFT || greenCubePos.facing === constants.RIGHT;
            if( onTheSides && !oppositeBlue ) {
                return {
                    ccw: constants.UTILS.clockwiseFacing(blueCubePos.facing, greenCubePos.facing),
                    face: constants.RED
                }
            } else if (!onTheSides && blueCubePos.facing !== greenCubePos.facing) {
                return {
                    ccw: constants.UTILS.counterClockwiseFacing(blueCubePos.facing, greenCubePos.facing),
                    face: constants.RED
                }
            } else {
                return {
                    ccw: false,
                    face: greenAdjacentType
                }
            }
        } else if(!oppositeBlue) {
            return {
                ccw: constants.UTILS.clockwiseFacing(blueCubePos.facing, greenCubePos.facing),
                face: constants.RED
            }
        } else if(constants.UTILS.oppositeFacing(greenCubePos.facing, constants.UTILS.facingFromTypeToType(greenCubePos.faceType, constants.RED))) {
            return {
                ccw: false,
                face: greenCubePos.faceType
            }
        } else {
            return {
                ccw: constants.UTILS.counterClockwiseFacing(
                    constants.UTILS.facingFromTypeToType(greenAdjacentType, greenCubePos.faceType),
                    constants.UTILS.facingFromTypeToType(greenAdjacentType, constants.RED) ),
                face: greenAdjacentType
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

            const blueCubePos = this.cube.findSideTilePosition(constants.RED, constants.BLUE);
            if(!blueInPlace(whiteCubePos, blueCubePos)) {
                return placeBlue(whiteCubePos, blueCubePos);
            }

            const yellowCubePos = this.cube.findSideTilePosition(constants.RED, constants.YELLOW);
            if(!yellowInPlace(blueCubePos, yellowCubePos)) {
                return placeYellow(whiteCubePos, blueCubePos, yellowCubePos);
            }

            const greenCubePos = this.cube.findSideTilePosition(constants.RED, constants.GREEN);
            if(!greenInPlace(greenCubePos)) {
                return placeGreen(blueCubePos, greenCubePos);
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