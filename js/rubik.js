const rubik = (function () {
    let canvas = document.getElementById("rubik");
    let ctx = canvas.getContext("2d");
    let cube = new Cube();
    let solver = null;

    canvas.width = constants.WIDTH;
    canvas.height = constants.HEIGHT;

    function rotateCube(e, ccw) {
        cube.rotate(ccw, Math.floor(e.offsetX / constants.FACE_SIZE), Math.floor(e.offsetY / constants.FACE_SIZE));
    }

    canvas.addEventListener("click", function (e) {
        rotateCube(e, true);
        render();
    });
    canvas.addEventListener("contextmenu", function(e) {
        e.preventDefault();
        rotateCube(e, false);
        render();
        return false;
    }, false);

    function tick() {
        try {
            if (solver !== null) {
                cube.commandRotate(solver.getRotation(cube.getTileArray()));

                if(solver.isCompleted(cube.getTileArray())) {
                    solver = null;
                }
            }
        } catch (e) {
            console.error(e);
            solver = null;
        }
        render();
    }

    function render() {
        ctx.clearRect(0,0,canvas.width, canvas.height);
        cube.render(ctx);
    }

    let interval = window.setInterval(tick, constants.MS_BETWEEN_TICKS);

    return {
        setSolver: function setSolver(s) {
            solver = s;
        },
        logTileArray: function logTileArray() {
            console.log(cube.getTileArray());
        },
        logCube: function log() {
            console.log(JSON.stringify(cube));
        },
        getCube: function getCube() {
            return cube;
        },
        save: function save() {
            localStorage.setItem(constants.STORAGE_LOCATION, JSON.stringify(cube.getTileArray()));
        },
        load: function load() {
            cube.restoreFromTileArray(JSON.parse(localStorage.getItem(constants.STORAGE_LOCATION)));
        }
    }
})();

rubik.scramble = function scramble() {
    rubik.setSolver(new Scrambler());
};