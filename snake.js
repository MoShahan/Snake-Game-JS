import { getInputDirection } from "./input.js"

export const SNAKE_SPEED = 1
const snakeBody = [{ x: 11, y: 11 }]
let newSegments = 0

export function updateSnake() {
  addSegs()
  const inputDirection = getInputDirection()
  for (let i = snakeBody.length - 2; i >= 0; i--) {
    snakeBody[i + 1] = { ...snakeBody[i] }
  }
  snakeBody[0].x += inputDirection.x
  snakeBody[0].y += inputDirection.y
}

export function drawSnake(gameBoard) {
  snakeBody.forEach(segment => {
    const snakeElem = document.createElement("div")
    snakeElem.style.gridColumnStart = segment.x
    snakeElem.style.gridRowStart = segment.y
    snakeElem.classList.add("snake")
    gameBoard.appendChild(snakeElem)
  })
}

export function onSnake(pos, ignoreHead = false) {
  return snakeBody.some((seg, i) => {
    if (ignoreHead && i === 0) return false
    return equalPos(seg, pos)
  })
}

function equalPos(pos1, pos2) {
  return pos1.x === pos2.x && pos1.y === pos2.y
}

export function expandSnake(amt) {
  newSegments += amt
}

function addSegs() {
  for (let i = 0; i < newSegments; i++) {
    snakeBody.push({ ...snakeBody[snakeBody.length - 1] })
  }
  newSegments = 0
}

export function getSnakeLength() {
  return snakeBody.length - 1
}

export function snakeCollision() {
  return onSnake(snakeBody[0], true)
}

export function getSnakeHead() {
  return snakeBody[0]
}
