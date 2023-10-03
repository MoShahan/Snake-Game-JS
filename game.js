import { drawFood, updateFood } from "./food.js"
import { outsideGrid } from "./grid.js"
import { SNAKE_SPEED, drawSnake, getSnakeHead, getSnakeLength, snakeCollision, updateSnake } from "./snake.js"

let lastRenderTime = 0
const gameBoard = document.getElementsByClassName("game-board")[0]
const scoreTag = document.querySelector("h1")
let gameOver
let currentScore = 0
let highScores = localStorage.getItem("snake-highscore") ? JSON.parse(localStorage.getItem("snake-highscore")) : []
const highScoreTag = document.querySelector("h2")
highScoreTag.innerHTML = "Top 5 HighScores: " + highScores.join(", ")

function main(currentTime) {
  if (gameOver) {
    if (currentScore && !highScores.includes(currentScore)) {
      highScores.push(currentScore)
      highScores
        .sort((a, b) => {
          return a - b
        })
        .reverse()
      if (highScores.length > 5) {
        highScores.pop()
      }
      localStorage.setItem("snake-highscore", JSON.stringify(highScores))
    }
    if (confirm("GAME OVER")) {
      window.location = "/"
    }
    return
  }
  window.requestAnimationFrame(main)
  const secondsSinceLastRender = (currentTime - lastRenderTime) / 100
  if (secondsSinceLastRender < 1 / SNAKE_SPEED) return
  lastRenderTime = currentTime
  update()
  draw()
}

window.requestAnimationFrame(main)

function update() {
  updateSnake()
  currentScore = getSnakeLength()
  scoreTag.innerHTML = `Your Score: ${currentScore}`
  updateFood()
  checkDeath()
}

function draw() {
  gameBoard.innerHTML = ""
  drawSnake(gameBoard)
  drawFood(gameBoard)
}

function checkDeath() {
  gameOver = outsideGrid(getSnakeHead()) || snakeCollision()
}
