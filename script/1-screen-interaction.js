function getAndRenderQuizzes(){
    
    // Checa se o usuário tem quizzes criados e os renderiza
    let quizzesArray = JSON.parse(localStorage.getItem("userQuizzList"));
    if(quizzesArray.length != 0){
        console.log('entrou')

        myInterface.classList.remove("hidden")
        console.log(myInterface)
        myInterfaceUl.classList.remove('hidden')
        console.log(myInterfaceUl)
        noQuizz.classList.add('hidden')

        console.log(myQuizzes)
        const unserializedList =  JSON.parse(localStorage.getItem("userQuizzList"));
        myQuizzesCreated = unserializedList;

        unserializedList.forEach((quizzInfo) =>{
            const responseGetMyQuizzes = axios.get(`${url}/${quizzInfo.id}`)
            responseGetMyQuizzes.then((quizz)=>{
                myQuizzes.innerHTML += 
                
                `
                <li class="${quizz.data.id}" data-identifier="quizz-card">
                    <h2>${quizz.data.title}</h2>
                    <div onclick="enterQuiz(this)" class="gradient"></div>
                    <img src="${quizz.data.image}"></img>
                    <div class="deleteQuizzIcon" onclick="deleteQuiz(this)">
                        <ion-icon name="trash-outline"></ion-icon>
                    </div>
                </li>
                `
            })
        })
    }

    const responseGetQuizzes = axios.get(`${url}`)
    responseGetQuizzes.then((response)=>{
        response.data.forEach(element => {
            let quizId = element.id
            let quizImage = element.image
            let quizTitle = element.title

            // nao entenedi pq precisava desse if, entao tirei kkkk
            // if (myQuizzesCreated.length == 0 || myQuizzesCreated.forEach((element) => element =! quizId)){
                otherQuizzes.innerHTML += `
                <li class="${quizId}" data-identifier="quizz-card">
                    <h2>${quizTitle}</h2>
                    <div onclick="enterQuiz(this)" class="gradient"></div>
                    <img src="${quizImage}"></img>
                </li>
                `
            // }

            // movi pra cima pq nao precisava estar dentro do forEach
            // if(localStorage.getItem){
            //     myQuizzesCreated.forEach((element) =>{
            //         const responseGetMyQuizzes = axios.get(`${url}/${element}`)
            //         myQuizzes.innerHTML += `
            //         <li class="${quizId}" onclick="enterQuiz(this)" data-identifier="quizz-card">
            //             <h2>${quizTitle}</h2>
            //             <div class="gradient"></div>
            //             <img src="${quizImage}"></img>
            //         </li>
            //         `}
            //     )
            // }
            

            
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
    if (!localStorage.getItem("userQuizzList")){
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

function enterQuiz(id){
    let QuizzId = null
    
    if(!FirstScreen.classList.contains("hidden")){
        FirstScreen.classList.add("hidden")
        SecondScreen.classList.remove("hidden")
        QuizzId = id.parentNode.classList
    }else{
        QuizzId = id
        SecondScreen.innerHTML = `
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
                <button id="nav-btn-quizz" id="reset-quizz" onclick="resetQuizz()">Reiniciar quizz</button>
                <button id="nav-btn-home" id="btn-home" onclick="goHomeScreen()">Voltar pra home</button>
            </nav>
        </div>
        `
    }

    const response = axios.get(`${url}/${QuizzId}`);
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

function deleteQuiz(id){
    let quizzId = id.parentNode.classList
    quizzIdNumber = Number(quizzId[0])
    let theQuizCorrect;
    
    let unserializedList =  JSON.parse(localStorage.getItem("userQuizzList"));
    myQuizzesCreated = unserializedList;
    console.log(myQuizzesCreated)
    
    myQuizzesCreated.forEach((element) =>{
        if (element.id == quizzId){
            theQuizCorrect = element;
        }
    })

    for (let i = 0; i < myQuizzesCreated.length; i++) {
        console.log(myQuizzesCreated[i])
        if(myQuizzesCreated[i].id === quizzIdNumber){
            myQuizzesCreated.splice(i, 1);
        }
    }
    
    
    console.log(theQuizCorrect.key)
    
    // Deleta o quizz da API
    const deleteQuiz = axios.delete(`https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/${theQuizCorrect.id}`, {headers: {'Secret-Key': theQuizCorrect.key}})
    
    deleteQuiz.then(refreshPage)
    deleteQuiz.catch((error)=> console.log(error))
    
    // Deleta o quizz do localStorage 
    localStorage.setItem("userQuizzList", JSON.stringify(myQuizzesCreated))
}

function teste(){
    myQuizzesCreated =  JSON.parse(localStorage.getItem("userQuizzList"));
    console.log(myQuizzesCreated)
}

function refreshPage(){
    window.location.reload()
}

getAndRenderQuizzes()