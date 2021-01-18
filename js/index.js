/* ***************************
  JWD JavaScript Assessment

  This code is unfinished. You will need to study it to figure out what it does. Then you will need to use this and
  your own code, to finish the app. 
  
  The tasks you need to do are below.

    TASKS TODO:
      1. Calculate the score as the total of the number of correct answers

      2. Add an Event listener for the submit button, which will display the score and highlight 
         the correct answers when the button is clicked. Use the code from lines 67 to 86 to help you.

      3. Add 2 more questions to the app (each question must have 4 options).

      4. Reload the page when the reset button is clicked (hint: search window.location)

      5. Add a countdown timer - when the time is up, end the quiz, display the score and highlight the correct answers
*************************** */

window.addEventListener('DOMContentLoaded', () => {
  const start = document.querySelector('#start');
  start.addEventListener('click', function (e) {
    document.querySelector("#quizBlock").style.display = "block";
    start.style.display = "none";

    //countdown timer
    var timeLeft = 30;
    var elem = document.getElementById("time");

    var timerId = setInterval(countdown, 1000);

    function countdown() {
      if (timeLeft == -1) {
        clearTimeout(timerId);
        elem.innerHTML = " Time's up";
        elem.style.fontSize = " large";
        elem.style.color = " green";
        calculateScore();
      } else {
        elem.innerHTML = timeLeft;
        timeLeft--;
      }
    }

    // quizArray QUESTIONS & ANSWERS
    // q = QUESTION, o = OPTIONS, a = CORRECT ANSWER
    // Basic ideas from https://code-boxx.com/simple-javascript-quiz/
    const quizArray = [
      {
        q: "Which is the third planet from the sun?",
        o: ["Saturn", "Earth", "Pluto", "Mars"],
        a: 1, // array index 1 - so Earth is the correct answer here
      },
      {
        q: "Which is the largest ocean on Earth?",
        o: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
        a: 3,
      },
      {
        q: "What is the capital of Australia",
        o: ["Sydney", "Canberra", "Melbourne", "Perth"],
        a: 1,
      },
    ];
    //Push addtional question to the quiz list
    const quiz4 = {
      q: "What is the smallest planet in our Soloar System?",
      o: ["Earth", "Mercury", "Jupiter", "Mars"],
      a: 1,
    };
    const quiz5 = {
      q: "What is the largest planet in our solar system?",
      o: ["Earth", "Mercury", "Jupiter", "Mars"],
      a: 2,
    };
    quizArray.push(quiz4, quiz5);

    // function to Display the quiz questions and answers from the object
    const displayQuiz = () => {
      const quizWrap = document.querySelector("#quizWrap");
      let quizDisplay = "";
      quizArray.map((quizItem, index) => {
        quizDisplay += `<ul class="list-group">
                   Q - ${quizItem.q}
                    <li class="list-group-item mt-2" id="li_${index}_0"><input type="radio" name="radio${index}" id="radio_${index}_0"> ${quizItem.o[0]}</li>
                    <li class="list-group-item" id="li_${index}_1"><input type="radio" name="radio${index}" id="radio_${index}_1"> ${quizItem.o[1]}</li>
                    <li class="list-group-item"  id="li_${index}_2"><input type="radio" name="radio${index}" id="radio_${index}_2"> ${quizItem.o[2]}</li>
                    <li class="list-group-item"  id="li_${index}_3"><input type="radio" name="radio${index}" id="radio_${index}_3"> ${quizItem.o[3]}</li>
                    </ul>
                    <div>&nbsp;</div>`;
        quizWrap.innerHTML = quizDisplay;
      });
    };

    // Calculate the score and highlight the correct answer
    let quiz = document.querySelector("#btnSubmit");
    quiz.addEventListener("click", calculateScore);
    function calculateScore() {
      let score = 0;
      quizArray.map((quizItem, index) => {
        for (let i = 0; i < 4; i++) {
          //highlight the li if it is the correct answer
          let li = `li_${index}_${i}`;
          let r = `radio_${index}_${i}`;
          liElement = document.querySelector("#" + li);
          radioElement = document.querySelector("#" + r);
          if (quizItem.a == i) {
            //change background color of li element here
            liElement.style.backgroundColor = "lightgreen";
          }
          if (radioElement.checked == true && quizItem.a == i) {
            score += 1;
          }
        }
      });
      quiz.style.display = "none";
      const totalScore = document.querySelector("#score");
      totalScore.innerHTML = `You Scored ${score}/${quizArray.length}`;
      totalScore.style.color = "green";
      totalScore.style.fontSize = "x-large";
    }

    //reload the page when reset button in clicked
    let reset = document.querySelector("#btnReset");
    reset.addEventListener("click", resetPage);
    function resetPage() {
      window.location.reload();
    }

    //countdown timer

    // startTimer();

    // function startTimer() {
    //   var presentTime = document.getElementById("time").innerHTML;
    //   var timeArray = presentTime.split(/[:]+/);
    //   var m = timeArray[0];
    //   var s = checkSecond(timeArray[1] - 1);
    //   if (s == 59) {
    //     m = m - 1;
    //   }
    //   if ((m + "").length == 1) {
    //     m = "0" + m;
    //   }
    //   if (m < 0) {
    //     m = "59";
    //   }
    //   document.getElementById("time").innerHTML = m + ":" + s;
    //   setTimeout(startTimer, 1000);
    // }

    // function checkSecond(sec) {
    //   if (sec < 10 && sec >= 0) {
    //     sec = "0" + sec;
    //   } // add zero in front of numbers < 10
    //   if (sec < 0) {
    //     sec = "59";
    //   }
    //   return sec;
    // }
    //var presentTime = document.getElementById("time").innerHTML;

    // call the displayQuiz function
    displayQuiz();
  })
});
