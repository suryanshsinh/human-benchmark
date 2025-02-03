// const wordToggle = document.querySelector('.word-count-toggle')
// const timerToggle = document.querySelector('.timer-count-toggle')
// const wordCountContainer = document.querySelector('.word-count-container')
// const timerCountContainer = document.querySelector('.timer-count-container')

const words = 'picture else brother grow problem alone measure know medical court pull voice cell these come serious prevent more occur yard his over everyone street try order anything run might green actually deep ask bill all week develop start several site hear director raise west plant dark major chair send miss pick tax market after whom fund side factor star coach sure design allow age school arrive couple reach issue end talk guy water seek east red already i figure most instead fight up myself join lead foot protect smile just shake manage boy out matter appear color budget case hot one happy child down until place power rule visit ever move bad report for laugh law head once card class page speak idea minute serve tell ago write general series small base above read cold finger born mrs fear role mind fast other behind them far there heavy long time dinner nor must low anyone yet book single fly month option while meeting discuss during open woman when no kid claim bag song herself follow artist second hit interest turn suddenly however charge gun black none maybe finish show someone phone half feeling control action bank race simply who question onto quality leave like me die poor suffer peace prepare both choose little meet find give own some eight too believe air six often stock enjoy car certain tonight lot unit big another to take seat game policy career best why quite others middle state produce those season note tv us on near task cup man doctor teach morning get likely in lay project cause from call seem door happen as trouble true offer parent music push cost view leg process body cover still bring and table again letter today party then source camera girl skin than movie road stuff also animal him wife begin its sound piece cut always check stand let spring put hair each ability go chance purpose do hour lie husband number across arm seven though system answer full way only change vote stay main common need spend moment but very make standard what sign attack same word if degree early apply together test exist police people hang we live fine memory sell return heart wear respond blood or new section focus range work where forget year home at would of top night late field size outside bed admit step better be explain store will friend break thank deal five ball former father their term listen ahead line say mr many the wall item stop dream thus wish mean eat shot adult decide simple food per step share eat bad'.split(' ')

// let totalWords = 0
let totalTime = 30
let totalWords = 200

// if (wordToggle.classList.contains('active')) {
// 	totalWords = parseInt(
// 		document.querySelector('.word-count.active').dataset.count,
// 		10
// 	)
// } else {
// 	totalTime = parseInt(
// 		document.querySelector('.timer-count.active').dataset.count,
// 		10
// 	)
// }

// wordToggle.addEventListener('click', () => {
// 	addClass(wordToggle, 'active')
// 	removeClass(timerToggle, 'active')
// 	addClass(wordCountContainer, 'visible')
// 	removeClass(timerCountContainer, 'visible')
// 	totalWords = parseInt(
// 		document.querySelector('.word-count.active').dataset.count,
// 		10
// 	)
// 	removeClass(document.getElementById('game'), 'disable')
// 	gameRestart()
// })

// timerToggle.addEventListener('click', () => {
// 	addClass(timerToggle, 'active')
// 	removeClass(wordToggle, 'active')
// 	addClass(timerCountContainer, 'visible')
// 	removeClass(wordCountContainer, 'visible')
// 	totalTime = parseInt(
// 		document.querySelector('.timer-count.active').dataset.count,
// 		10
// 	)
// 	totalWords = 220
// 	gameRestart()
// })


// const wordCountButtons = document.querySelectorAll('.word-count')
// wordCountButtons.forEach(button => {
// 	button.addEventListener('click', () => {
// 		totalWords = parseInt(button.dataset.count, 10)
// 		removeClass(document.querySelector('.word-count.active'), 'active')
// 		addClass(button, 'active')
// 		gameRestart()
// 	})
// })


// const timerCountButtons = document.querySelectorAll('.timer-count')
// timerCountButtons.forEach(button => {
// 	button.addEventListener('click', () => {
// 		totalTime = parseInt(button.dataset.count, 10)
// 		removeClass(document.querySelector('.timer-count.active'), 'active')
// 		addClass(button, 'active')
// 		gameRestart()
// 	})
// })



let wordCount = 0
let totalKeystrokes = 0
let gameTimer = null
let gameStartTIme = 0
let totalGameTime = 0
let wrongLetterCount = 0
let correctWordCount = 0
let mistakeCount = 0


function getAccuracy () {
	const correctLetterCount = [...document.querySelectorAll('.letter.correct')]
		.length
	const typingAccuracy = Math.round(
		(correctLetterCount / totalKeystrokes) * 100
	)
	return typingAccuracy < 0 ? 0 : typingAccuracy
}

function getWpm () {
	const words = [...document.querySelectorAll('.word')]
	const lastTypedWord = document.querySelector('.word.current')
	const lastTypedWordIndex = words.indexOf(lastTypedWord)
	const typedWords = words.slice(0, lastTypedWordIndex + 1)
	const correctWords = typedWords.filter(word => {
		const letters = [...word.children]
		const correctTypedLetters = letters.filter(letter =>
			letter.classList.contains('correct')
		)
		const incorrectTypedLetters = letters.filter(letter =>
			letter.classList.contains('incorrect')
		)
		return (
			incorrectTypedLetters.length === 0 &&
			correctTypedLetters.length === letters.length
		)
	})
	correctWordCount = correctWords?.length || 0
	return correctWords?.length || 0
}

