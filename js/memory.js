const cards = document.querySelectorAll('.card');
const retry = document.querySelector('.fa-repeat');
const finish = document.querySelector('.gameComplete');
const numberOfCards = cards.length;
let cardsOpen; 
let flippedCards;
let array;
let moves;

setUpBoard();

cards.forEach((card) => {
  card.addEventListener('click', () => {
    if (!cardsOpen && !card.classList.contains('card--open')) {
      flipCard(card)
    }
  });
});

retry.addEventListener('click', () => {
  resetBoard();
})



function setUpBoard() {
  cardsOpen = false; 
  flippedCards = [];
  array = [];
  moves = 0;
  createRandomArray();
  setOrderOfCards();
}

function createRandomArray() {
  let i = 0;
  while (i < numberOfCards) {
    let numberInArray = getRandomNumber()
    while (array.includes(numberInArray)) {
      numberInArray = getRandomNumber();
    }
    array.push(numberInArray)
    i++;
  }
};

function getRandomNumber() {
  const randomNumber = Math.floor(Math.random() * numberOfCards);
  return randomNumber;
};

function setOrderOfCards() {
  let i = 0;
  cards.forEach((card) => {
    card.style.order = array[i]
    i++;
  })
};

function flipCard(card) {
  card.classList.add('card--open');
  flippedCards.push(card);
  if (flippedCards.length === 2) {
    checkFilppedCards();
    flippedCards = [];
  }
};

function checkFilppedCards() {
  cardsOpen = true;
  const icons = [];
  flippedCards.forEach((flippedCard) => {
    const icon = flippedCard.querySelector('.fa').classList;
    icons.push(icon[1]);
  })

  if (icons[0] === icons[1]) {
    addMove();
    const matchedIcons = document.querySelectorAll(`.${icons[1]}`);
    matchedIcons.forEach((matchedIcon) => {
      const matchedCard = matchedIcon.parentElement;
      matchedCard.classList.add('card--match')
      cardsOpen = false;
    })
  }
  else {
    const misMatchedCards = document.querySelectorAll('.card--open:not(.card--match)')
    addMove();
    misMatchedCards.forEach((misMatchedCard) => {
      misMatchedCard.classList.add('card--mismatch');
    });
    setTimeout(() => {
      misMatchedCards.forEach((misMatchedCard) => {
        misMatchedCard.classList.remove('card--open', 'card--mismatch');
        cardsOpen = false;
      })
    }, 1000);
  }
  if (document.querySelectorAll('.card--match').length === numberOfCards){
    finish.style.display = 'block'; 
  }
};

function resetBoard() {
  const openCards = document.querySelectorAll('.card--open');
  openCards.forEach((card) => {
    card.className = '';
    card.classList.add('card');
  });
  finish.style.display = 'none'; 
  setUpBoard();
}

function addMove() {
  moves++
  const moveCounter = document.querySelector('.moveCounter')
  moveCounter.innerHTML = `${moves} Moves`
  window.console.log(moveCounter);
}