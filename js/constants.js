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
        MS_BETWEEN_TICKS: 500,
        FACE_SIZE: TILE_SIZE * TILES_PER_FACE,
        TILE_SIZE: TILE_SIZE,
        SCRAMBLE_CONST: 0.95,
        STORAGE_LOCATION: 'rubikscube'
    }
})();