function gameStart () {
	gameTimer = setInterval(() => {
		if (!gameStartTIme) {
			gameStartTIme = new Date().getTime()
		}
		// if (timerToggle.classList.contains('active')) {
		document.getElementById('timer').innerHTML =
			totalTime -
			(Math.floor((new Date().getTime() - gameStartTIme) / 1000) + 1)
		if (
			totalTime - Math.floor((new Date().getTime() - gameStartTIme) / 1000) <=
			0
		) {
			gameOver()
		}
		// }
	}, 500)
}

function gameRestart () {
	removeClass(document.getElementById('game'), 'disable')
	clearInterval(gameTimer)
	document.getElementById('timer').innerHTML = ''
	document.getElementById('accuracy').innerHTML = ''
	document.getElementById('info-container').style.opacity = 0
	document.getElementById('other-info-container').style.opacity = 0
	totalKeystrokes = 0
	gameTimer = null
	gameStartTIme = 0
	wordCount = 0
	wrongLetterCount = 0
	correctWordCount = 0
	mistakeCount = 0

	newGame()
	const words = document.getElementById('words')
	words.style.marginTop = '0'
	const cursor = document.getElementById('cursor')
	const nextLetter = document.querySelector('.letter.current')
	const gameContainer = document.getElementById('game')
	if (nextLetter) {
		cursor.style.top = nextLetter.getBoundingClientRect().top - gameContainer.getBoundingClientRect().top + 2 + 'px'
		cursor.style.left = nextLetter.getBoundingClientRect().left - gameContainer.getBoundingClientRect().left - 6 + 'px'
	}
	// cursor.style.animation = 'blink 1s infinite'
}


function gameOver () {
	totalGameTime = Math.floor((new Date().getTime() - gameStartTIme) / 1000)
	// totalGameTime = totalGameTime > 100000 ? 0 : totalGameTime // for one word purpose
	clearInterval(gameTimer)
	addClass(document.getElementById('game'), 'disable')
	document.getElementById('timer').innerHTML = `time:${totalGameTime}`
	document.getElementById('accuracy').innerHTML = `accuracy:${getAccuracy()}%`
	document.getElementById('word-counter').innerHTML = `wpm:${Math.floor(
		(getWpm() / totalGameTime) * 60
	)}`
	document.getElementById('other-info-container').style.opacity = 1
	document.getElementById(
		'correct-word-count'
	).innerHTML = `typed words : <span> ${correctWordCount} </span>`
	document.getElementById(
		'mistake-count'
	).innerHTML = `mistakes : <span> ${mistakeCount} </span>`
	document.addEventListener('keydown', function (event) {
		if (event.key === 'Tab') {
			event.preventDefault()
			gameRestart()
		}
	})
}

function wordCounter () {
	wordCount += 1
	// if (wordToggle.classList.contains('active')) {
	// 	document.getElementById(
	// 		'word-counter'
	// 	).innerHTML = `${wordCount}/${totalWords}`
	// } else if (timerToggle.classList.contains('active')) {
	document.getElementById('word-counter').innerHTML = `${wordCount}`
	// }
}

function addClass (element, name) {
	element.classList.add(name)
}

function removeClass (element, name) {
	element.classList.remove(name)
}

function randomWord () {
	const randomIndex = Math.floor(Math.random() * (words.length - 1))
	return words[randomIndex]
}

function wordFormatter (word) {
	return `<div class='word'><span class="letter">${word
		.split('')
		.join('</span><span  class="letter">')}</span></div>`
}

