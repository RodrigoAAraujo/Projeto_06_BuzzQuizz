/* Variáveis Padrões*/

const subScreen1 = document.querySelector(".sub-screen1")
const subScreen2 = document.querySelector(".sub-screen2")
const subScreen3 = document.querySelector(".sub-screen3")
const subScreen4 = document.querySelector(".sub-screen4")

const form1 = document.querySelector(".third-screen .sub-screen1 form")
const form2 = document.querySelector(".third-screen .sub-screen2 form")
const form3 = document.querySelector(".third-screen .sub-screen3 form")

const subScreen1Fields = document.querySelectorAll(".sub-screen1 [required]")
const subScreen2Fields = document.querySelectorAll(".sub-screen2 [required]")
const subScreen3Fields = document.querySelectorAll(".sub-screen3 [required]")

/* Variáveis de Informações dos formulários*/

let basicTraits = {}

/*funções em comum*/

function selectThis(){
    //Terminar isso
}



//------------Nando------------------------



/* Usa essa estrutura, é ela que ativa quando vc aperta o botão, só colocar o devido form, tira o "onSubmit" do form
    Como a gente não muda de página, fica na mesma, o onSubmit não funciona.


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
})
*/



/*  Eu montei aquela estrutura de selecionado ou não, é só usar 1 header e 1 footer 
    dentro daquela div que deixa branco, o header aparece quando tá selecionado e o 
    footer aparece quando não tá selecionado
    
    Obs: Pode pegar da minha aba lá tb (Já tá quase)

<div>
    <header>
            <h2>Pergunta ${i+1}</h2>
            <input type="text" min="20"placeholder="Texto da pergunta" required>
            <input type="color" placeholder="Cor de fundo da pergunta" required>
            <h2>Resposta correta</h2>
            <input type="text" min="1"placeholder="Resposta correta" required>
            <input type="url" placeholder="URL da imagem" required>
            <h2>Respostas incorretas</h2>
            <div class="wrong-answers">
                <input type="text" placeholder="Resposta incorreta 1" required>
                <input type="url" placeholder="URL da imagem 1" required>

                <div class="space"></div>

                <input type="text" placeholder="Resposta incorreta 2" required>
                <input type="text" placeholder="URL da imagem 2" required>

                <div class="space"></div>

                <input type="text" placeholder="Resposta incorreta 3" required>
                <input type="text" placeholder="URL da imagem 3" required>
            </div>
    </header>
    <footer>
        <h2>Pergunta ${i+1}</h2>
        <ion-icon name="create-outline" onclick(selectThis(this))></ion-icon>                    
    </footer>
</div>











*/















































































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
                <input type="text" min="1"placeholder="Resposta correta" required>
                <input type="url" placeholder="URL da imagem" required>
                <h2>Respostas incorretas</h2>
                <div class="wrong-answers">
                    <input type="text" placeholder="Resposta incorreta 1" required>
                    <input type="url" placeholder="URL da imagem 1" required>

                    <div class="space"></div>

                    <input type="text" placeholder="Resposta incorreta 2" required>
                    <input type="text" placeholder="URL da imagem 2" required>

                    <div class="space"></div>

                    <input type="text" placeholder="Resposta incorreta 3" required>
                    <input type="text" placeholder="URL da imagem 3" required>
                </div>
            </header>
            <footer>
                <h2>Pergunta ${i+1}</h2>
                <ion-icon name="create-outline" onclick(selectThis(this))></ion-icon>                    
            </footer>
        </div>
        
        `
    }
    form2.innerHTML += `
        <button>Prosseguir para criar perguntas</button> 
    `
}

form2.addEventListener("submit", event =>{
    event.preventDefault()
    //Terminar isso
})