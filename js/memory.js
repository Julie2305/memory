const board = document.querySelector('.board');
const cards = document.querySelectorAll('.card');
const retry = document.querySelector('.fa-repeat');
const finish = document.querySelector('.gameComplete');
const moveCounter = document.querySelector('.moveCounter');
const displayedTimer = document.querySelector('.timer');
const numberOfCards = cards.length;
let timeToDisplay;
let cardsOpen; // This variable is set to true when 2 cards are flipped, so during this stage you can not flip other cards because flipCard() will not be executed after a click.
let flippedCards; // When flippedCards has a length of 2, the logic of comparing the cards needs to be executed.
let moves;
let timer;

setUpBoard();

board.addEventListener('click', (card) => {
  if (card.target.classList.contains('card') && !cardsOpen && !card.target.classList.contains('card--open')) {
    flipCard(card.target)
  }
});

retry.addEventListener('click', () => {
  resetBoard();
})

function setUpBoard() {
  let randomArray = createRandomArray();
  cardsOpen = false;
  flippedCards = [];
  moves = 0;
  moveCounter.innerHTML = `${moves} Moves`;
  displayedTimer.innerHTML = '00:00:00';
  
  setOrderOfCards(randomArray);
}

function createRandomArray() {
  // I started this project before I read everything about it (some tips and tricks).
  // I therefore missed the tip about suffle(). So I created 3 functions to randomly set the order of the cards myself.
  // I know that the function createRandomArray() will not be very good for the performence when you have many many cards.
  // But it works perfectly for 16 cards and I was to proud that I have created this myself to replace it with a set suffle().
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
    // The timer starts after flipping the first card
    startTimer();
  }
  card.classList.add('card--open');
  flippedCards.push(card);
  if (flippedCards.length === 2) {
    checkFilppedCards();
    flippedCards = [];
  }
};

function checkFilppedCards() {
  const icons = []; //The icons array will be filled with the class names of the icons of the flipped cards so they can be compared. 
  
  cardsOpen = true;
  flippedCards.forEach((flippedCard) => {
    const icon = flippedCard.querySelector('.fa').classList;
    icons.push(icon[1]);
  })

  if (icons[0] === icons[1]) {
    const matchedIcons = document.querySelectorAll(`.${icons[1]}`);
  
    addMove();
    setTimeout(() => {
      // a timeout of 200ms is set to make the visuals of the flipping better. 
      matchedIcons.forEach((matchedIcon) => {
        const matchedCard = matchedIcon.parentElement;
        matchedCard.classList.add('card--match')
        cardsOpen = false;

        if (document.querySelectorAll('.card--match').length === numberOfCards) {
          stopTimer();
          let earnedStars = document.querySelectorAll('.fa-star').length;
          const congratulations = `<h3>Congratulations!</h3> 
          <p>You have earned ${earnedStars} stars by finshing this game in ${moves} moves.</p>
          <p>Time to finish the game: ${timeToDisplay}</p>
          <p>Press the restart button to play again</p>`;
          finish.innerHTML = congratulations;
          finish.style.display = 'block';
        }
      })
    }, 200);
  } else {
    const misMatchedCards = document.querySelectorAll('.card--open:not(.card--match)')
    
    addMove();
    setTimeout(() => {
      // a timeout of 200ms is set to make the visuals of the flipping better. 
      misMatchedCards.forEach((misMatchedCard) => {
        misMatchedCard.classList.add('card--mismatch');
      });
    }, 200);

    setTimeout(() => {
      // a timout of 1000ms is set so the player has time to check out the mismatched cards. 
      misMatchedCards.forEach((misMatchedCard) => {
        misMatchedCard.classList.remove('card--open', 'card--mismatch');
        cardsOpen = false;
      })
    }, 1000);
  }
}

function resetBoard() {
  const openCards = document.querySelectorAll('.card--open');

  stopTimer();
  openCards.forEach((card) => {
    card.className = '';
    card.classList.add('card');
  });
  finish.style.display = 'none'; // This is needed when the player presses the retry button after finishing the game. 
  setUpBoard();
}

function addMove() {
  let loseStar = 13;
  moves++;
  moveCounter.innerHTML = `${moves} Moves`;
  
  if (moves === loseStar) {
    loseStar += 7;
    let star = document.querySelector('.fa-star')
    star.classList.remove('fa-star');
    star.classList.add('fa-star-o');
  }
}

function startTimer() {
  let time = { hours: 0, minutes: 0, seconds: 0 };
  let minutes = '00'
  let hours = '00' 
  let seconds;

  timer = setInterval(() => {
    time.seconds += 01;
    if (time.seconds < 10) {
      // made an if condition, so this function will only be called when the second number is a single digit and then will be formatted into a double digit
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
    displayedTimer.innerHTML = timeToDisplay;

  }, 1000);
}

function formatTime(time) {
  return ('0' + time).slice(-2);
}

function stopTimer() {
  clearInterval(timer);
}