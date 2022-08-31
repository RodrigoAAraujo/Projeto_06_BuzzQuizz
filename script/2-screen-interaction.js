const mainElement = document.querySelector('.second-screen')
const section = document.querySelector('.second-screen section')


const response = axios.get(`${url}/9969`);
response.catch(()=>{
    location.reload();
})

response.then((response)=>{
    const quizz = response.data;
    console.log(quizz)
    createHeaderHTML(quizz)
    createQuizzAlternativesHTML(quizz)
})

function createHeaderHTML(quizz) {
    let imageElement = document.createElement("img");
    let headerImageContainer = document.querySelector('.bg-opacity')
    let headerH1 = document.querySelector('.quizz-header h1');
    
    headerH1.textContent = quizz.title;
    imageElement.src = quizz.image;
    headerImageContainer.appendChild(imageElement);
}

function createQuizzAlternativesHTML(quizz) {
    for (let question of quizz.questions){
        section.innerHTML +=
        `
        <div class="quizz-question-container">
            <div class="quizz-question">
                <h1>${question.title}</h1>
            </div>
            <div class="quizz-alternatives">
            </div>
        </div>
        `
        h1Container = document.querySelector('.quizz-question');
        h1Container.backgroundColor = question.color;

        let alternatives = document.querySelector('.quizz-alternatives');

        for(answer of question.answers) {
            let div = alternatives.appendChild(document.createElement('div'))
            let img = div.appendChild(document.createElement('img'))
            img.src = answer.image;
            img.classList.add('quizz-alternative-image')
            let text = div.appendChild(document.createElement('p'));
            text.textContent = answer.text;
        }


        // section.appendChild()
    }

}