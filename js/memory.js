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


function flipCard(card) {
  card.classList.add('card--open');
  flippedCards.push(card);
  window.console.log('flipped', flippedCards);
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
    const misMatchedIcons = document.querySelectorAll('.card--open :not(.card--match)')
    setTimeout(() => {
      misMatchedIcons.forEach((misMatchedIcon) => {
        const misMastchedCard = misMatchedIcon.parentElement;
        misMastchedCard.classList.remove('card--open');
      })
    }, 1000);
  }
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

function setOrderOfCards() {
  let i = 0;
  cards.forEach((card) => {
    card.style.order = array[i]
    i++;
  })
};

function getRandomNumber() {
  const randomNumber = Math.floor(Math.random() * numberOfCards);
  return randomNumber;
};
