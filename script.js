
const quizData = {

programming:[
 {q:"Java is?",o:["OS","Language","Tool"],a:"Language"},
 {q:"HTML stands for?",o:["High Text Markup Language","Hyper Text Markup Language","Home Tool Markup"],a:"Hyper Text Markup Language"},
 {q:"CSS is used for?",o:["DB","Styling","Server"],a:"Styling"},
 {q:"JS runs in?",o:["CPU","Browser","RAM"],a:"Browser"},
 {q:"React is?",o:["OS","Library","Framework"],a:"Library"},
 {q:"Python is?",o:["Animal","Language","IDE"],a:"Language"},
 {q:"SQL used for?",o:["Game","Database","Design"],a:"Database"},
 {q:"Git is?",o:["Browser","Version Control","Compiler"],a:"Version Control"},
 {q:"API stands for?",o:["Application Page Interface","Application Programming Interface","App Program Index"],a:"Application Programming Interface"},
 {q:"int is?",o:["Loop","Datatype","Function"],a:"Datatype"}
],

maths:[
 {q:"5+7?",o:["11","12","10"],a:"12"},
 {q:"9×3?",o:["18","21","27"],a:"27"},
 {q:"15-6?",o:["8","7","9"],a:"9"},
 {q:"20÷4?",o:["2","5","4"],a:"5"},
 {q:"Square of 6?",o:["30","36","42"],a:"36"},
 {q:"7×8?",o:["54","56","58"],a:"56"},
 {q:"100÷10?",o:["5","10","20"],a:"10"},
 {q:"Cube of 3?",o:["18","27","9"],a:"27"},
 {q:"10% of 200?",o:["30","40","20"],a:"20"},
 {q:"Perimeter of square side 4?",o:["12","16","20"],a:"16"}
],

maths_advanced:[
 {q:"sin30°?",o:["1","1/2","0"],a:"1/2"},
 {q:"Derivative x²?",o:["x","2x","x²"],a:"2x"},
 {q:"log10 100?",o:["1","2","10"],a:"2"},
 {q:"cos60°?",o:["1","1/2","0"],a:"1/2"},
 {q:"sin²θ+cos²θ?",o:["0","1","2"],a:"1"},
 {q:"Limit (x²-1)/(x-1) x→1?",o:["1","2","3"],a:"2"},
 {q:"Probability head?",o:["1","1/2","0"],a:"1/2"},
 {q:"Slope formula?",o:["x+y","(y2-y1)/(x2-x1)","x-y"],a:"(y2-y1)/(x2-x1)"},
 {q:"Real solution x²+1=0?",o:["2","0","1"],a:"0"},
 {q:"Matrix det [[1,2],[3,4]]?",o:["2","-2","4"],a:"-2"}
],

gk:[
 {q:"Capital India?",o:["Mumbai","Delhi","Chennai"],a:"Delhi"},
 {q:"National Animal?",o:["Lion","Tiger","Elephant"],a:"Tiger"},
 {q:"Largest Ocean?",o:["Indian","Pacific","Atlantic"],a:"Pacific"},
 {q:"National Bird?",o:["Parrot","Peacock","Sparrow"],a:"Peacock"},
 {q:"Red Planet?",o:["Earth","Mars","Jupiter"],a:"Mars"},
 {q:"Currency USA?",o:["Euro","Dollar","Peso"],a:"Dollar"},
 {q:"Largest Continent?",o:["Africa","Asia","Europe"],a:"Asia"},
 {q:"Sun rises?",o:["West","East","North"],a:"East"},
 {q:"Days in week?",o:["6","7","8"],a:"7"},
 {q:"Father of Nation India?",o:["Nehru","Gandhi","Patel"],a:"Gandhi"}
],

current_affairs:[
 {q:"India PM 2025?",o:["Rahul","Narendra Modi","Amit Shah"],a:"Narendra Modi"},
 {q:"Chandrayaan-3 related to?",o:["Mars","Moon","Sun"],a:"Moon"},
 {q:"ISRO country?",o:["USA","India","Russia"],a:"India"},
 {q:"Currency Japan?",o:["Dollar","Yen","Won"],a:"Yen"},
 {q:"G20 2023 Host?",o:["USA","India","UK"],a:"India"},
 {q:"Digital payment India?",o:["Visa","UPI","Mastercard"],a:"UPI"},
 {q:"UN Secretary General?",o:["Biden","António Guterres","Putin"],a:"António Guterres"},
 {q:"Largest democracy?",o:["USA","India","Brazil"],a:"India"},
 {q:"Olympics 2024 Host?",o:["Tokyo","Paris","London"],a:"Paris"},
 {q:"India space agency?",o:["NASA","ISRO","ESA"],a:"ISRO"}
]

};



let questions=[],currentIndex=0,score=0,timer,timeLeft,selectedAnswer=null;
let questionTime=10;
let answerHistory=[];


