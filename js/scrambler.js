const Scrambler = (function () {
    return class Scrambler {
        getRotation() {
            return {
                ccw: Math.random() < 0.5,
                face: Math.floor( Math.random() * 6 ) + 1
            }
        }

        isCompleted() {
            return constants.SCRAMBLE_CONST < Math.random();
        }
    }
})();