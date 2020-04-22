const getRange = length => [...Array(length).keys()]

export class View {
    constructor(gameWidth, gameHeight, onViewChange = () => { }) {
        this.gameWidth = gameWidth
        this.gameHeight = gameHeight
        this.container = document.getElementById('container')
        this.onViewChange = onViewChange
        this.setUp()
        // addinf event listener  'resize
        window.addEventListener('resize', () => {
            const [child] = this.container.children
            if (child) {
                this.container.removeChild(child)
                // removing child from container, the child is canvas, so it can be replaced with new
                // container->smaller one
            }
            // init new setUp, that will basically create new smaller container according to requested width and height
            this.setUp()
            this.onViewChange()
        })

    }


    setUp() {
        //  set up will be callend on each view change, and it will calculate how many pixels
        // will the new cells be
        const { width, height } = this.container.getBoundingClientRect()
        this.unitOnScreen = Math.min(
            width / this.gameWidth,
            height / this.gameHeight
        )
        // new distance will be current distance * unitOnScreen
        this.projectDistance = distance => distance * this.unitOnScreen
        // new position will be current position* scale_by(this.unitOnScreen)
        this.projectPosition = position => position.scale_by(this.unitOnScreen)
        const canvas = document.createElement('canvas')
        // appending created cancas element to the this.container
        this.container.appendChild(canvas)
        // getContext 2d on canvas will probably make possible toappend some roprtiesto canvas
        this.context = canvas.getContext('2d')
        // setting width and heaight of the project to this.projectDistance(this.gameWidth)
        canvas.setAttribute('width', this.projectDistance(this.gameWidth))
        canvas.setAttribute('height', this.projectDistance(this.gameHeight))


    }
    // render new food,snake,score,bestScore
    render(food, snake, score, bestScore) {
        // first render the chess like container
        //  before adding new elements base variables must be cleared
        this.context.clearRect(
            0,
            0,
            this.context.canvas.width,
            this.context.canvas.height
        )
        // set up variables for the chess like context container
        this.context.globalAlpha = 0.2
        this.context.fillStyle = 'black'
        getRange(this.gameWidth).forEach(column =>
            getRange(this.gameHeight)
                // filter row where column+rown is not sudden number
                // for each not sudden row fillRect() with   column *this.unitOnScreen, row*this.unitOnScreen,this.unitOnScreen, and this.unitOnScreen
                .filter(row => (column + row) % 2 === 1)
                .forEach(row =>
                    this.context.fillRect(
                        column * this.unitOnScreen,
                        row * this.unitOnScreen,
                        this.unitOnScreen,
                        this.unitOnScreen
                    )
                )
        )
        this.context.globalAlpha = 1
        // take rust poition 
        const projectedFood = this.projectPosition(food)
        // this is needed for cirle rendering
        this.context.beginPath()
        // add arc to the context at specified location size etc
        this.context.arc(
            projectedFood.x,
            projectedFood.y,
            this.unitOnScreen / 2.5,
            0,
            2 * Math.PI
        )
        this.context.fillStyle = '#e74c3c'
        this.context.fill()
        // generate snake on the screen
        this.context.lineWidth = this.unitOnScreen
        this.context.strokeStyle = '#3498db'
        this.context.beginPath()
        snake
            // mapping snake to projext Project positon
            // get x,y 
            .map(this.projectPosition)
            // for each x,y draw a line in x,y location
            .forEach(({ x, y }) => this.context.lineTo(x, y))
        // draw the path located above
        this.context.stroke()
        document.getElementById('current-score').innerText = score
        document.getElementById('best-score').innerText = bestScore

    }


}