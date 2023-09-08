//https://opentdb.com/api.php?amount=10&category=27&difficulty=easy

function processAllInf(){
    
    let secondButton = document.querySelector('.thisButton')
    secondButton.addEventListener("click", ()=>{    
        let forTopic = document.querySelector('#category').value;
        let forDifficulty = document.querySelector('#difficulty').value;
        let forNumber = document.querySelector('#amount').value;
        getAllInf(forDifficulty, forNumber, forTopic)
    })
}

async function getAllInf(difficulty, number, topic){
    const response = await fetch(`https://opentdb.com/api.php?amount=${number}&category=${topic}&difficulty=${difficulty}`);
    const data = await response.json();
    console.log(data)
}
processAllInf()