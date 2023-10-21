const symbols = [
    'img/a.png',
    'img/b.png',
    'img/c.png',
    'img/d.png',
    'img/e.png',
    'img/f.png',
    'img/g.png',
    'img/h.png'
];

let cards = symbols.concat(symbols);
cards = shuffle(cards);

const gameBoard = document.getElementById('gameBoard');

/*
cards.forEach(symbol => {
    const card = document.createElement('div');
    card.className = 'game-card';
    card.dataset.symbol = symbol;
    card.textContent = '';
    card.addEventListener('click', flipCard);
    gameBoard.appendChild(card);
});
*/

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

let flippedCards = [];
let matchedCards = [];

function flipCard() {
    if (flippedCards.length < 2 && !flippedCards.includes(this) && !this.classList.contains('matched')) {
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
        matchedCards.push(card1, card2);
        card1.classList.add('matched');
        card2.classList.add('matched');

        if (matchedCards.length === cards.length) {
            alert('遊戲結束！恭喜你！');
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