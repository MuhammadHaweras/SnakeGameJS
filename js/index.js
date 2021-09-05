let inpDir = { x: 0, y: 0 }
const foodSound = new Audio("../music/food.mp3")
const gameOverSound = new Audio("../music/gameover.mp3")
const moveSound = new Audio("../music/move.mp3")
const music = new Audio("../music/music.mp3")
let board = document.getElementById('board')
let scoreId = document.querySelector('.score')
let hiscoreBox = document.querySelector('.hi-score')

let score = 0
let speed = 1
let lastPaintTime = 0
let snakeArr = [
    { x: 13, y: 15 }
]
let food = { x: 6, y: 7 }
//Game Functions
const main = ctime => {
    window.requestAnimationFrame(main)
    // console.log(ctime)
    if ((ctime - lastPaintTime) / 100 < 1 / speed) {
        return
    }
    lastPaintTime = ctime
    gameEngine()

}

const isColide = snake => {
    for (let i = 1; i < snakeArr.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
        }
    }

    if (snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0) {
        return true;
    }

    return false;
}

const gameEngine = () => {
    //Part 1 : Updating snake array
    music.play()
    if (isColide(snakeArr)) {
        gameOverSound.play()
        music.pause()
        inpDir = { x: 0, y: 0 }
        alert("Game over!  Click Ok to continue.")
        snakeArr = [{ x: 13, y: 15 }]
        music.play()
        score = 0
    }


    if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
        foodSound.play()
        score += 1
        if (score > hiscoreval) {
            hiscoreval = score
            localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
            hiscoreBox.innerHTML = "High Score: " + hiscoreval
        }
        scoreId.innerHTML = "Score: " + score

        snakeArr.unshift({ x: snakeArr[0].x + inpDir.x, y: snakeArr[0].y + inpDir.y })

        let a = 2
        let b = 16
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) }
    }

    //Moving the snake

    for (let i = snakeArr.length - 2; i >= 0; i--) {

        snakeArr[i + 1] = { ...snakeArr[i] }
    }
    snakeArr[0].x += inpDir.x
    snakeArr[0].y += inpDir.y

    //Part 2 : Display snake and food
    // Display snake
    board.innerHTML = ""
    snakeArr.forEach((e, index) => {
        let snakeElement = document.createElement('div')
        snakeElement.style.gridRowStart = e.y
        snakeElement.style.gridColumnStart = e.x
        if (index === 0) {
            snakeElement.classList.add('head')

        } else {

            snakeElement.classList.add('snake')
        }
        board.appendChild(snakeElement)

    })

    // Display Food

    let foodElement = document.createElement('div')
    foodElement.style.gridRowStart = food.y
    foodElement.style.gridColumnStart = food.x
    foodElement.classList.add('food')
    board.appendChild(foodElement)


}



//Game Logic

window.requestAnimationFrame(main)

let hiscore = localStorage.getItem("hiscore")
if (hiscore === null) {
    hiscoreval = 0
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
} else {
    hiscoreval = JSON.parse(hiscore)
    hiscoreBox.innerHTML = "High Score: " + hiscore
}
window.addEventListener('keydown', event => {
    inpDir = { x: 0, y: 1 } //game start
    moveSound.play()
    switch (event.key) {
        case "ArrowUp":
            console.log("Up")
            inpDir.x = 0
            inpDir.y = -1

            break;
        case "ArrowDown":
            console.log("Down")
            inpDir.x = 0
            inpDir.y = 1

            break;
        case "ArrowLeft":
            console.log("Left")
            inpDir.x = -1
            inpDir.y = 0

            break;
        case "ArrowRight":
            console.log("Right")
            inpDir.x = 1
            inpDir.y = 0

            break;

        default:
            break;
    }
})
