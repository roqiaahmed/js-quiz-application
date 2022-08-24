let CountSpan = document.querySelector(".count span");
let bullets = document.querySelector(".bullets");
let bulletspancounter = document.querySelector(".bullets .spans");
let quizArea = document.querySelector(".quiz-area");
let answersArea = document.querySelector(".answers-area");
let submitButton = document.querySelector(".submit-button");
let resultsContainer = document.querySelector(".results");

let currentIndex =0;
let currentAnswer =0;

function GetQuiz() {
  let MeQuiz = new XMLHttpRequest();
  MeQuiz.onreadystatechange = function () {
    if ((this.readyState === 4) & (this.status === 200)) {
      let QuizObject = JSON.parse(this.responseText);
      let QuizCount = QuizObject.length;

      // creat bullets + set quizcount
      creatBullets(QuizCount);
      addQuizData(QuizObject[currentIndex], QuizCount);
      checkCorrectAnswer(QuizObject[currentIndex].right_answer);

      function checkCorrectAnswer(current_answer){
          submitButton.onclick = () => {
              let checked_answer = document.querySelector('input[name="question"]:checked').getAttribute('data-answer');

              currentIndex++;
              console.log(currentIndex);
              
              if (checked_answer == current_answer) {
                  currentAnswer++;
                  console.log(`this is true = ${currentAnswer}`);
              }else{
                  console.log('this is not');
              }
              console.log(`checked answer is ${checked_answer}`);
              console.log(`current_answer is ${current_answer}`);
              quizArea.innerHTML = "";
              answersArea.innerHTML= "";
              addQuizData(QuizObject[currentIndex], QuizCount);
              if (currentIndex < QuizCount) {
                checkCorrectAnswer(QuizObject[currentIndex].right_answer);
              }
              handleBullets()
              showResults(QuizCount);
          }
      }
    }
  };
  MeQuiz.open("get", "html-quiz-json", true);
  MeQuiz.send();
}

GetQuiz();
function creatBullets(num) {
  CountSpan.innerHTML = num;
  for (let i = 0; i < num; i++) {
    let TheBullet = document.createElement("span");
    if (i === 0) {
      TheBullet.className = "on";
    }
    bulletspancounter.appendChild(TheBullet);
  }
}

function addQuizData(obj, count) {
if (currentIndex < count) {
  let quizTitle = document.createElement("h2");
  let quizText = document.createTextNode(obj.title);
  quizTitle.appendChild(quizText);
  quizArea.appendChild(quizTitle);
  console.log(obj);
  for (let i = 1; i <= 4; i++) {
    let mainDiv = document.createElement("div");
    mainDiv.className = "answer";
    let radioInput = document.createElement("input");
    radioInput.name = "question";
    radioInput.type = "radio";
    radioInput.id = `answer_${i}`;
    radioInput.dataset.answer = obj[`answer_${i}`]; // <input type="radio" data-answer="To Make Text Bold">
    mainDiv.appendChild(radioInput);
    let thelable = document.createElement("label");
    thelable.htmlFor = `answer_${i}`;
    let labelText = document.createTextNode(obj[`answer_${i}`]);
    thelable.appendChild(labelText);
    mainDiv.appendChild(thelable);
    answersArea.appendChild(mainDiv);
  }
} 
}
function handleBullets() {
  let bulletsSpans = document.querySelectorAll(".bullets .spans span");
  let arrayOfSpans = Array.from(bulletsSpans);
  arrayOfSpans.forEach((span, index) => {
    if (currentIndex === index) {
      span.className = "on";
      console.log(`currentIndex is ${currentIndex}`);
    }
  });
}
function showResults(count) {
  let theResults;
  if (currentIndex === count) {
    quizArea.remove();
    answersArea.remove();
    submitButton.remove();
    bullets.remove();

    if (currentAnswer > count / 2 && currentAnswer < count) {
      theResults = `<span class="good">Good</span>, ${currentAnswer} From ${count}`;
    } else if (currentAnswer === count) {
      theResults = `<span class="perfect">Perfect</span>, All Answers Is Good`;
    } else {
      theResults = `<span class="bad">Bad</span>, ${currentAnswer} From ${count}`;
    }

    resultsContainer.innerHTML = theResults;
    resultsContainer.style.padding = "10px";
    resultsContainer.style.backgroundColor = "white";
    resultsContainer.style.marginTop = "10px";
  }
}