function shuffleArray(array){
  for(let i = array.length - 1; i > 0; i--){
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}


function ensureThreeOptions(options, correct){
  const fillers = ["None", "All of the above", "Not sure", "Unknown"];

  while(options.length < 3){
    let random = fillers[Math.floor(Math.random() * fillers.length)];
    if(!options.includes(random) && random !== correct){
      options.push(random);
    }
  }

  return options;
}


function startQuiz(){

currentIndex = 0;
score = 0;

 answerHistory=[];

 let category=document.getElementById("category").value;
 let difficulty=document.getElementById("difficulty").value;

 questions=[...quizData[category]];
 questionTime=(category==="maths_advanced")?25:10;

 if(difficulty==="easy")questions=questions.slice(0,5);
 if(difficulty==="medium")questions=questions.slice(0,8);

 questions.sort(()=>Math.random()-0.5);

 document.getElementById("start-screen").classList.add("hidden");
 document.getElementById("quiz-screen").classList.remove("hidden");

 loadQuestion();
}


function loadQuestion(){
  clearInterval(timer);
  timeLeft = questionTime;
  selectedAnswer = null;

  document.getElementById("timer").innerText = timeLeft;

  let q = questions[currentIndex];

  document.getElementById("question").innerText = q.q;
  document.getElementById("options").innerHTML = "";


  let options = [...q.o];


  options = ensureThreeOptions(options, q.a);


  options = shuffleArray(options);


  options.forEach(opt=>{
    let btn = document.createElement("button");
    btn.innerText = opt;
    btn.onclick = ()=>selectAnswer(btn, opt);
    document.getElementById("options").appendChild(btn);
  });

  updateProgress();
  startTimer();
}



function startTimer(){
 timer=setInterval(()=>{
  timeLeft--;
  let timerEl=document.getElementById("timer");
  timerEl.innerText=timeLeft;

  if(timeLeft>7) timerEl.className="timer normal";
  else if(timeLeft>3) timerEl.className="timer warning";
  else timerEl.className="timer danger";

  if(timeLeft<=0) nextQuestion();
 },1000);
}


function toggleTheme(){
 document.body.classList.toggle("dark");
 let btn=document.querySelector(".dark-btn");
 btn.innerText=document.body.classList.contains("dark")?"☀️":"🌙";
}

function selectAnswer(button, ans) {
  selectedAnswer = ans;

  const correctAns = questions[currentIndex].a;

  // disable all buttons
  document.querySelectorAll("#options button")
    .forEach(b => b.disabled = true);

  if (ans === correctAns) {
    button.classList.add("correct");   // transparent green
    score++;
  } else {
    button.classList.add("wrong");     // red for wrong

    // highlight correct answer
    document.querySelectorAll("#options button")
      .forEach(b => {
        if (b.innerText === correctAns) {
          b.classList.add("correct");
        }
      });
  }
}



function nextQuestion(){
  clearInterval(timer);

  let correctAns = questions[currentIndex].a;
  let result = selectedAnswer === correctAns;

  // ONLY store history here
  answerHistory.push({
    question: questions[currentIndex].q,
    selected: selectedAnswer || "Not Answered",
    correct: correctAns,
    isCorrect: result
  });

  currentIndex++;

  if(currentIndex < questions.length){
    loadQuestion();
  } else {
    showResult();
  }
}



function showResult(){

  document.getElementById("quiz-screen").classList.add("hidden");
  document.getElementById("result-screen").classList.remove("hidden");

  let name = document.getElementById("username").value || "Player";
  document.getElementById("score").innerText =
    `Great job, ${name}! 🎉 Score: ${score}/${questions.length}`;

  let analysisDiv = document.getElementById("analysis");
  analysisDiv.innerHTML = "<h3>Result Analysis</h3>";

  answerHistory.forEach((item,i)=>{
    analysisDiv.innerHTML += `
     <div class="analysis-card">
      <p><b>Q${i+1}:</b> ${item.question}</p>
      <p>Your Answer: <span class="${item.isCorrect?'green':'red'}">${item.selected}</span></p>
      <p>Correct Answer: ${item.correct}</p>
      <p>Status: ${item.isCorrect?'✅ Correct':'❌ Incorrect'}</p>
      <hr>
     </div>`;
  });


  let correctCount = answerHistory.filter(a => a.isCorrect).length;
  let wrongCount = answerHistory.length - correctCount;

  const canvas = document.getElementById("resultChart");


  if (window.quizChart) {
    window.quizChart.destroy();
  }


  canvas.style.display = "block";

  window.quizChart = new Chart(canvas, {
    type: 'doughnut',
    data: {
      labels: ['Correct', 'Wrong'],
      datasets: [{
        data: [correctCount, wrongCount],
        backgroundColor: ['#2ecc71', '#e74c3c']
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          labels: {
            color: document.body.classList.contains("dark") ? "#fff" : "#000"
          }
        }
      }
    }
  });
}



function saveScore(newScore){
 let scores=JSON.parse(localStorage.getItem("scores"))||[];
 scores.push(newScore);
 scores.sort((a,b)=>b-a);
 scores=scores.slice(0,3);
 localStorage.setItem("scores",JSON.stringify(scores));
 loadLeaderboard();
}

function loadLeaderboard(){
 let scores=JSON.parse(localStorage.getItem("scores"))||[];
 let list=document.getElementById("leaderboard");
 list.innerHTML="";
 scores.forEach((s,i)=>{
  let li=document.createElement("li");
  li.innerText=`#${i+1} – ${s} pts`;
  list.appendChild(li);
 });
}


function updateProgress(){
 let percent=((currentIndex+1)/questions.length)*100;
 document.getElementById("progressBar").style.width=percent+"%";
 document.getElementById("progressText").innerText=`Question ${currentIndex+1}/${questions.length}`;
}

function restartQuiz(){
 currentIndex=0;
 score=0;
 document.getElementById("result-screen").classList.add("hidden");
 document.getElementById("start-screen").classList.remove("hidden");
}


function startDailyChallenge(){
 let categories=Object.keys(quizData);
 let randomCat=categories[Math.floor(Math.random()*categories.length)];
 document.getElementById("category").value=randomCat;
 document.getElementById("difficulty").value="medium";
 startQuiz();
}


function loadStats(){
 let totalQ=Object.values(quizData).reduce((sum,arr)=>sum+arr.length,0);
 document.getElementById("stats").innerText=
  `${totalQ} Questions • ${Object.keys(quizData).length} Categories`;
}

loadStats();
loadLeaderboard();
