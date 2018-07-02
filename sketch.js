'use strict'

let leftscore = 0,
	rightscore = 0,
	puck,
	left,
	right,
	hits = 0,
	names = []

const movePaddleKeys = {
	a: 65,
	z: 90,
	upArr: 38,
	downArr: 40
}

// function preload() {
// 	const nameData = loadJSON("/libraries/names.json")
	
// 	console.log(nameData, Object.keys(nameData).length)
// 	// names[0] = nameData[floor(random(0, nameDataLength - 1))]
// 	// names[1] = nameData[floor(random(0, nameDataLength - 1))]
// }

function setup() {
	names = getNames()
	createCanvas(700, 400)
	puck = newPuck()
	left = newPaddle({isLeft: true, isComputerPlayer: true})
	right = newPaddle({isLeft: false, isComputerPlayer: false})
}

function draw() {

	background(50)
	const updatePaddle = (paddle) => {
		puck.checkPaddle(paddle.getState())
		const state = paddle.getState()
		if (!state.isComputerPlayer) {
			if (state.isLeft){
				if (keyIsDown(movePaddleKeys.a)) {
					paddle.move(-5)
				} else if( keyIsDown(movePaddleKeys.z)) {
					paddle.move(5)
				} else {
					paddle.move(0)
				}
			} else {
				if (keyIsDown(movePaddleKeys.upArr)) {
					paddle.move(-5)
				} else if( keyIsDown(movePaddleKeys.downArr)) {
					paddle.move(5)
				} else {
					paddle.move(0)
				}
			}
		}
		paddle.show()
		paddle.update()
	}
	updatePaddle(left)
	updatePaddle(right)

	puck.update()
	puck.edges()
	puck.show()

	fill(255)
	textSize(32)
	text(names[0] + " " + leftscore, 32, 40)
	text(rightscore + " " + names[1], width * 0.6, 40)

}

function keyPressed() {
	// console.log(key, keyCode)
	if (keyCode === ESCAPE) { noLoop() }
}

