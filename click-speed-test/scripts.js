let currentScreen = 'start'
let mainTimeout
let clicksCount = 0
let totalTime = 10
let gameContainer = document.querySelector('main')

gameContainer.addEventListener('mousedown', (e) => {
    e.preventDefault()
    if (e.isTrusted && e.button === 0) {
        if (currentScreen === 'start') {
            clickScreen()
        } else if (currentScreen === 'clicking') {
            clicksCount++
        } else {
            endScreen()
        }
    }
})

gameContainer.addEventListener('contextmenu', event => event.preventDefault());

function clickScreen() {
    currentScreen = 'clicking'
    start = Math.round(performance.now())
    document.querySelector('main>div>div').innerHTML = '<div>Clicks: <span id="clicks">0</span></div><div>Timer: <span id="timer">10</span></div>'
    document.querySelector('main>div>p').innerHTML = 'Keep going...'
    mainTimeout = setTimeout(() => {
        clearInterval(statsInterval)
        endScreen()
    }, totalTime * 1000)
    statsInterval = setInterval(() => {
        document.getElementById('clicks').innerHTML = clicksCount
        document.getElementById('timer').innerHTML = totalTime - Math.round((Math.round(performance.now()) - start)/1000)
    }, 200)
}

function endScreen() {
    currentScreen = 'end'
    document.querySelector('main>div>div').innerHTML = `${clicksCount / totalTime} CPS`
    document.querySelector('main>div>p').innerHTML = `You clicked ${clicksCount} ${clicksCount === 1 ? 'time' : 'times'} in ${totalTime} seconds`

}

document.querySelectorAll('.ripple-button').forEach(button => {
    button.addEventListener('mousedown', function (e) {
        if (currentScreen !== 'end') {
            const circle = document.createElement('span');
            const diameter = Math.max(button.clientWidth, button.clientHeight);
            const radius = diameter / 2;
            circle.style.width = circle.style.height = `${diameter}px`;
            circle.style.left = `${e.clientX - button.offsetLeft - radius}px`;
            circle.style.top = `${e.clientY - button.offsetTop - radius}px`;
            circle.classList.add('ripple');
            button.appendChild(circle);
        }
    });
});