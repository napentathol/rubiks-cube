const us = {
    sodiumlabs: {
        solvers: {
            AbstractSolver: class {
                getRotation() {
                    throw "Get rotation not implemented!"
                }

                isCompleted() {
                    throw "Is completed not implemented!";
                }
            }
        }
    }
};