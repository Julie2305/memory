const cards = document.querySelectorAll('.card');
const retry = document.querySelector('.fa-repeat');
const finish = document.querySelector('.gameComplete');
const numberOfCards = cards.length;

setUpBoard();

cards.forEach((card) => {
  card.addEventListener('click', () => {
    if (!card.classList.contains('card--open')) {
      flipCard(card)
    }
  });
});

retry.addEventListener('click', () => {
  resetBoard();
})



function setUpBoard() {
  flippedCards = [];
  array = [];
  createRandomArray();
  setOrderOfCards();
}

function createRandomArray() {
  let i = 0;
  while (i < numberOfCards) {
    window.console.log('hallo')
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
  const icons = [];
  flippedCards.forEach((flippedCard) => {
    const icon = flippedCard.querySelector('.fa').classList;
    icons.push(icon[1]);
  })

  if (icons[0] === icons[1]) {
    const matchedIcons = document.querySelectorAll(`.${icons[1]}`);
    matchedIcons.forEach((matchedIcon) => {
      const matchedCard = matchedIcon.parentElement;
      matchedCard.classList.add('card--match')
    })
  }
  else {
    const misMatchedCards = document.querySelectorAll('.card--open:not(.card--match)')
    misMatchedCards.forEach((misMatchedCard) => {
      misMatchedCard.classList.add('card--mismatch');
    });
    setTimeout(() => {
      misMatchedCards.forEach((misMatchedCard) => {
        misMatchedCard.classList.remove('card--open', 'card--mismatch');
      })
    }, 1000);
  }
  if (document.querySelectorAll('.card--match').length === numberOfCards){
    gameComplete();
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

function gameComplete() {
  finish.style.display = 'block'; 
}