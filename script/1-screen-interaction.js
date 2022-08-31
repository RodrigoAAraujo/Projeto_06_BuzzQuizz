const otherQuizzes = document.querySelector(".first-screen .all-quizzes ul")
const myQuizzes = document.querySelector(".first-screen .my-quizzes ul")


const responseGetQuizzes = axios.get(`${url}`)

responseGetQuizzes.then((response)=>{
    response.data.forEach(element => {
        let quizId = element.id
        let quizImage = element.image
        let quizTitle = element.title

        otherQuizzes.innerHTML += `
        <li class="${quizId}">
            <h2>${quizTitle}</h2>
            <img src="${quizImage}">
        </li>
        `
    });
})