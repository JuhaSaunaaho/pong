'use strict'
const newPuck = () => {
	const
		r = 12,
		startSpeed = 6
	let
		x = width / 2,
		y = height / 2,
		xspeed = 0,
		yspeed = 0,

		checkPaddle = (paddle) => {
			const puckForwardEdge = (paddle.isLeft) ? x - r : x + r,
				puckBehindPaddle = (paddle.isLeft)
					? puckForwardEdge < paddle.insideEdge
					: puckForwardEdge > paddle.insideEdge

			if (puckBehindPaddle) {
				const puckLowerEdge = y + r,
					puckUpperEdge = y - r,
					puckHitsPaddle = (paddle.lowerEdge > puckUpperEdge
						&& paddle.upperEdge < puckLowerEdge)

				if (puckHitsPaddle) {
					hits++
					const diff = y - paddle.center,
						angles = (paddle.isLeft)
							? { a: radians(-45), b: radians(45) }
							: { a: radians(225), b: radians(135) },
						angle = map(diff, 0, paddle.h, angles.a, angles.b),
						speedMultiplier = startSpeed * Math.log(hits + 2)
					xspeed = cos(angle) * speedMultiplier
					yspeed = sin(angle) * speedMultiplier
				}
			}
		},

		update = () => {
			x += xspeed
			y += yspeed
		},

		edges = () => {
			if (y < r) {
				yspeed *= -1
				y = r
			} else if (y > height - r) {
				y = height - r
				yspeed *= -1
			}
			if (x - r > width) {
				leftscore++
				reset()
			}
			if (x + r < 0) {
				rightscore++
				reset();
			}
		},

		show = () => {

			fill(255, 0, 255)
			// stroke(255)
			// ellipse(x, y, r * 2)

			rect(x, y, r * 2, r * 2, r * 0.9)
		},

		reset = () => {
			hits = 0
			x = width / 2;
			y = height / 2;

			let angle = random(-PI / 6, PI / 6)
			xspeed = startSpeed * Math.cos(angle)
			yspeed = startSpeed * Math.sin(angle)
			if (angle < 0) { xspeed *= -1 }

		}
	reset()

	return Object.freeze({
		getY: () => y,
		checkPaddle,
		show,
		edges,
		update
	})
}
