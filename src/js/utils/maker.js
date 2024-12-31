export const createContainers = () => {
    document.body.querySelectorAll('*').forEach(elem=>{
        elem.remove()
    })
    const gameMsg = makeDiv('game-msg', document.body)
    const infos = makeDiv('infos', document.body)
    const container = makeDiv('container', document.body)
    const brickContainer = makeDiv('bricks-container', container)
    const paddleContainer = makeDiv('paddle-container', container)
    const paddle = makeDiv('paddle', paddleContainer)
    return {
        gameMsg,
        infos,
        container,
        brickContainer,
        paddleContainer,
        paddle,
    }
}

const makeDiv = (divName, parent) => {
    const div = document.createElement('div')
    div.classList.add(divName)
    parent.appendChild(div)
    return div
}