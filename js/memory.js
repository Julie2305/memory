const cards = document.querySelectorAll('.card');
const numberOfCards = cards.length;
let array = [];
let flippedCards = [];

createRandomArray();
setOrderOfCards();

cards.forEach((card) => {
  card.addEventListener('click', () => {
    if (!card.classList.contains('card--open')) {
      flipCard(card)
    }
  });
});

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
  const icons = [];
  flippedCards.forEach((flippedCard) => {
    const icon = flippedCard.querySelector('.fa').classList;
    icons.push(icon[1]);
  })

  if (icons[0] === icons[1]) {
    const matchedIcons = document.querySelectorAll(`.${icons[1]}`)
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
};