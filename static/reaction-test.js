let testCounter = 0
let gameContainer = document.querySelector('main')
let currentScreen = 'start'
let scores = []
let mainTimeout;

gameContainer.addEventListener('mousedown', e => {
    if (testCounter >= 5) {
        endScreen(avg(scores))
    } else {
        if (currentScreen === 'red') {
            tooSoonScreen()
            clearTimeout(mainTimeout)
        } else if (currentScreen === 'start' || currentScreen === 'blue' || currentScreen === 'tooSoon') {
            clearTimeout(mainTimeout)
            redScreen()
            mainTimeout = setTimeout(() => {
                greenScreen()
                start = performance.now()
            }, (Math.random() * 3000) + 2000)
        } else if (currentScreen === 'green') {
            end = performance.now()
            testCounter++
            blueScreen(Math.round(end-start))
            scores.push(Math.round(end-start))
        }
    }
})

const removeBg = (element) => {
    for (const bg of element.classList) {
        if (bg.startsWith('bg-')) {
            element.classList.remove(bg)
        }
    }
}

const redScreen = () => {
    currentScreen = 'red'
    removeBg(gameContainer)
    gameContainer.classList.add('bg-red-500')
    document.querySelector('main>div>p').innerHTML = ''
    document.querySelector('main>div>h1').innerHTML = 'Wait for green...'
}

const greenScreen = () => {
    currentScreen = 'green'
    removeBg(gameContainer)
    gameContainer.classList.add('bg-green-500')
    document.querySelector('main>div>p').innerHTML = ''
    document.querySelector('main>div>h1').innerHTML = 'Click now!'
}

const blueScreen = (time) => {
    currentScreen = 'blue'
    removeBg(gameContainer)
    gameContainer.classList.add('bg-blue-500')
    document.querySelector('main>div>p').innerHTML = ''
    document.querySelector('main>div>h1').innerHTML = `${time}ms`
}

const tooSoonScreen = () => {
    currentScreen = 'tooSoon'
    removeBg(gameContainer)
    gameContainer.classList.add('bg-blue-500')
    document.querySelector('main>div>p').innerHTML = ''
    document.querySelector('main>div>h1').innerHTML = 'Too soon!'
}

const endScreen = (score) => {
    currentScreen = 'end'
    removeBg(gameContainer)
    gameContainer.classList.add('bg-blue-500')
    document.querySelector('main>div>p').innerHTML = ''
    document.querySelector('main>div>h1').innerHTML = `${score}ms`
}

const avg = array => {
    sum = 0
    for (let element of array) {
        sum += element
    }
    return Math.round(sum / array.length)
}