const subScreen1 = document.querySelector(".sub-screen1")
const subScreen2 = document.querySelector("sub-screen2")
const subScreen3 = document.querySelector("sub-screen3")
const subScreen4 = document.querySelector("sub-screen4")
//Nando


































































































//Rodrigo
const subScreen1Fields = document.querySelectorAll(".sub-screen1 [required]")

let basicTraits = {}

function validateSub1(){
    let receive = subScreen1Fields
    basicTraits = { 
        title : receive[0].value,
        url: receive[1].value,
        question: receive[2].value,
        levels: receive[3].value
    }
    goQuestion()
}
function goQuestion(){
    subScreen1.classList.add("hidden")
    subScreen2.classList.remove("hidden")

}
    
function amountOfQuestions(){
    

}

function levelQuantity(){

}