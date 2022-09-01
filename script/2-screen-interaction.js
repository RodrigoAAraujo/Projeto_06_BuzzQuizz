const mainElement = document.querySelector('.second-screen')
const section = document.querySelector('.second-screen section')
const correctAnswers = [];

const response = axios.get(`${url}/10080`); /*Depois de testar, retirar essa parte do código.*/
response.catch(()=>{                        /*Eu implementei o seu código na 1-screen pra já direcionar pro quiz específico */
    location.reload();                      /* */
})                                          /* */

response.then((response)=>{                 /* */
    const quizz = response.data;            /* */
    console.log(quizz)                      /* */
    createHeaderHTML(quizz)                 /* */
    createQuizzQuestions(quizz)             /* */
})                                          

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
        let answersHTML = pushAnswers(question.answers);
        answersHTML.sort(()=> Math.random() - 0.5);
        
        // Coloca as respostas embaralhadas no HTML
        let alternatives = document.querySelector(`#quizz-alternative-${i}`);
        for (let i = 0; i < answersHTML.length; i++) {
            alternatives.innerHTML += answersHTML[i];
        }

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
    let nextElement = document.querySelector(`#quizz-question-container-${nextElementId}`)
    setTimeout(() => {
        nextElement.scrollIntoView({behavior: "smooth"});
    }, 2000);
    
    // Nao deixa mais o usuário clicar  
    for (let child of quizzAlterntive.children) {
        child.removeAttribute("onclick");
    }
    
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
                        text: "anel velho",
                        image: "https://a-static.mlcdn.com.br/800x560/anel-feminino-ouro-velho-ajustavel-com-pedras-de-acrilico-marrom-e-bege-kit-2pc-gk/acessoryoo2/2921p/ 6df9080d13c4d4cb7a6caada0fee5318.jpg" ,
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
                        image: "https://pm1.narvii.com/6434/d5c39b760fa02863487e50e38e4e4352e56a0db9_hq.jpg" ,
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
                title:"basico",
                image:"https://static.wikia.nocookie.net/harrypotter/images/2/20/C93ced28e52082d80becd80a685e2766.jpg/revision/latest?cb=20201004232712&path-prefix=pt-br",
                text: 'perguntas faceis',
                minValue: 0
            },
            {
                title:"medio",
                image:"https://static.wikia.nocookie.net/harrypotter/images/2/20/C93ced28e52082d80becd80a685e2766.jpg/revision/latest?cb=20201004232712&path-prefix=pt-br",
                text: 'perguntas medianas',
                minValue: 50
            } 
        ]
    }

    let response = axios.post(`${url}`, quizz);
    response.catch(0)

    response.then((a)=>{
        // console.log(a)
    })
} 