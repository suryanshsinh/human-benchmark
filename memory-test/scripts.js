let gameContainer = document.querySelector('main')
let currentScreen = 'start'
let mainTimeout
let level = 1
let number

gameContainer.addEventListener('click', (e) => {
    if (e.isTrusted && e.button === 0) {
        if (currentScreen === 'start') {
            number = Math.round(Math.random() * Math.pow(10, level))
            testScreen(number)
            document.querySelector('.timer').style.animationDuration = (2000 + level*500 + 10) + 'ms'
            mainTimeout = setTimeout(() => {
                answerScreen()
            }, 2000 + level*500)
        } else if (currentScreen === 'answer') {

        }
    }
})

function checkAnswer(event) {
    event.preventDefault();
    let answer = parseInt(event.target.querySelector('input').value)
    if (answer === number) {
        level++
        number = Math.round(Math.random() * Math.pow(10, level))
        testScreen(number)
        document.querySelector('.timer').style.animationDuration = (2000 + level*500 + 10) + 'ms'
        mainTimeout = setTimeout(() => {
            answerScreen()
        }, 2000 + level*500)
    } else {
        gameContainer.innerHTML = `
        <div class="flex flex-col justify-center items-center text-center max-w-lg gap-3 p-4">
            <h1 class="font-semibold text-6xl ">Game Over</h1>
            <p class="text-xl">You reached level ${level}.</p>
            <button class="py-2 px-5 rounded text-center text-lg font bg-yellow-500 text-black" onclick="restartGame()">Restart</button>
        </div>`
    }
}

function restartGame() {
    level = 1
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
}