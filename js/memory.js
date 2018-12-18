const cards = document.querySelectorAll('.card');
const retry = document.querySelector('.fa-repeat');
const finish = document.querySelector('.gameComplete');
const moveCounter = document.querySelector('.moveCounter');
const timer = document.querySelector('.timer');
const numberOfCards = cards.length;
let cardsOpen;
let flippedCards;
let moves;
let startTimer;

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
  moves = 0;
  let randomArray = createRandomArray();
  setOrderOfCards(randomArray);
  timer.innerHTML = '00:00:00';
  window.console.log('flip2')
}

function createRandomArray() {
  let array = [];
  let i = 0;
  while (i < numberOfCards) {
    let numberInArray = getRandomNumber()
    while (array.includes(numberInArray)) {
      numberInArray = getRandomNumber();
    }
    array.push(numberInArray)
    i++;
  }
  return array
};

function getRandomNumber() {
  const randomNumber = Math.floor(Math.random() * numberOfCards);
  return randomNumber;
};

function setOrderOfCards(randomArray) {
  let i = 0;
  cards.forEach((card) => {
    card.style.order = randomArray[i]
    i++;
  })
};

function flipCard(card) {
  if (moves === 0 && flippedCards.length === 0) {
    setTimer();
  }
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
  window.console.log(icons);
  if (icons[0] === icons[1]) {
    addMove();
    const matchedIcons = document.querySelectorAll(`.${icons[1]}`);
    setTimeout(() => {
      matchedIcons.forEach((matchedIcon) => {
        const matchedCard = matchedIcon.parentElement;
        matchedCard.classList.add('card--match')
        cardsOpen = false;
      })
    }, 200);
  }
  else {
    const misMatchedCards = document.querySelectorAll('.card--open:not(.card--match)')
    addMove();
    setTimeout(() => {
      misMatchedCards.forEach((misMatchedCard) => {
        misMatchedCard.classList.add('card--mismatch');
      });
    }, 200);
    setTimeout(() => {
      misMatchedCards.forEach((misMatchedCard) => {
        misMatchedCard.classList.remove('card--open', 'card--mismatch');
        cardsOpen = false;
      })
    }, 1000);
  }
  if (document.querySelectorAll('.card--match').length === numberOfCards) {
    finish.style.display = 'block';
  }
};

function resetBoard() {
  stopTimer();
  const openCards = document.querySelectorAll('.card--open');
  openCards.forEach((card) => {
    window.console.log('flip');
    card.className = '';
    card.classList.add('card');
  });
  finish.style.display = 'none';
  setUpBoard();
}

function addMove() {
  let loseStar = 13;
  moves++;
  moveCounter.innerHTML = `${moves} Moves`;
  if (moves === loseStar) {
    loseStar += 7;
    let star = document.querySelector('.star')
    star.classList.remove('star');
    star.classList.add('lostStar');
  }
}

function setTimer() {
  let time = { hours: 0, minutes: 0, seconds: 0 };
  let minutes = '00'
  let hours = '00' 
  let seconds, timeToDisplay;

  startTimer = setInterval(() => {
    time.seconds += 01;
    if (time.seconds < 10) {
      seconds = formatTime(time.seconds);
    } else {
      seconds = time.seconds;
    }
    if (time.seconds === 60) {
      time.seconds = 0;
      time.minutes += 1;
      minutes = formatTime(time.minutes)
    }
    if (time.minutes === 60) {
      time.minutes = 0;
      time.hours += 1;
      hours = formatTime(time.hours);      
    }

    timeToDisplay = `${hours}:${minutes}:${seconds}`;
    timer.innerHTML = timeToDisplay;

  }, 1000);
}

function formatTime(time) {
  return ('0' + time).slice(-2);
}

function stopTimer() {
  clearInterval(startTimer);
}
