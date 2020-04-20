export class View {
    constructor(gameWidth, gameHeight, onViewChange = () => { }) {
        this.gameWidth = gameWidth
        this.gameHeight = gameHeight
        this.container = document.getElementById('container')
        this.onViewChange = onViewChange
        this.setUp()
    }

    setUp() {
        //  set up will be callend on each view change, and it will calculate how many pixels
        // will the new cells be
        this.unitOnScreen = Math.min(
            width / this.gameWindth,
            height / this.gameHeight
        )
    }
}