
class Peice {

    constructor(i, j, black) {
        this.SIZE = 75;
        this.index = {i: i, j: j};
        this.pos = {x: i*this.SIZE, y: j*this.SIZE};
        this.black = black;
        this.image = image;
        this.moving = false;

    }

    getImage(x, w, h) {
        if (this.black) {
            this.image = spritesheet.get(x,85,w,h);
        } else {
            this.image = spritesheet.get(x,0,w,h);
        }
    }

    draw() {
        if (this.moving) {
            image(this.image, mouseX-(this.SIZE/2), mouseY-(this.SIZE/2), this.SIZE, this.SIZE);
        } else {
            image(this.image, this.pos.x, this.pos.y, this.SIZE, this.SIZE);
        }
        
    }

    move() {
        this.moving = false;
        if (this.isValidMove()) { 
            this.index.i = Math.floor(mouseX / this.SIZE);
            this.index.j = Math.floor(mouseY / this.SIZE);
            this.pos.x = this.index.i * this.SIZE;
            this.pos.y = this.index.j * this.SIZE;
        }
    }

    isValidMove() {
        return !(mouseX > this.SIZE*grid.SIZE || mouseY > this.SIZE*grid.SIZE); 
    }

    create() {

    }

    clicked() {
        if (mouseX < (this.pos.x+this.SIZE) && mouseX > this.pos.x && mouseY > this.pos.y && mouseY < (this.pos.y + this.SIZE)) {
            this.moving = true;
        }
    }
}

class King extends Peice {

    constructor(x, y, black) {
        super(x,y, black);
        this.getImage(0,85,85);
    }

    isValidMove() {
        if (super.isValidMove()) {
            if (Math.abs(Math.floor(mouseX / this.SIZE)-this.index.i) <= 1 && Math.abs(Math.floor(mouseY / this.SIZE)-this.index.j) <=1) {
                return true;
            }
        }

        return false;
    }
}

class Queen extends Peice {

    constructor(x, y, black) {
        super(x,y, black);
        this.getImage(85,85,85);
    }

    isValidMove() {
        if (super.isValidMove()) {
            let i = Math.floor(mouseX / this.SIZE);
            let j = Math.floor(mouseY / this.SIZE);

            if (i === this.index.i || j === this.index.j) {
                return true;
            }

            for (let k = 0; k < grid.SIZE; k++) {
                if (this.index.i - k === i && this.index.j - k === j) {
                    return true;
                }
                if (this.index.i - k === i && this.index.j + k === j) {
                    return true;
                }
                if (this.index.i + k === i && this.index.j - k === j) {
                    return true;
                }
                if (this.index.i + k === i && this.index.j + k === j) {
                    return true;
                }
            }
            
        }

        return false;
    }
}

class Rook extends Peice {

    constructor(x, y, black) {
        super(x,y, black);
        this.getImage(4*85,85,85);
    }

    isValidMove() {
        if (super.isValidMove()) {
            let i = Math.floor(mouseX / this.SIZE);
            let j = Math.floor(mouseY / this.SIZE);

            if (i === this.index.i || j === this.index.j) {
                return true;
            }
        }

        return false;
    }
}

class Bishop extends Peice {

    constructor(x, y, black) {
        super(x,y, black);
        this.getImage(2*85,85,85);
    }

    isValidMove() {
        if (super.isValidMove()) {
            let i = Math.floor(mouseX / this.SIZE);
            let j = Math.floor(mouseY / this.SIZE);

            for (let k = 0; k < grid.SIZE; k++) {
                if (this.index.i - k === i && this.index.j - k === j) {
                    return true;
                }
                if (this.index.i - k === i && this.index.j + k === j) {
                    return true;
                }
                if (this.index.i + k === i && this.index.j - k === j) {
                    return true;
                }
                if (this.index.i + k === i && this.index.j + k === j) {
                    return true;
                }
            }
        }

        return false;
    }
}

class Pawn extends Peice {

    constructor(x, y, black) {
        super(x,y, black);
        this.getImage(5*85,85,85);
        this.firstMove = true;
    }

    isValidMove() {
        if (super.isValidMove()) {
            let i = Math.floor(mouseX / this.SIZE);
            let j = Math.floor(mouseY / this.SIZE);
            let val = this.black ? 1 : -1;
            if ((j-this.index.j === val || (j-this.index.j === 2*val)) && i===this.index.i) {
                this.firstMove = false;
                return true;
            }
        }

        return false;
    }
}

class Knight extends Peice {

    constructor(x, y, black) {
        super(x,y, black);
        this.getImage(3*85,85,85);
    }

    isValidMove() {
        if (super.isValidMove()) {
            let i = Math.floor(mouseX / this.SIZE);
            let j = Math.floor(mouseY / this.SIZE);

            for (let k = -2; k <= 2; k ++) {
                if (k === 0) {
                    continue;
                }
                let l = 3 - Math.abs(k);

                if (this.index.i - k === i && this.index.j + l === j) {
                    return true;
                }
                if (this.index.i - k === i && this.index.j - l === j) {
                    return true;
                }
            }
        }

        return false;
    }
}