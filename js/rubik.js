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
                cube.commandRotate(solver.getRotation(cube.getTileObj()));

                if(solver.isCompleted(cube.getTileObj())) {
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

    window.setInterval(tick, constants.MS_BETWEEN_TICKS);

    return {
        setSolver: function setSolver(s) {
            solver = s;
        },
        logTileObject: function logTileObject() {
            console.log(cube.getTileObj());
        },
        save: function save() {
            localStorage.setItem(constants.STORAGE_LOCATION, JSON.stringify(cube.getTileObj()));
        },
        load: function load() {
            cube.restoreFromTileObj(JSON.parse(localStorage.getItem(constants.STORAGE_LOCATION)));
            render();
        },
        reset: function reset() {
            cube = new Cube();
            render();
        }
    }
})();

rubik.scramble = function scramble() {
    rubik.setSolver(new Scrambler());
};