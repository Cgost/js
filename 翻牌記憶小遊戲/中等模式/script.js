// 計時器設定
let timerStarted = false; 
let timerInterval; 
let seconds = 0;

function startTimer() {
    timerInterval = setInterval(function() {
        seconds++;
        document.getElementById('timer').textContent = `遊玩時間: ${seconds} 秒`;
    }, 1000);
}

function stopTimer() {
    clearInterval(timerInterval);
}

// 卡牌設定
let flippedCards = [];
let matchedCards = [];

function flipCard() {
    playAudio("deal_cards1.mp3");
    
    if (flippedCards.length < 2 && !flippedCards.includes(this) && !this.classList.contains('matched')) {
        if (!timerStarted) {
            startTimer();
            timerStarted = true;
        }
        flippedCards.push(this);
        this.firstChild.src = `${this.dataset.symbol}`;
        this.classList.add('selected');

        if (flippedCards.length === 2) {
            setTimeout(checkMatch, 700);
        }
    }
}

function checkMatch() {
    const [card1, card2] = flippedCards;
    if (card1.dataset.symbol === card2.dataset.symbol) {
        playAudio("match.mp3");
        
        matchedCards.push(card1, card2);
        card1.classList.add('matched');
        card2.classList.add('matched');

        if (matchedCards.length === cards.length) {
            gameOver();
        }
    } else {
        card1.firstChild.src = card2.firstChild.src = '';
        card1.classList.remove('selected');
        card2.classList.remove('selected');
    }
    flippedCards = [];
}

function shuffle(array) {
    let currentIndex = array.length, randomIndex, tempValue;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        tempValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = tempValue;
    }
    return array;
}

function playAudio(voice) {
    const audio = document.createElement("audio");
    audio.src = `../voice/${voice}`;
    audio.play();
}

function restartGame() {
    flippedCards = [];
    matchedCards = [];
    
    cards = symbols.concat(symbols);
    cards = shuffle(cards);
    const gameBoard = document.getElementById('gameBoard');
    gameBoard.innerHTML = '';

    cards.forEach(symbol => {
        const card = document.createElement('div');
        card.className = 'game-card';
        card.dataset.symbol = symbol;
        const imgElement = document.createElement('img');
        imgElement.src = '';
        card.appendChild(imgElement);
        card.addEventListener('click', flipCard);
        gameBoard.appendChild(card);
    });

    stopTimer();
    timerStarted = false;
    seconds = 0;
    document.getElementById('timer').textContent = "翻開一張卡片以開始遊戲";

    const modal = document.getElementById('myModal');
    modal.style.display = 'none';
}

function gameOver() {
    stopTimer();
    timerStarted = false;
    
    playAudio("endGame.mp3");
    
    const modal = document.getElementById('myModal');
    const modalMessage = document.getElementById('modal-message');

    if (modal && modalMessage) {
        modalMessage.textContent = `遊戲結束！恭喜你！用時 ${seconds} 秒!`;
        modal.style.display = 'block';

        const closeButton = document.querySelector('.close');
        if (closeButton) {
            closeButton.addEventListener('click', function() {
                modal.style.display = 'none';
                restartGame();
            });
        }
    } else {
        console.error("Modal or modal message element not found!");
    }
}

// Main
const symbols = [
    '../img/earth.png',
    '../img/colck.png',
    '../img/bank.png',
    '../img/heart.png'
];

let cards = symbols.concat(symbols);
cards = shuffle(cards);
const gameBoard = document.getElementById('gameBoard');

cards.forEach(symbol => {
    const card = document.createElement('div');
    card.className = 'game-card';
    card.dataset.symbol = symbol;
    const imgElement = document.createElement('img');
    imgElement.src = '';
    card.appendChild(imgElement);
    card.addEventListener('click', flipCard);
    gameBoard.appendChild(card);
});