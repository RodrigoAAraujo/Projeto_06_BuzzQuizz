/* Variáveis Padrões*/

const subScreen1 = document.querySelector(".sub-screen1")
const subScreen2 = document.querySelector(".sub-screen2")
const subScreen3 = document.querySelector(".sub-screen3")
const subScreen4 = document.querySelector(".sub-screen4")

const form1 = document.querySelector(".third-screen .sub-screen1 form")
const form2 = document.querySelector(".third-screen .sub-screen2 form")
const form3 = document.querySelector(".third-screen .sub-screen3 form")

const subScreen1Fields = document.querySelectorAll(".sub-screen1 [required]")

let validation2 = document.querySelectorAll(".third-screen .sub-screen2 form .validation .maybe")


/* Variáveis de Informações dos formulários*/

let basicTraits = {}
let questionsInfo = []

/*funções em comum*/

function selectThis(option){
    let block =option.parentNode.parentNode
    const SelectedItem = block.parentNode.querySelector(".selected")
    
    if ( SelectedItem == null ){
        block.classList.add("selected")
    }else{
        SelectedItem.classList.remove("selected")
        block.classList.add("selected")
    }    

    let previousObject = block.previousElementSibling
    if(previousObject !== null){
        previousObject.scrollIntoView()
    }
}



//------------Nando------------------------










//Rodrigo


form1.addEventListener("submit", event =>{
    event.preventDefault()
    let receive = subScreen1Fields
    basicTraits = { 
        title : receive[0].value,
        url: receive[1].value,
        question: receive[2].value,
        levels: receive[3].value
    }
    subScreen1.classList.add("hidden")
    subScreen2.classList.remove("hidden")
    renderQuestions()
})

function renderQuestions(){
    console.log(basicTraits.question)
    for(let i = 0; i< basicTraits.question; i++){
        form2.innerHTML += `
        <div>
            <header>
                <h2>Pergunta ${i+1}</h2>
                <input type="text" min="20"placeholder="Texto da pergunta" required>
                <input type="color" placeholder="Cor de fundo da pergunta" required>
                <h2>Resposta correta</h2>
                <input type="text" min="1" placeholder="Resposta correta" required>
                <input type="url" placeholder="URL da imagem" required>
                <h2>Respostas incorretas</h2>
                <div class="wrong-answers">
                    <input type="text" min="1" placeholder="Resposta incorreta 1" required>
                    <input type="url" placeholder="URL da imagem 1" required>

                    <div class="space"></div>
                        
                    <div class="validation">
                        <input class="maybe" min="1" type="text" placeholder="Resposta incorreta 2">
                        <input class="maybe" type="url" placeholder="URL da imagem 2">
                    </div>

                    <div class="space"></div>

                    <div class="validation">
                        <input class="maybe" min="1" type="text" placeholder="Resposta incorreta 3">
                        <input class="maybe" type="url" placeholder="URL da imagem 3">
                    </div>
                </div>
            </header>
            <footer>
                <h2>Pergunta ${i+1}</h2>
                <ion-icon name="create-outline" onclick="selectThis(this)"></ion-icon>                    
            </footer>
        </div>
            
    `
    }
    form2.innerHTML += `
        <button>Prosseguir para criar perguntas</button> 
    `
}

/*validation2.addEventListener("input", (objElement) => {
        console.log("Entro")

        if (objElement.value != ""){
            let all = objElement.parentNode.children
                                
            for(let i = 0; i < all.length; i++){
                all[i].setAttribute("required", "required")
            }

        }
    }
)
*/

form2.addEventListener("submit", event =>{
    event.preventDefault()

    let individualQuestion = document.querySelectorAll(".sub-screen2 header")

    individualQuestion.forEach((element) => {
        
        let receive = element.querySelectorAll("[required]")

        requiredQuestions = { 
            questionText : receive[0].value,
            questionColor: receive[1].value,
            correctQuestion: receive[2].value,
            correctQuestionImage: receive[3].value,
            wrongQuestion: receive[4].value,
            wrongQuestionImage: receive[5].value
        }
        if (receive[6]!= null){
            optionalQuestion1 = {
                wrongQuestion1: receive[6].value,
                wrongQuestionImage1: receive[7].value
            }

            Object.assign(requiredQuestions, optionalQuestion1)
        }
        if (receive[8]!= null){
            optionalQuestion2 = {
                wrongQuestion1: receive[8].value,
                wrongQuestionImage1: receive[9].value
            }

            Object.assign(requiredQuestions, optionalQuestion2)
        }
        questionsInfo.push(requiredQuestions)
        console.log(requiredQuestions)
    })

    subScreen2.classList.add("hidden")
    subScreen3.classList.remove("hidden")
    renderLevels()
})


function renderLevels(){
    for(let i = 0; i< basicTraits.levels; i++){
        form3.innerHTML += `
            <div>
                <header>
                    <h2>Nível ${i+1}</h2>
                    <input type="text" min="10" placeholder="Título do nível" required>
                    <input type="number" min="0" max="100" placeholder="% de acerto mínima" required>
                    <input type="url" placeholder="URL da imagem do nível" required>
                    <textarea cols="30" rows="10" placeholder="Descrição do Nível"></textarea>
                </header>
                <footer>
                    <h2>Nível ${i+1}</h2>
                    <ion-icon name="create-outline" onclick="selectThis(this)"></ion-icon>                    
                </footer>
            </div>
        `
    }
    form3.innerHTML += `
        <button>Finalizar Quizz</button> 
    `

}