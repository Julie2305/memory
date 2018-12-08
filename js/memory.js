const cards = document.querySelectorAll('.card');
const numberOfCards = cards.length;
let array = [];

createRandomArray();
setOrderOfCards();

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
