const constants = (function () {
    const TILES_PER_FACE = 3;
    const VERT_FACES = 4;
    const HORZ_FACES = 3;
    const TILE_SIZE = 50;
    const OFFSET = 5;

    return {
        OFFSET: OFFSET,
        TILE_LINE_WIDTH: 5,
        FACE_LINE_WIDTH: 1,

        HORZ_TILES: HORZ_FACES * TILES_PER_FACE,
        HORZ_FACES: HORZ_FACES,
        WIDTH: HORZ_FACES * TILES_PER_FACE * TILE_SIZE + OFFSET * 2,

        VERT_TILES: VERT_FACES * TILES_PER_FACE,
        VERT_FACES: VERT_FACES,
        HEIGHT: VERT_FACES * TILES_PER_FACE * TILE_SIZE + OFFSET * 2,

        TILES_PER_FACE: TILES_PER_FACE,
        FACE_SIZE: TILE_SIZE * TILES_PER_FACE,
        TILE_SIZE: TILE_SIZE,

        MS_BETWEEN_TICKS: 500,
        SCRAMBLE_CONST: 0.95,
        STORAGE_LOCATION: 'rubikscube',

        WHITE: 1,
        RED: 3,
        ORANGE: 4,
        YELLOW: 6,
        GREEN: 5,
        BLUE: 2,

        UP: "up",
        RIGHT: "right",
        DOWN: "down",
        LEFT: "left"
    }
})();

constants.COLOR_DATA = {
    white: {
        name:   'white',
        type:   constants.WHITE,
        up:     'orange',
        left:   'green',
        down:   'red',
        right:  'blue'
    },
    red: {
        name:   'red',
        type:   constants.RED,
        up:     'white',
        left:   'green',
        down:   'yellow',
        right:  'blue'
    },
    orange: {
        name:   'orange',
        type:   constants.ORANGE,
        up:     'yellow',
        left:   'green',
        down:   'white',
        right:  'blue'
    },
    yellow: {
        name:   'yellow',
        type:   constants.YELLOW,
        up:     'red',
        left:   'green',
        down:   'orange',
        right:  'blue'
    },
    green: {
        name:   'green',
        type:   constants.GREEN,
        up:     'white',
        left:   'orange',
        down:   'yellow',
        right:  'red'
    },
    blue: {
        name:   'blue',
        type:   constants.BLUE,
        up:     'white',
        left:   'red',
        down:   'yellow',
        right:  'orange'
    },
};

constants.TYPED_COLOR_DATA = {
    1: constants.COLOR_DATA.white,
    2: constants.COLOR_DATA.blue,
    3: constants.COLOR_DATA.red,
    4: constants.COLOR_DATA.orange,
    5: constants.COLOR_DATA.green,
    6: constants.COLOR_DATA.yellow
};

constants.UTILS = {
    facingFromTypeToType: function(from,to) {
        if(constants.TYPED_COLOR_DATA[from].up === constants.TYPED_COLOR_DATA[to].name) {
            return constants.UP;
        } else if(constants.TYPED_COLOR_DATA[from].right === constants.TYPED_COLOR_DATA[to].name) {
            return constants.RIGHT;
        } else if(constants.TYPED_COLOR_DATA[from].down === constants.TYPED_COLOR_DATA[to].name) {
            return constants.DOWN;
        } else if(constants.TYPED_COLOR_DATA[from].left === constants.TYPED_COLOR_DATA[to].name) {
            return constants.LEFT;
        }
        throw "No facing from type! " + {
            from: from,
            to: to,
        }
    },
    counterClockwiseFacing: function(from, to) {
        return from === constants.UP        && to === constants.LEFT
            || from === constants.RIGHT     && to === constants.UP
            || from === constants.DOWN      && to === constants.RIGHT
            || from === constants.LEFT      && to === constants.DOWN;
    },
    clockwiseFacing: function(from, to) {
        return from === constants.UP        && to === constants.RIGHT
            || from === constants.RIGHT     && to === constants.DOWN
            || from === constants.DOWN      && to === constants.LEFT
            || from === constants.LEFT      && to === constants.UP;
    },
    oppositeFacing: function(from,to) {
        return from === constants.UP        && to === constants.DOWN
            || from === constants.RIGHT     && to === constants.LEFT
            || from === constants.DOWN      && to === constants.UP
            || from === constants.LEFT      && to === constants.RIGHT;
    },
    getAdjacentType: function(type, facing) {
        return constants.COLOR_DATA[constants.TYPED_COLOR_DATA[type][facing]].type;
    }
};