//https://opentdb.com/api.php?amount=10&category=27&difficulty=easy

let rightAnswer;
let calculator = 0;
let queue = 0;
let secondButton;
let counter = 0;
function processAllInf(){
    
    secondButton = document.querySelector('.thisButton')
    secondButton.addEventListener("click", ()=>{  
        let forTopic = document.querySelector('#category').value;
        let forDifficulty = document.querySelector('#difficulty').value;
        let forNumber = document.querySelector('#amount').value;
        getAllInf(forDifficulty, forNumber, forTopic);
        secondButton.style.display = 'none';
    })
}

async function getAllInf(difficulty, number, topic){
    const response = await fetch(`https://opentdb.com/api.php?amount=${number}&category=${topic}&difficulty=${difficulty}&type=multiple`);
    const data = await response.json();
    updateQuiz(data);
}

function updateQuiz(data){
    document.querySelector("#question").innerText = `${data.results[0].question}`
    document.querySelector(".caution").style.display = "none";
    document.querySelector(".quizWrapper").style.display = "inline";
    rightAnswer = data.results[0].correct_answer;
    let wrongAnswer = data.results[0].incorrect_answers;
    let allAnswers = wrongAnswer;
    allAnswers.splice(Math.floor(Math.random()*(wrongAnswer.length + 1)),0, rightAnswer);
    document.querySelector('.answer1').innerText = allAnswers[0]
    document.querySelector('.answer2').innerText = allAnswers[1]
    document.querySelector('.answer3').innerText = allAnswers[2]
    document.querySelector('.answer4').innerText = allAnswers[3]
    let answer =  document.querySelectorAll('.answer').forEach((option) => {
        option.addEventListener("click", () => {
            
            if(queue === data.results.length-1){
                document.querySelector(".quizWrapper").style.display = "none";
                queue = 0;
                let win = document.querySelector('.win').innerText = `Congratulations! Your score is ${calculator}`;
                document.querySelector('.win').style.display = 'flex';
                document.querySelector('.nextQuestion').style.display = 'inline';
                document.querySelector('.nextQuestion').addEventListener('click', ()=>{
                    location.reload()
                })
                
            }
            if(option.innerText === data.results[queue].correct_answer){
                calculator++;
            }
            queue++;
            rightAnswer = data.results[queue].correct_answer;
            let wrongAnswer = data.results[queue].incorrect_answers;
            let allAnswers = wrongAnswer;
            allAnswers.splice(Math.floor(Math.random()*(wrongAnswer.length + 1)),0, rightAnswer);
            document.querySelector("#question").innerText = `${data.results[queue].question}` 
            document.querySelector('.answer1').innerText = allAnswers[0]
            document.querySelector('.answer2').innerText = allAnswers[1]
            document.querySelector('.answer3').innerText = allAnswers[2]
            document.querySelector('.answer4').innerText = allAnswers[3]
            
        }
        
        )
    })
    
}   

// function randomAnswer(){
//     let rightAnswer = data.correct_answer;
//     let wrongAnswer = data.incorrect_answers
//     let allAnswers = wrongAnswer
//     allAnswers.splice(Math.floor(Math.random()*(wrongAnswer.length + 1)),0, rightAnswer)
// }

processAllInf()