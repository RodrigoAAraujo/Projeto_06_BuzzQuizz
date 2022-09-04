/* Variáveis Padrões*/

const subScreen1 = document.querySelector(".sub-screen1") 
const subScreen2 = document.querySelector(".sub-screen2")   
const subScreen3 = document.querySelector(".sub-screen3")   
const subScreen4 = document.querySelector(".sub-screen4")   

const form1 = document.querySelector(".third-screen .sub-screen1 form")
const form2 = document.querySelector(".third-screen .sub-screen2 form")
const form3 = document.querySelector(".third-screen .sub-screen3 form")

const subScreen1Fields = document.querySelectorAll(".sub-screen1 [required]")




/* Variáveis de Informações dos formulários*/

let basicTraits = {}
let questionsBase = []
let levelsBase = []

/* Quizz criado (usado para o botao de acessar quizz após criado) */
let createdQuizz;

/*------funções em comum---------*/


function selectThis2(option){
    let block =option.parentNode.parentNode
    const SelectedItem = block.parentNode.querySelector(".selected")
    
    
    if ( SelectedItem == null ){
        block.classList.add("selected")
        
    }else{

        let validation = SelectedItem.querySelectorAll("header .validation")

        if(validation != null){


            if (validation[0].children[0].value != "" ||validation[0].children[1].value != ""){
            
                let all = validation[0].children
                                    
                for(let i = 0; i < all.length; i++){
                    all[i].setAttribute("required", "required")
                }
            } else if (validation[0].children[0].value == "" && validation[0].children[1].value == ""){
            
                let all = validation[0].children
                                    
                for(let i = 0; i < all.length; i++){
                    all[i].removeAttribute("required")
                }
            }
            
            
            if (validation[1].children[0].value != "" || validation[1].children[1].value != ""){
            
                let all = validation[1].children
                                    
                for(let i = 0; i < all.length; i++){
                    all[i].setAttribute("required", "required")
                }
            } else if (validation[1].children[0].value == "" && validation[1].children[1].value == ""){
            
                let all = validation[1].children
                                    
                for(let i = 0; i < all.length; i++){
                    all[i].removeAttribute("required")
                }
            }
        
        }

        let counter = 0
        currentSelected = block
        let requiredBlock = SelectedItem.querySelectorAll(`input`)
        
        requiredBlock.forEach((element) => {
            if(element.checkValidity()){
                counter ++
            }else{
                const fakeSubmitButton = block.parentNode.querySelector("button")
                fakeSubmitButton.click()
                SelectedItem.scrollIntoView({behavior: "smooth", block: "center"})
            }
        })
        if (counter == requiredBlock.length){
            block.classList.add("selected")
            SelectedItem.classList.remove("selected")
            block.scrollIntoView({behavior: "smooth", block: "center"})
        }
    }
}

function selectThis3(option){
    let block =option.parentNode.parentNode
    const SelectedItem = block.parentNode.querySelector(".selected")
    
    
    if ( SelectedItem == null ){
        block.classList.add("selected")
        
    }else{

        let counter = 0
        currentSelected = block
        let requiredBlock = SelectedItem.querySelectorAll(`input`)
        
        
        requiredBlock.forEach((element) => {
            if(element.checkValidity()){
                counter ++
            }else{
                const fakeSubmitButton = block.parentNode.querySelector("button")
                fakeSubmitButton.click()
                SelectedItem.scrollIntoView({behavior: "smooth", block: "center"})
            }
        })
        if (counter == requiredBlock.length){
            block.classList.add("selected")
            SelectedItem.classList.remove("selected")
            block.scrollIntoView({behavior: "smooth", block: "center"})
        }
    }    
}

function validateCurrent(){

    currentSelected = document.querySelector(".third-screen .sub-screen2 .selected")

    let validation = currentSelected.querySelectorAll("header .validation")


    if(validation != null){


        if (validation[0].children[0].value != "" ||validation[0].children[1].value != ""){
        
            let all = validation[0].children
                                
            for(let i = 0; i < all.length; i++){
                all[i].setAttribute("required", "required")
            }
        } else if (validation[0].children[0].value == "" && validation[0].children[1].value == ""){
        
            let all = validation[0].children
                                
            for(let i = 0; i < all.length; i++){
                all[i].removeAttribute("required")
            }
        }
        
        
        if (validation[1].children[0].value != "" || validation[1].children[1].value != ""){
        
            let all = validation[1].children
                                
            for(let i = 0; i < all.length; i++){
                all[i].setAttribute("required", "required")
            }
        } else if (validation[1].children[0].value == "" && validation[1].children[1].value == ""){
        
            let all = validation[1].children
                                
            for(let i = 0; i < all.length; i++){
                all[i].removeAttribute("required")
            }
        }
    }
}


