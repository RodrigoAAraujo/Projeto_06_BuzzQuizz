const url = "https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes";

const otherQuizzes = document.querySelector(".first-screen .all-quizzes ul")
const myQuizzes = document.querySelector(".first-screen .my-quizzes ul")
const myInterface = document.querySelector('.my-interface')
const noQuizz = document.querySelector('.no-quiz')
const myInterfaceUl = document.querySelector('.my-quizzes ul')
const FirstScreen = document.querySelector(".first-screen")
const SecondScreen = document.querySelector(".second-screen")
const ThirdScreen = document.querySelector(".third-screen")
let myQuizzesCreated = []
let clickedQuizz; 