function handleKeyDown (event) {
	if (document.querySelector('#game.disable')) {
		return
	}
	event.preventDefault()
	const inputKey = event.key
	const gameWords = document.getElementById('words')
	const currentLetter = document.querySelector('.letter.current')
	const currentWord = document.querySelector('.word.current')
	const expectedKey = currentLetter?.innerHTML || ' '
	const isInputLetter = inputKey.length === 1 && inputKey !== ' '
	const isInputSpace = inputKey === ' '
	const isInputBackspace = inputKey === 'Backspace'
	const isFirstLetter = currentLetter === currentWord.firstElementChild

	if (!gameTimer && isInputLetter) gameStart()
	if (isInputLetter) {
		totalKeystrokes += 1
		if (currentLetter) {
			addClass(
				currentLetter,
				inputKey === expectedKey ? 'correct' : 'incorrect'
			)
			removeClass(currentLetter, 'current')
			if (currentLetter.nextElementSibling) {
				addClass(currentLetter.nextElementSibling, 'current')
			}
			if (inputKey !== expectedKey) wrongLetterCount += 1
		} else {
			const incorrectLetter = document.createElement('span')
			incorrectLetter.innerHTML = inputKey
			incorrectLetter.className = 'letter incorrect extra'
			currentWord.appendChild(incorrectLetter)
			wrongLetterCount += 1
		}
		if (inputKey != expectedKey) {
			mistakeCount += 1
		}
		document.getElementById('info-container').style.opacity = '1'
	}
	if (currentLetter === gameWords.lastElementChild.lastElementChild) {
		if (inputKey === expectedKey) gameOver()
	}
	if (
		isInputSpace &&
		expectedKey !== gameWords.firstElementChild.firstElementChild.innerHTML
	) {
		if (expectedKey !== ' ') {
			const skippedLetters = [
				...document.querySelectorAll('.word.current .letter:not(.correct)')
			]
			skippedLetters.forEach(letter => {
				addClass(letter, 'skipped')
				totalKeystrokes += 1
			})
			addClass(currentLetter, 'skip-start')
		}

		if (currentLetter && currentLetter !== currentWord.firstElementChild) {
			removeClass(currentLetter, 'current')
			if (currentWord === gameWords.lastElementChild) {
				gameOver()
			}
		}
		if (currentWord.nextElementSibling) {
			if (currentLetter !== currentWord.firstElementChild) {
				removeClass(currentWord, 'current')
				addClass(currentWord.nextElementSibling, 'current')
				addClass(currentWord.nextElementSibling.firstElementChild, 'current')
				wordCounter()
			}
		}
	}
	if (
		isInputBackspace &&
		currentLetter !== gameWords.firstElementChild.firstElementChild
	) {
		if (currentLetter && isFirstLetter) {
			removeClass(currentWord, 'current')
			removeClass(currentLetter, 'current')
			addClass(currentWord.previousElementSibling, 'current')
			if (currentWord.previousElementSibling.lastElementChild) {
				let sibling = currentWord.previousElementSibling.lastElementChild
				while (sibling.classList.contains('skipped')) {
					if (sibling.classList.contains('skip-start')) {
						addClass(sibling, 'current')
						break
					}
					sibling = sibling.previousElementSibling
				}
			}
		}
		
		if (currentLetter && !isFirstLetter) {
			removeClass(currentLetter, 'current')
			addClass(currentLetter.previousElementSibling, 'current')
			removeClass(currentLetter.previousElementSibling, 'correct')
			removeClass(currentLetter.previousElementSibling, 'incorrect')
		}
		if (!currentLetter) {
			addClass(currentWord.lastElementChild, 'current')
			if (currentWord.lastElementChild.classList.contains('extra')) {
				currentWord.lastElementChild.remove()
			} else {
				removeClass(currentWord.lastElementChild, 'correct')
				removeClass(currentWord.lastElementChild, 'incorrect')
			}
		}
	}
	if (inputKey === 'Tab') {
		gameRestart()
		return
	}
	const cursor = document.getElementById('cursor')
	const gameContainer = document.getElementById('game')
	const nextLetter = document.querySelector('.letter.current')
	const nextWord = document.querySelector('.word.current')
	if (nextLetter) {
		cursor.style.top = nextLetter.getBoundingClientRect().top - gameContainer.getBoundingClientRect().top + 2 + 'px'
		cursor.style.left = nextLetter.getBoundingClientRect().left - gameContainer.getBoundingClientRect().left + 2 + 'px'
	} else {
		cursor.style.top = nextWord.getBoundingClientRect().top - gameContainer.getBoundingClientRect().top + 4.4 + 'px'
		cursor.style.left = nextWord.getBoundingClientRect().right - gameContainer.getBoundingClientRect().left + 2 + 'px'
		console.log(cursor.style.top)
	}
	cursor.style.animation = 'none'
	if (parseInt(cursor.style.top) > 50) {
		const words = document.getElementById('words')
		const marginTop = parseInt(words.style.marginTop || '0px')
		words.style.marginTop = marginTop - 45 + 'px'
		cursor.style.top = nextWord.getBoundingClientRect().top - gameContainer.getBoundingClientRect().top + 4.4 + 'px'
	}
	if (parseInt(cursor.style.top) < 1) {
		const words = document.getElementById('words')
		const marginTop = parseInt(words.style.marginTop || '0px')
		words.style.marginTop = marginTop + 45 + 'px'
		cursor.style.top = nextWord.getBoundingClientRect().top - gameContainer.getBoundingClientRect().top + 4.4 + 'px'
	}
}

function newGame () {
	const gameWords = document.getElementById('words')
	gameWords.innerHTML = ''
	
	for (let i = 0; i < totalWords; i++) {
		gameWords.innerHTML += ' ' + wordFormatter(randomWord())
	}
	addClass(document.querySelector('.word'), 'current')
	addClass(document.querySelector('.letter'), 'current')
	
	const typingArea = document.getElementById('game')
	window.addEventListener('DOMContentLoaded', () => {
		typingArea.focus()
	})
	window.addEventListener('keydown', () => {
		if (document.activeElement !== typingArea) typingArea.focus()
	})
	// if (wordToggle.classList.contains('active')) {
	// 	document.getElementById('word-counter').innerHTML = `0/${totalWords}`
	// } else if (timerToggle.classList.contains('active')) {
	document.getElementById('word-counter').innerHTML = `0`
	// }
	
	document.getElementById('game').addEventListener('keydown', handleKeyDown)
}

newGame()
