
const API_KEY ="";

const submitButton = document.querySelector('#submit');
const outputElement = document.querySelector("#output");
const inputElemnet = document.querySelector("#inputElement");
const historyElement = document.querySelector(".history");
const newChatElemente =document.querySelector("#new_Chat");


function onChangeInput(value){
    const inputElemnet = document.querySelector("#inputElement");
    inputElemnet.value=value;
}


async function getMessage(){

   if(inputElemnet.value==""){
    console.log("vide")
    return
   }

    try{
       const response = await fetch("https://api.openai.com/v1/chat/completions",{
            method:'POST',
            headers:{
                'Authorization':`Bearer ${API_KEY}`,
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                model:"gpt-3.5-turbo",
                messages:[{role:"user","content":inputElemnet.value}],
                max_tokens:100
            })
        })
        const data = await response.json();
        outputElement.textContent= data.choices[0].message.content
        if(data.choices[0].message.content){
         const pEl = document.createElement('p');
         pEl.textContent = inputElemnet.value;
         pEl.addEventListener('click',()=>onChangeInput(pEl.textContent));
         historyElement.append(pEl);
        }
    }catch(error){
       console.log(error);
    }
}

function newChat(){
    inputElemnet.value="";
}

submitButton.addEventListener('click',getMessage);
newChatElemente.addEventListener('click',newChat);