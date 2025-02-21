let gameContainer = document.querySelector('main')
let currentScreen = 'start'
let mainTimeout
let level = 0
let number

gameContainer.addEventListener('click', (e) => {
    if (e.isTrusted && e.button === 0) {
        if (currentScreen === 'start') {
            nextLevel()
        }
    }
})

function checkAnswer(event) {
    event.preventDefault();
    let answer = parseInt(event.target.querySelector('input').value)
    if (answer === number) {
        clearTimeout(mainTimeout)
        nextLevel()
    } else {
        endScreen()
    }
}

function nextLevel() {
    level++
    // number = Math.round(Math.random() * Math.pow(10, level))
    number = Math.floor(Math.random() * (Math.pow(10, level) - Math.pow(10, level - 1))) + Math.pow(10, level - 1)
    testScreen(number)
    document.querySelector('.timer').style.animationDuration = (2000 + level*500 + 20) + 'ms'
    mainTimeout = setTimeout(() => {
        answerScreen()
    }, 2000 + level*500)
}

function restartGame() {
    level = 0
    startScreen()
}

function startScreen() {
    currentScreen = 'start'
    gameContainer.innerHTML = `
        <div class="flex flex-col justify-center items-center text-center max-w-lg gap-3 p-4">
            <h1 class="font-semibold text-6xl ">Memory Test</h1>
            <p class="text-xl">Click to start the game.</p>
        </div>`
}

function testScreen(number) {
    currentScreen = 'test'
    gameContainer.innerHTML = `
        <div class="flex flex-col justify-center items-center text-center max-w-lg gap-3 p-4">
            <h1 class="font-semibold text-6xl ">${number}</h1>
            <div class="h-1 w-20 rounded-full bg-[#8886] overflow-hidden">
                <div class="bg-white h-full w-full timer">
                </div>
            </div>
        </div>`
}

function answerScreen() {
    currentScreen = 'answer'
    gameContainer.innerHTML = `
    <form class="flex flex-col justify-center items-center text-center max-w-2xl w-full gap-5 p-4" onsubmit="checkAnswer(event)">
        <h1 class="font-semibold text-4xl max-sm:text-4xl">Do you remember the number?</h1>
        <p class="text-xl max-sm:text-lg">Press <code class="py-1 px-2 bg-[#0005] rounded text-md">enter</code> to submit.</p>
        <input type="number" class="outline-none py-4 px-6 rounded text-center text-3xl font-semibold w-full bg-[rgb(34,108,187)] appearance:textfield text-white" />
        <input type="submit" value="Submit" class="py-2 px-5 rounded text-center text-lg font bg-yellow-500 text-black" />
    </form>`
    gameContainer.querySelector('input').focus()
}

function endScreen() {
    currentScreen = 'end'
    gameContainer.innerHTML = `
        <div class="flex flex-col justify-center items-center text-center max-w-lg gap-5 p-4">
            <h1 class="font-semibold text-6xl ">Game Over</h1>
            <p class="text-xl">You completed ${level - 1} ${(level - 1 === 1) ? 'level' : 'levels'}.</p>
            <div class="flex gap-3">
                <button class="py-2 px-5 rounded text-center text-lg font bg-yellow-400 text-black font-semibold hover:bg-yellow-500 transition-all hover:shadow-lg shadow-md" onclick="saveTest('memory', ${level - 1})">Save score</button>
                <button class="py-2 px-5 rounded text-center text-lg font bg-gray-100 text-black font-semibold hover:bg-gray-300 transition-all hover:shadow-lg shadow-md" onclick="restartGame()">Try again</button>
            </div>
        </div>`
}