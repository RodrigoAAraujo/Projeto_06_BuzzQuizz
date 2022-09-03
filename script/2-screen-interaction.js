const mainElement = document.querySelector('.second-screen')
const section = document.querySelector('.second-screen section')
let correctAnswers = [];
let questionAmt = 0;
let correctAnswerAmt = 0;                                     

function createHeaderHTML(quizz) {
    let imageElement = document.createElement("img");
    let headerImageContainer = document.querySelector('.bg-opacity')
    let headerH1 = document.querySelector('.quizz-header h1');
    
    headerH1.textContent = quizz.title;
    imageElement.src = quizz.image;
    headerImageContainer.appendChild(imageElement);
}

function createQuizzQuestions(quizz) {  
    let i = 0;
    let h1Container;
    let answersHTML;
    let alternatives;

    for (let question of quizz.questions){
        // Gera o HTML  
        section.innerHTML +=
        `
        <div class="quizz-question-container" id='quizz-question-container-${i}'>
            <div class='quizz-question' id='quizz-question-${i}'>
                <h1>${question.title}</h1>
            </div>
            <div class="quizz-alternatives" id='quizz-alternative-${i}'>
            </div>
        </div>
        `
        // Pega as cores de cada pergunta e joga no HTML
        h1Container = document.querySelector(`#quizz-question-${i}`);
        h1Container.style.backgroundColor = question.color;

        // Gera e embaralha as respostas
        answersHTML = pushAnswers(question.answers);
        answersHTML.sort(()=> Math.random() - 0.5);
        
        // Coloca as respostas embaralhadas no HTML
        alternatives = document.querySelector(`#quizz-alternative-${i}`);
        for (let j = 0; j < answersHTML.length; j++) {
            alternatives.innerHTML += answersHTML[j];
        }

        questionAmt++;
        i++;
    }
}

function pushAnswers(answers) {
    let array = [];
    let i = 0;
    for(let answer of answers){
        
        array.push(
            `
            <div id="ans${i}" onclick='checkAnswer(this)'>
            <img class="quizz-alternative-image" src=${answer.image}>
            <p>${answer.text}</p>
            </div>
            `
        )
            
        // Aproveitando o Loop para inserir as resposta corretas em um array;
        if(answer.isCorrectAnswer === true){
            correctAnswers.push(`ans${i}`);
        }

        i++
    }
    return array;
}

function checkAnswer(clickedElement) {
    clickedElement.classList.add("selected");
    let quizzAlterntive = clickedElement.parentNode;
    let quizzId = quizzAlterntive.id.slice(-1);

    for (let child of quizzAlterntive.children) {
        child.classList.add('wrong-answer')
        
        // Coloca gradiente
        if(!child.classList.contains('selected')){
            child.classList.add('whitish-gradient')
        }

        // Checa se a resposta bate com a no array de respostas
        if(child.id === correctAnswers[quizzId]) {
            child.classList.remove('wrong-answer')
            child.classList.add('correct-answer')
        }
    }
    
    // Pega o Id do próximo elemento para dar um scrollIntoView
    let nextElementId = Number(quizzAlterntive.parentNode.id.slice(-1)) + 1;
    let nextElement = document.querySelector(`#quizz-question-container-${nextElementId}`);
    
    setTimeout(() => {
        if(nextElement) {
            nextElement.scrollIntoView({behavior: "smooth", block: "center"});
        } else{
            let answersAmt = document.querySelectorAll('.selected').length; 

            // Se respondeu tudo, exibe o resultado e scrolla no resultado
            if(answersAmt === questionAmt) {
                
                setTimeout(() => {
                    showResults();
                    let resultElement = document.querySelector('#results')
                    resultElement.scrollIntoView({behavior: "smooth", block: "center"});
                }, 2000);
            }
        }
    }, 2000);
    
    // Nao deixa mais o usuário clicar
    for (let child of quizzAlterntive.children) {
        child.removeAttribute("onclick");
    }

}

function showResults() {
    let score = calculateScore();
    let resultLevel;
    for (let level of clickedQuizz.levels){
        if(score >= level.minValue){
            resultLevel = level;
        }
    }

    let elementNav = document.querySelector('nav')
    elementNav.classList.remove("hidden")
    let elementAside = document.querySelector('aside');
    elementAside.classList.remove("hidden")
    elementAside.innerHTML =
    `
    <div class="quizz-question-container" id='results'>
        <div class='quizz-question'>
            <h1>${score}% de acerto: ${resultLevel.title}</h1>
        </div>

        <div class="level-img-text">
            <img class="quizz-result-image" src=${resultLevel.image}>   
            <p>${resultLevel.text}</p>
        <div>
    </div
    `
}

function calculateScore() {
    const arrayQuizzes = document.querySelectorAll('.quizz-alternatives');
    
    for (let quizz of arrayQuizzes){
        for (let answer of quizz.children){
            if (answer.classList.contains("selected") && answer.classList.contains("correct-answer")){
                correctAnswerAmt ++;
            } 
        }
    }

    const score = Math.round((correctAnswerAmt / questionAmt)*100)
    return score;

}

