import { randomGridPos } from "./grid.js"
import { expandSnake, onSnake } from "./snake.js"

let food = getRandomFoodPos()
const EXPANSION = 1

export function updateFood() {
  if (onSnake(food)) {
    expandSnake(EXPANSION)
    food = getRandomFoodPos()
  }
}

export function drawFood(gameBoard) {
  const foodElem = document.createElement("div")
  foodElem.style.gridColumnStart = food.x
  foodElem.style.gridRowStart = food.y
  foodElem.classList.add("food")
  gameBoard.appendChild(foodElem)
}

function getRandomFoodPos() {
  let newPos
  while (newPos == null || onSnake(newPos)) {
    newPos = randomGridPos()
  }
  return newPos
}

