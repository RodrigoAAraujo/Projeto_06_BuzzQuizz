let mainElement = document.querySelector('.second-screen')
let quizzHeader = document.querySelector('.quizz-header');


function getQuizzes() {
    const response = axios.get(url);
    response.catch(()=>{
        location.reload();
    })

    response.then((quizzes)=>{
        quizzHP = quizzes.data[3];

        createHTML(quizzHP);
    })

    
}

function createHTML(quizzHP) {
    let imageElement = document.createElement("img");
    imageElement.src = quizzHP.image;
    quizzHeader.appendChild(imageElement);

}