'use strict'
const newPaddle = (spec) => {
	const 
		w = 20,
		h = 100,
		conmputerPlayerSpeed = 6,
		isLeft = spec.isLeft,
		isComputerPlayer = spec.isComputerPlayer
	let
		x = (isLeft) ? w : width - w,
		y = height / 2,
		ychange = 0,
		move = (steps) => {
			ychange = steps
		},
		update = () => {
			y += ychange
			y = constrain(y, h / 2, height - h / 2)
			if (isComputerPlayer) {
				const pucky = puck.getY()
				if (Math.abs(pucky - y) > h / 2) {
					if (pucky > y) {
						move(conmputerPlayerSpeed)
					} else {
						move(-conmputerPlayerSpeed)
					}
				}
			}
		},
		show = () => {
			fill(0, 200, 0)
			rectMode(CENTER)
			if (isLeft) {
				rect(x, y, w, h, h, h, h, h)
			} else {
				rect(x, y, w, h, h, h, h, h)
			}
		}
	return Object.freeze({
		getState: () => {
			return {
				h,
				isLeft,
				isComputerPlayer,
				insideEdge: (isLeft) ? x + w / 2 : x - w / 2,
				lowerEdge: y + h / 2,
				upperEdge: y - h / 2,
				center: (y - h / 2),

			}
		},
		// getYchange: () => ychange,
		update,
		move,
		show,
	})
}
