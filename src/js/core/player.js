import { gameLogic } from "../main.js"
import { createContainers } from "../utils/maker.js"

export class Player {
    constructor(container) {
        this.container = container.container
        this.info = container.infos
        this.game

        this.health = 5
        this.score = 0
        this.level = 1
        this.stats = []

        this.menuDisplayed = false
        this.lobyDisplayed = false
    }

    loby() {
        if (!this.lobyDisplayed) {
            this.lobyDisplayed = true
            this.container.style.display = 'none'
            const replay = this.displayLoby()
            replay.addEventListener('click', () => {
                const newContainer = createContainers()
                gameLogic(newContainer, new Player(newContainer))
            })
        } else {
            document.querySelector('.loby')?.remove()
            this.container.style.display = 'block'
            this.lobyDisplayed = false
        }
    }

    menu() {
        if (!this.menuDisplayed) {
            this.menuDisplayed = true
            const [contin, restar] = this.displayMenu()
            document.body.classList.add('blur')
            return new Promise((resolve, reject) => {
                contin.addEventListener('click', () => {
                    this.removeMenu()
                    resolve(true)
                })
                restar.addEventListener('click', () => {
                    this.removeMenu()
                    reject()
                })
            })
        } else {
            this.removeMenu()
        }
    }

    displayMenu() {
        const menu = document.createElement('div')
        menu.classList.add('menu')
        menu.innerHTML = `
        <h1>menu game</h1>
        ${this.info.innerHTML}
        <div class="buttons">
            <button class="continue">continue</button>
            <button class="restar">restar</button>
        </div>
        `
        document.body.appendChild(menu)
        return [document.querySelector('.continue'), document.querySelector('.restar')]
    }

    displayLoby() {
        const loby = document.createElement('div')
        loby.classList.add('loby')
        loby.innerHTML = `
        <h1>game stats</h1>
        ${this.stats.map(val => `<br><h2>level: <span>${val.level}</span>  score: <span>${val.score}</span></h2><br>`)}
        <button class="replay">replay</button>
        `
        document.body.appendChild(loby)
        return document.querySelector('.replay')
    }

    removeMenu() {
        const menu = document.querySelector('.menu')
        if (menu) {
            menu.remove()
            document.body.classList.remove('blur')
        }
        this.menuDisplayed = false
    }

    setInfo(level, score, health) {
        this.level = level
        this.info.innerHTML = `
        <h1><span>Level</span> ${level ? level : this.level}<span>Score</span> ${score ? score : this.score}<span>Health</span> ${health ? health : this.health}</h1>
    `
    }

    incrementScore(num) {
        this.score += num
        this.setInfo(this.level, this.score)
    }
}