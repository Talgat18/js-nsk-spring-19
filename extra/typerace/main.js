/* global location */
/* eslint no-restricted-globals: ["off", "location"] */
/* eslint max-len: ["off", "location"] */
/* eslint no-alert: ["off", "location"] */

// Globals
let time; // for dec timer

let score = 0;

let isPlaying; // boolean

let typedEntries = 0;

let secondsCounter = 0; // for wpm count

// DOM Elements
const quoteInput = document.querySelector('#quote-input'); // input
const currentQuote = document.querySelector('#current-quote'); // current text
const scoreDisplay = document.querySelector('#score');
const timeDisplay = document.querySelector('#time');
const message = document.querySelector('#message'); // correct or not
const seconds = document.querySelector('#seconds');
const wpmDisplay = document.querySelector('#wpm');
// const secondsCounterDisplay = document.querySelector("#secondsCounter");

const quotes = [
  "I'm going to make him an offer he can't refuse.",
  'A census taker once tried to test me. I ate his liver with some fava beans and a nice Chianti.',
  "Mama always said life was like a box of chocolates. You never know what you're gonna get.",
  "They may take our lives, but they'll never take our freedom!",
  'When you realize you want to spend the rest of your life with somebody, you want the rest of your life to start as soon as possible.',
  'May the Force be with you.',
  "You talkin' to me?",
  'The first rule of Fight Club is: You do not talk about Fight Club.',
  'Yippie-ki-yay, motherf—er!',
  'Houston, we have a problem.',
  "Mrs. Robinson, you're trying to seduce me, aren't you?",
  "You've got to ask yourself one question: 'Do I feel lucky?' Well, do ya punk?",
  'I love the smell of napalm in the morning.',
  "You don't understand! I could've had class. I could've been a contender. I could've been somebody, instead of a bum, which is what I am.",
  "Help me, Obi-Wan Kenobi. You're my only hope.",
  'Just when I thought I was out, they pull me back in.',
  'I love you the more in that I believe you had liked me for my own sake and for nothing else.',
  'The best and most beautiful things in the world cannot be seen or even touched - they must be felt with the heart.',
  'It is during our darkest moments that we must focus to see the light.',
  'Acknowledging the good that you already have in your life is the foundation for all abundance.',
  'Success is not final, failure is not fatal: it is the courage to continue that counts.',
  'Education is the most powerful weapon which you can use to change the world.',
  'Tell me and I forget. Teach me and I remember. Involve me and I learn.'
];

// Matching currentQuote to quoteInput
const matchQuotes = () => {
  if (currentQuote.innerHTML.includes(quoteInput.value)) {
    document.getElementById('quote-input').style.color = '';
  } else {
    document.getElementById('quote-input').style.color = 'red';
  }

  if (quoteInput.value === currentQuote.innerHTML) {
    message.innerHTML = 'Correct!';
    return true;
  }
  message.innerHTML = '';
  return false;
};

// Pick and show random quote
const showQuote = quote => {
  // Generate random index
  const randIndex = Math.floor(Math.random() * quote.length);
  // Output random quote

  currentQuote.innerHTML = quote[randIndex];
  time = Math.round(quote[randIndex].length / 3) + 1;
  seconds.innerHTML = time;
};

// Start matching
const startMatch = () => {
  if (matchQuotes()) {
    isPlaying = true;
    showQuote(quotes);
    quoteInput.value = '';
    score += 1;
  }
  if (score === -1) {
    scoreDisplay.innerHTML = 0;
  } else {
    scoreDisplay.innerHTML = score;
  }
};

// dec and inc timers
const countdown = () => {
  if (time > 0) {
    // dec
    time -= 1;
    // inc for wpm count
    secondsCounter += 1;
  } else if (time === 0) {
    isPlaying = false;
  }
  // show time
  timeDisplay.innerHTML = time;
  // secondsCounterDisplay.innerHTML = secondsCounter;
};

const checkStatus = () => {
  if (!isPlaying && time === 0) {
    message.innerHTML = 'Game Over!';
    score = -1;
    const result = confirm('Start again?');

    if (result) {
      location.reload();
    } else {
      time = -1;
    }
  }
};

const countTyped = () => {
  typedEntries = quoteInput.value.length;
};

const calcWPM = () => {
  const grossWPM = Math.round(
    typedEntries / 5 / (secondsCounter / 10 / 60) / 10
  );

  wpmDisplay.innerHTML = grossWPM;
};

// Initialize game
const init = () => {
  // Load random quote from array
  showQuote(quotes);
  // Start matching on word input
  quoteInput.addEventListener('input', startMatch);
  // Call countdown every second
  setInterval(countdown, 1000);
  // Check game status
  setInterval(checkStatus, 50);
  // Count Typed Sym
  setInterval(countTyped, 50);
  // Count wpm
  setInterval(calcWPM, 3000);
};

window.addEventListener('load', init());