function post() {   
    quizz = {
        title: "USE ESSE PARA TESTAR GET: o quao potterhead vc é?",
        image: "https://guiadoestudante.abril.com.br/wp-content/uploads/sites/4/2010/11/Hogwarts.jpeg",
        questions: [
            {
                title: "em qual animal olho-tonto transfigurou malfoy?",
                color: "#434CA0",
                answers: [
                    {
                        text: "gato",
                        image: "https://super.abril.com.br/wp-content/uploads/2020/09/04-09_gato_SITE.jpg?quality=90&strip=info&w=1024&resize=1200,800" ,
                        isCorrectAnswer: false
                    },
                    {
                        text: "rato",
                        image: "https://static.nationalgeographicbrasil.com/files/styles/image_3200/public/01-rat-friends-nationalgeographic_1162144.jpg?w=1600&h=900" ,
                        isCorrectAnswer: false
                    },
                    {
                        text: "sapo",
                        image: "https://www.infoescola.com/wp-content/uploads/2008/07/sapo-561077704.jpg" ,
                        isCorrectAnswer: false
                    },
                    {
                        text: "furao",
                        image: "https://www.infoescola.com/wp-content/uploads/2008/06/fur%C3%A3o_138806276.jpg" ,
                        isCorrectAnswer: true
                    }
                ]
            },

            {
                title: "qual dos objetos NAO é horcrux?",
                color: "#A0438D",
                answers: [
                    {   
                        text: "harry",
                        image: "https://static.wikia.nocookie.net/harrypotter/images/2/20/C93ced28e52082d80becd80a685e2766.jpg/revision/latest?cb=20201004232712&path-prefix=pt-br" ,
                        isCorrectAnswer: false
                    },
                    {
                        text: "livro monstro",
                        image: "https://img.clasf.com.br/2019/09/19/livro-dos-monstros-harry-potter-20190919213221.3947180015.jpg" ,
                        isCorrectAnswer: false
                    },
                    {
                        text: "anel de brinquedo",
                        image: "https://cf.shopee.com.br/file/5abbed73a0f94750707a9a38cc9eb29f" ,
                        isCorrectAnswer: true
                    },
                    {
                        text: "diadema",
                        image: "https://cf.shopee.com.br/file/4b4a06ac91333adeaddbcf86068db3ad" ,
                        isCorrectAnswer: false
                    }
                ]
            },

            {
                title: "qual é metade-bruxo(a)?",
                color: "#EC362D",
                answers: [
                    {   
                        text: "rony",
                        image: "https://static1.purebreak.com.br/articles/9/97/35/9/@/384519-de-harry-potter-prove-que-voce-sabe-t-diapo-4.jpg" ,
                        isCorrectAnswer: false
                    },
                    {
                        text: "hermione",
                        image: "https://epipoca.com.br/wp-content/uploads/2021/02/Hermione-Emma-Watson-em-Harry-Potter-Reproducao.jpg" ,
                        isCorrectAnswer: true
                    },
                ]
            }

        ],

        levels: [
            {
                title:"vc nao e bruxo",
                image:"https://i.pinimg.com/originals/42/8e/34/428e34c70768c48b138dd9a3b60b157b.jpg",
                text: 'patético melhore. patético melhore. patético melhore. patético melhore. patético melhore. patético melhore. patético melhore. patético melhore. patético melhore. patético melhore. patético melhore. patético melhore. patético melhore.',
                minValue: 0
            },
            {
                title:"voce é praticamente um aluno de hogwarts",
                image:"https://images-cdn.9gag.com/photo/aV3PzDn_700b.jpg",
                text: 'Parabéns Potterhead! Bem-vindx a Hogwarts, aproveite o loop infinito de comida e clique no botão abaixo para usar o vira-tempo e reiniciar este teste.',
                minValue: 50
            } ,
            {
                title:"PERFEITO! voce conjuraria facilmente um patrono",
                image:"https://static1.purebreak.com.br/articles/9/10/32/69/@/434382--harry-potter-quiz-qual-seria-o-seu-ex-opengraph_1200-2.jpg",
                text: "vc é o mais pica superior ao harry. vc é o mais pica superior ao harry. vc é o mais pica superior ao harry. vc é o mais pica superior ao harry. vc é o mais pica superior ao harry. vc é o mais pica superior ao harry. vc é o mais pica superior ao harry. vc é o mais pica superior ao harry.",
                minValue: 100
            } 
        ]
    }

    let response = axios.post(`${url}`, quizz);
    response.catch(0)

    response.then((a)=>{
        // console.log(a)
    })
} 

function resetQuizz() {
    correctAnswers = [];
    questionAmt = 0;
    correctAnswerAmt = 0;  

    mainElement.innerHTML =
    `
    <div class="quizz-header">
            <div class="bg-opacity">
                <!-- <img src="imagem-ilustrativa-dps-apago.jpeg" alt=""> -->
            </div>
                <h1>teste</h1>
    </div>
            
    <div class="container">
        <section>
            <!-- Aqui ficam as perguntas -->
        </section>
        <aside class="hidden">
            <!-- Aqui fica o feedback final -->
        </aside>
        <nav class="hidden">
            <button id="btn-reset-quizz" onclick="resetQuizz()">Reiniciar quizz</button>
            <button id="btn-home" onclick="homeScreen()">Voltar pra home</button>
        </nav>
    </div>
    `
    console.log(clickedQuizz);
    createHeaderHTML(clickedQuizz);
    createQuizzQuestions(clickedQuizz);
}

function goHomeScreen() {
   location.reload();
}