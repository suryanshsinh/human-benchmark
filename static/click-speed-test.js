let currentScreen = 'start'
let mainTimeout
let clicksCount = 0
let totalTime = 10
let gameContainer = document.querySelector('main')
updateRippleButtons()

gameContainer.addEventListener('mousedown', (e) => {
    if (currentScreen !== 'end'){e.preventDefault()}
    if (e.isTrusted && e.button === 0) {
        if (currentScreen === 'clicking') {
            clicksCount++
        }
    }
})

gameContainer.addEventListener('contextmenu', event => event.preventDefault());

function clickScreen() {
    currentScreen = 'clicking'
    gameContainer.innerHTML = `
        <div class='w-full h-full flex justify-center items-center ripple-button'>
            <div class="flex justify-center items-center flex-col text-center max-w-lg gap-5 p-4">
                <div class="font-semibold text-5xl max-sm:text-4xl flex flex-col gap-4">
                    <div>Clicks: <span id="clicks">0</span></div><div>Timer: <span id="timer">10</span></div>
                </div>
                <p class="text-xl max-sm:text-lg">Keep clicking...</p>
            </div>
        </div>
    `
    updateRippleButtons()
    start = Math.round(performance.now())
    mainTimeout = setTimeout(() => {
        clearInterval(statsInterval)
        endScreen()
    }, totalTime * 1000)
    statsInterval = setInterval(() => {
        document.getElementById('clicks').innerHTML = clicksCount
        document.getElementById('timer').innerHTML = totalTime - Math.round((Math.round(performance.now()) - start)/1000)
    }, 10)
}

function endScreen() {
    currentScreen = 'end'
    score = clicksCount / totalTime
    score = score.toFixed(2)
    gameContainer.innerHTML = `
        <div class="flex flex-col justify-center items-center text-center max-w-lg gap-3 p-4">
            <h1 class="font-semibold text-6xl">${score} CPS</h1>
            <p class="text-xl">You clicked ${clicksCount} ${clicksCount === 1 ? 'time' : 'times'} in ${totalTime} seconds</p>
            <div class="flex gap-3">
                <button class="py-2 px-5 rounded text-center text-lg font bg-yellow-400 text-black font-semibold hover:bg-yellow-500 transition-all hover:shadow-lg shadow-md ripple-button" onclick="saveTest('clicking', ${score})">Save score</button>
                <button class="py-2 px-5 rounded text-center text-lg font bg-gray-100 text-black font-semibold hover:bg-gray-300 transition-all hover:shadow-lg shadow-md ripple-button" onclick="restartGame()">Try again</button>
            </div>
        </div>`
    updateRippleButtons()
}

function updateRippleButtons() {
    document.querySelectorAll('.ripple-button').forEach(button => {
        button.addEventListener('mousedown', function (e) {
            const circle = document.createElement('span');
            const diameter = Math.max(button.clientWidth, button.clientHeight);
            const radius = diameter / 2;
            circle.style.width = circle.style.height = `${diameter}px`;
            circle.style.left = `${e.clientX - button.offsetLeft - radius}px`;
            circle.style.top = `${e.clientY - button.offsetTop - radius}px`;
            circle.classList.add('ripple');
            button.appendChild(circle);
        });
    });
}

function restartGame() {
    clicksCount = 0
    startScreen()
}

function startScreen() {
    currentScreen = 'start'
    gameContainer.innerHTML = `
        <div class="flex flex-col justify-center items-center text-center max-w-lg gap-3 p-4">
            <h1 class="font-semibold text-6xl">Click Speed Test</h1>
            <p class="text-xl">Click as fast as you can in 10 seconds</p>
            <button class="py-2 px-5 rounded text-center text-lg font bg-yellow-400 text-black font-semibold hover:bg-yellow-500 transition-all hover:shadow-lg shadow-md ripple-button" onclick="clickScreen()">Start</button>
        </div>`
    updateRippleButtons()
}
