const otherQuizzes = document.querySelector(".first-screen .all-quizzes ul")
const myQuizzes = document.querySelector(".first-screen .my-quizzes ul")
let myQuizzesCreated = []
let alreadyHasQuiz = true


function getAndRenderQuizzes(){
    const responseGetQuizzes = axios.get(`${url}`)
    responseGetQuizzes.then((response)=>{
        response.data.forEach(element => {
            let quizId = element.id
            let quizImage = element.image
            let quizTitle = element.title

            if (myQuizzesCreated.length == 0 || myQuizzesCreated.forEach((element) => element =! quizId)){
                otherQuizzes.innerHTML += `
                <li class="${quizId}" onclick="enterQuiz()">
                    <h2>${quizTitle}</h2>
                    <img src="${quizImage}"></img>
                </li>
                `
            }else{
                alreadyHasQuiz = true
                myQuizzes.innerHTML += `
                <li class="${quizId}" onclick="enterQuiz()">
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

getAndRenderQuizzes()