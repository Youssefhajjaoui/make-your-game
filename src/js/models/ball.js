export class Ball {
    constructor(container) {
        this.container = container

        this.x = 0
        this.y = 0
        this.directionX = 0
        this.directionY = -1

        this.size = 15
        this.speed = 3

        this.event
        document.addEventListener('mousemove', (e) => {
            this.event = {
                x: e.clientX,
                y: e.clientY
            }
        })

        this.ball = this.createBall()
        this.lastSwitchTime
    }

    calculateHitDirection(ballRect, surface) {
        const surfacCentre = surface.x + surface.width / 2
        const ballCenter = ballRect.x + ballRect.width / 2
        const hitDifference = ballCenter - surfacCentre
        const maxAngle = Math.PI / 4

        return hitDifference / (surface.width / 2) * Math.sin(maxAngle)
    }

    changeDirection(surface) {
        const now = Date.now();

        if (!this.lastSwitchTime || now - this.lastSwitchTime >= 1000) {
            const ballRect = this.ball.getBoundingClientRect();

            if (
                ballRect.right >= surface.left &&
                ballRect.left <= surface.right &&
                ballRect.bottom > surface.top &&
                ballRect.top < surface.bottom
            ) {
                this.directionY *= -1
                this.directionX = this.calculateHitDirection(ballRect, surface)

                this.lastSwitchTime = now
            }
        }
    }


    checkCollision() {
        const rect = this.container.getBoundingClientRect()

        if (this.x <= rect.left || this.x + this.size >= rect.right) {
            this.directionX *= -1
        }
        if (this.y <= rect.top || this.y + this.size >= rect.bottom) {
            this.directionY *= -1
        }
    }

    move() {
        const bound = this.container.getBoundingClientRect()
        const paddleRect = document.querySelector('.paddle').getBoundingClientRect()

        let newPosX = this.x + (this.speed * this.directionX)
        let newPosY = this.y + (this.speed * this.directionY)

        // protecting from container
        if (newPosX < bound.left) newPosX = bound.left
        if (newPosX + this.size > bound.right) newPosX = bound.right - this.size
        if (newPosY - this.size < bound.top) {
            this.directionY *= -1
            newPosY = bound.top + this.size
        }

        this.x = newPosX
        this.y = newPosY
        this.ball.style.left = this.x + 'px'
        this.ball.style.top = this.y + 'px'

        this.changeDirection(paddleRect)
        this.checkCollision()
    }

    createBall() {
        const prevBall = document.querySelector('.ball')
        if (prevBall) {
            prevBall.remove()
        }
        const paddle = document.querySelector('.paddle')
        const ball = document.createElement('div')
        ball.classList.add('ball')
        const rect = paddle.getBoundingClientRect()

        ball.style.width = this.size + 'px'
        ball.style.height = this.size + 'px'

        const x = (rect.x + ((rect.width - this.size) / 2))
        const y = rect.y - rect.height

        ball.style.left = x + 'px'
        ball.style.top = y - this.size + 'px'

        this.x = x
        this.y = y - this.size

        this.container.appendChild(ball)
        return ball
    }

    setBallPosition(left, width) {
        const newPos = left + (width / 2) - (this.size / 2)
        this.x = newPos
        this.ball.style.left = newPos + 'px'
    }
}