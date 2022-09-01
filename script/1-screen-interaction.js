const otherQuizzes = document.querySelector(".first-screen .all-quizzes ul")
const myQuizzes = document.querySelector(".first-screen .my-quizzes ul")
const FirstScreen = document.querySelector(".first-screen")
const SecondScreen = document.querySelector(".second-screen")
const ThirdScreen = document.querySelector(".third-screen")
let myQuizzesCreated = []
let alreadyHasQuiz = true
let clickedQuizz; // Adicionei uma variavel com o quizz que veio no axios.then pq preciso dele na tela 2 :)

function getAndRenderQuizzes(){
    const responseGetQuizzes = axios.get(`${url}`)
    responseGetQuizzes.then((response)=>{
        response.data.forEach(element => {
            let quizId = element.id
            let quizImage = element.image
            let quizTitle = element.title

            if (myQuizzesCreated.length == 0 || myQuizzesCreated.forEach((element) => element =! quizId)){
                otherQuizzes.innerHTML += `
                <li class="${quizId}" onclick="enterQuiz(this)">
                    <h2>${quizTitle}</h2>
                    <img src="${quizImage}"></img>
                </li>
                `
            }else{
                alreadyHasQuiz = true
                myQuizzes.innerHTML += `
                <li class="${quizId}" onclick="enterQuiz(this)">
                    <h2>${quizTitle}</h2>
                    <img src="${quizImage}"></img>
                </li>
                `
            }

            
        });
    })
    responseGetQuizzes.catch((error)=>{
        let status = error.response.data
        alert(status)
    })
    HasQuizzes()
}

function HasQuizzes(){
    const MyQuizDescription = document.querySelector(".first-screen .my-quizzes > div")
    const noQuizPop = document.querySelector(".first-screen .my-quizzes .no-quiz")
    if (alreadyHasQuiz == false){
        MyQuizDescription.classList.add("hidden")
        myQuizzes.classList.add("hidden")
        noQuizPop.classList.remove("hidden")
    }
}

function goCreateQuizz(){
    const FirstScreen = document.querySelector(".first-screen")
    const ThirdScreen = document.querySelector(".third-screen")

    FirstScreen.classList.add("hidden")
    ThirdScreen.classList.remove("hidden")
}

function enterQuiz(id){
    FirstScreen.classList.add("hidden")
    SecondScreen.classList.remove("hidden")
    let QuizzId = id.classList
    const response = axios.get(`${url}/${QuizzId}`);
    response.catch(()=>{
        location.reload();
    })
    
    response.then((response)=>{
        const quizz = response.data;
        createHeaderHTML(quizz)
        createQuizzQuestions(quizz)
        clickedQuizz = quizz;
    })
}

getAndRenderQuizzes()