/*------ Validations in Forms -----------*/

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
                        <input class="maybe" min="1" type="text" placeholder="Resposta incorreta 2 (opcional)">
                        <input class="maybe" type="url" placeholder="URL da imagem 2 (opcional)">
                    </div>

                    <div class="space"></div>

                    <div class="validation">
                        <input class="maybe" min="1" type="text" placeholder="Resposta incorreta 3 (opcional)">
                        <input class="maybe" type="url" placeholder="URL da imagem 3 (opicional)">
                    </div>
                </div>
            </header>
            <footer>
                <h2>Pergunta ${i+1}</h2>
                <ion-icon name="create-outline" onclick="selectThis2(this)" data-identifier="expand"></ion-icon>                    
            </footer>
        </div>
            
    `
    }
    form2.innerHTML += `
        <button onclick="validateCurrent()">Prosseguir para criar perguntas</button> 
    `
}

form2.addEventListener("submit", event =>{
    event.preventDefault()
    

    let individualQuestion = document.querySelectorAll(".sub-screen2 header")

    individualQuestion.forEach((element) => {
        
        let receive = element.querySelectorAll("[required]")


        requiredQuestions = { 
            title : receive[0].value,
            color: receive[1].value,
            answers : [],
        }

        let item = [
			{
				text: receive[2].value,
				image: receive[3].value,
				isCorrectAnswer: true
			},
			{
				text: receive[4].value,
				image: receive[5].value,
				isCorrectAnswer: false
			}
        ]

        if (receive[6]!= null){
            optionalQuestion1 = {
                wrongQuestion1: receive[6].value,
                wrongQuestionImage1: receive[7].value,
                isCorrectAnswer:false
            }

            item.push(optionalQuestion1)
        }
        if (receive[8]!= null){
            optionalQuestion2 = {
                wrongQuestion1: receive[8].value,
                wrongQuestionImage1: receive[9].value,
                isCorrectAnswer: false
            }

            item.push(optionalQuestion2)
        }
        requiredQuestions.answers = item

        questionsBase.push(requiredQuestions)
    })

    subScreen2.classList.add("hidden")
    subScreen3.classList.remove("hidden")
    renderLevels()
})


function renderLevels(){
    for(let i = 0; i< basicTraits.levels; i++){
        form3.innerHTML += `
            <div data-identifier="level">
                <header>
                    <h2>Nível ${i+1}</h2>
                    <div>
                        <input type="text" min="10" placeholder="Título do nível" required>
                        <span class="error"></span>
                    </div>
                    <div>
                        <input class="validatePercentage" type="number" min="0" max="100" placeholder="% de acerto mínima" required>
                        <span class="error"></span>
                    </div>
                    <div>
                        <input type="url" placeholder="URL da imagem do nível" required>
                        <span class="error"></span>
                    </div>
                    <div>
                        <textarea type="text" cols="30" rows="10" minlength="30" placeholder="Descrição do Nível" required></textarea>
                        <span class="error"></span>
                    </div>
                </header>
                <footer>
                    <h2>Nível ${i+1}</h2>
                    <ion-icon name="create-outline" onclick="selectThis3(this)" data-identifier="expand"></ion-icon>                    
                </footer>
            </div>
        `
    }
    form3.innerHTML += `
        <button>Finalizar Quizz</button> 
    `

}

form3.addEventListener("submit", event =>{    
    event.preventDefault()

    levelsBase = []


    let validation = false

    let individualLevel = document.querySelectorAll(".sub-screen3 header")

    individualLevel.forEach((element) => {
        
        let receive = element.querySelectorAll("[required]")
        LevelTraits = { 
            title: receive[0].value,
            image: receive[2].value,
            text: receive[3].value,
            minValue: Number(receive[1].value)
        } 
        levelsBase.push(LevelTraits)
    })

    const validationError = form3.querySelectorAll(".validatePercentage")
    validationError.forEach((element)=>{
        if (element.value == "0"){
            validation = true
        }
    })

    if (validation == true){
        postQuiz()
    }else{
        const validationErrorBlockSelected = form3.querySelector(".selected .validatePercentage")
        validationErrorBlockSelected.classList.add("problem")
        const Message = validationErrorBlockSelected.parentNode.querySelector(".error")
        Message.innerHTML =" Pelo menos uma das % tem que ser 0"
    }
})

function resetValidation(block){
    const fieldProblem = block.querySelectorAll("[required]")
    fieldProblem.forEach((element)=> {
        element.parentNode.querySelector(".error").innerHTML = ""
        if(element.classList.contains("problem")){
            element.classList.remove("problem")
        }

    })


}

/* -----Quizz Creation---------*/

function postQuiz(){


    let objectToSend= 
    {
        title: basicTraits.title,
        image: basicTraits.url,
        questions: questionsBase,
        levels: levelsBase
    }
    console.log(objectToSend)
    let promise = axios.post("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes" , objectToSend)

    promise.then(storageQuiz)
    promise.catch(problem)


}

function accessQuizz() {
    FirstScreen.classList.add("hidden")
    SecondScreen.classList.remove("hidden")
    ThirdScreen.classList.add("hidden")
    const response = axios.get(`${url}/${createdQuizz.id}`);
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

function storageQuiz(response){
    createdQuizz = response.data 
    if(localStorage.getItem("userQuizzList")){
        const unserializedList =  JSON.parse(localStorage.getItem("userQuizzList"))
        const quizzInfo = {
            id: response.data.id,
            title: response.data.title
        }
        unserializedList.push(quizzInfo)
        const serializedQuizz = JSON.stringify(unserializedList)
        localStorage.setItem("userQuizzList", serializedQuizz)

    } else {
        const quizzInfo = [
            {
                id: response.data.id,
                title: response.data.title
            }
        ]
        localStorage.setItem("userQuizzList", JSON.stringify(quizzInfo));
    }


    renderOwnQuiz()
}

function problem(error){
    console.log("problem")

}

function renderOwnQuiz(){
    subScreen3.classList.add("hidden")
    subScreen4.classList.remove("hidden")
    
    let OwnQuiz = document.querySelector(".third-screen .sub-screen4 .user-created-quizz")

    OwnQuiz.innerHTML = `
        <img src="${basicTraits.url}">
        <p>${basicTraits.title}</p>
    `
}
