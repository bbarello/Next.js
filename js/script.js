
    //  clock time remaining

function initQuiz() {
      var timeRemaining = "";


  // array of questions
    var questions = [
      {
          title: "Question 1: Commonly used data types DO NOT include:",
          choices: ["strings", "booleans", "alerts", "numbers"],
          answer: "alerts"
      },
      {
          title: "Question 2: The condition in an if / else statement is enclosed within ____.",
          choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
          answer: "parentheses"
      },
      {
          title: "Question 3: The instructions for a function are enclosed within ____.",
          choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
          answer: "curly brackets"
      },
      {
          title: "Question 4: A property of an object that is a function is called a ____.",
          choices: ["method", "string", "stylesheet", "boolean"],
          answer: "method"
      },
      {
          title: "Question 5: The logical operator that represents 'or' is ____.",
          choices: ["||", "OR", "&&", "==="],
          answer: "||"
      }
  ];


      
  //  variables to load the quiz container
      var startButtonEl = document.getElementById("start-button");
      var timeRemainingEl = document.getElementById("time-remaining");
      var finalScoreEl = document.getElementById("final-score");
      var numQuestions = questions.length;
      var landingContainerEl = document.getElementById("landing-container");
      var quizContainerEl = document.getElementById("quiz-container");
      var finalContainerEl = document.getElementById("final-container");
      var submitButtonEl = document.getElementById("submit-initials");
      var highscoreButtonEl = document.getElementById("highscore-button");
      var highscoreContainerEl = document.getElementById("highscore-container");
      var  highScores = [];
          //  Method to store and retrieve arrays in/from local storage obtained from https://stackoverflow.com/questions/3357553/how-do-i-store-an-array-in-localstorage
      if (JSON.parse(localStorage.getItem('scores')) !== null) {
          highScores = JSON.parse(localStorage.getItem("scores"));
      }
  
      function startQuiz() {
          
          
          landingContainerEl.setAttribute("class","container d-none");
          var rowEl = null;
          var colEl = null;
          var headerEl = null;
          var buttonEl = null;
          quizContainerEl.setAttribute("class","container");
          var currentQuestion = 1;
          var score = 0;

  // function to decrease time
          timeRemaining=numQuestions * 15;
          timeRemainingEl.setAttribute("value",timeRemaining);

          //  time intervals setInterval function
          var myInterval = setInterval(function() {
              if (timeRemaining<1) {
                  clearInterval(myInterval);

                  // clock is reset to 0
                  quizContainerEl.setAttribute("class","container d-none");
                  finalContainerEl.setAttribute("class","container");
                  return;
              }
              timeRemaining = timeRemaining - 1;
              timeRemainingEl.setAttribute("value",timeRemaining);
          },1000);
          let clickTimeout = false;
          function generateQuestion(questionNum) {

              // appends questions and choices to body 
              quizContainerEl.innerHTML = "";
              rowEl = document.createElement("div");
              rowEl.setAttribute("class","row");
              quizContainerEl.append(rowEl);

              colEl = document.createElement("div");
              colEl.setAttribute("class","col-0 col-sm-2");
              rowEl.append(colEl);

              colEl = document.createElement("div");
              colEl.setAttribute("class","col-12 col-sm-8");
              rowEl.append(colEl);

              colEl = document.createElement("div");
              colEl.setAttribute("class","col-0 col-sm-2");
              rowEl.append(colEl);

              colEl = rowEl.children[1];
              rowEl = document.createElement("div");
              rowEl.setAttribute("class","row mb-3");
              colEl.append(rowEl);

              colEl = document.createElement("div");
              colEl.setAttribute("class","col-12");
              rowEl.append(colEl);

              headerEl = document.createElement("h2");
              headerEl.innerHTML = questions[questionNum-1].title;
              colEl.append(headerEl);

              colEl = quizContainerEl.children[0].children[1];
              for (var i=0; i<4; i++) {
                  var rowEl = document.createElement("div");
                  rowEl.setAttribute("class","row mb-1");
                  colEl.append(rowEl);

                  var colEl2 = document.createElement("div");
                  colEl2.setAttribute("class","col-12");
                  rowEl.append(colEl2);

                  buttonEl = document.createElement("button");
                  buttonEl.setAttribute("class","btn btn-primary btn-sm");
                  buttonEl.setAttribute("type","button");
                  buttonEl.innerHTML = questions[currentQuestion-1].choices[i];
                  colEl2.append(buttonEl);
                  buttonEl.addEventListener("click",function(){

                      //  appends correct or incorrect based on answers
                      if (clickTimeout) {
                          return;
                      }
                      clickTimeout = true;
                      clearInterval(myInterval);
                      var colEl = quizContainerEl.children[0].children[1];
                      var rowEl = document.createElement("div");
                      rowEl.setAttribute("class","row border-top");
                      colEl.append(rowEl);

                      colEl = document.createElement("div");
                      colEl.setAttribute("class","col-12");
                      rowEl.append(colEl);

                      var parEl = document.createElement("p");
                      colEl.append(parEl);
                      if (this.innerHTML === questions[currentQuestion - 1].answer) {
                          parEl.innerHTML = "Correct!";
                      } else {
                          parEl.innerHTML = "Wrong!";
                          timeRemaining = timeRemaining - 15;
                          if (timeRemaining < 0) {
                              timeRemaining = 0;
                          }
                          timeRemainingEl.setAttribute("value",timeRemaining);
                      }
                      currentQuestion++;
                      if (currentQuestion>questions.length) {
                          score = timeRemaining;
                      }
                      setTimeout(function() {
                          // sets timeout and pauses 
                          if (currentQuestion>questions.length) {
                              // Move to the results page
                              quizContainerEl.setAttribute("class","container d-none");
                              finalContainerEl.setAttribute("class","container");
                              finalScoreEl.setAttribute("value",score);
                          } else {
                              generateQuestion(currentQuestion);
                              clickTimeout = false;
                              myInterval = setInterval(function() {
                                  if (timeRemaining<1) {
                                      clearInterval(myInterval);
                                      quizContainerEl.setAttribute("class","container d-none");
                                      finalContainerEl.setAttribute("class","container");
                                      return;
                                  }
                                  timeRemaining = timeRemaining - 1;
                                  timeRemainingEl.setAttribute("value",timeRemaining);
                              },1000);
                          }
                      },2000);
                  });
              }
              

          }
          function saveHighScore() {
              var initialsEl = document.getElementById("initials-entry");
              var newHighScore = {
                  initials: initialsEl.value,
                  highScore: score
              };
              highScores.push(newHighScore);
              localStorage.setItem("scores",JSON.stringify(highScores));
          }
          submitButtonEl.addEventListener("click",saveHighScore);
          
          generateQuestion(currentQuestion);
      }

      startButtonEl.addEventListener("click",startQuiz);

      highscoreButtonEl.addEventListener("click",function() {
          landingContainerEl.setAttribute("class","container d-none");
          quizContainerEl.setAttribute("class","container d-none");
          finalContainerEl.setAttribute("class","container d-none");
          highscoreContainerEl.setAttribute("class","container");
          var colEl = document.getElementById("highscore-table");
          for (i=0; i<highScores.length; i++) {
              let rowEl = document.createElement("div");
              rowEl.setAttribute("class","row mb-1");
              colEl.append(rowEl);

              let colEl2 = document.createElement("div");
              colEl2.setAttribute("class","col-12 text-center");
              rowEl.append(colEl2);

              let parEl = document.createElement("div");
              parEl.innerHTML = "Initials: " + highScores[i].initials + "   Score: " + highScores[i].highScore;
              colEl2.append(parEl);
          }
      });
  
      
  
  
  
  
  
  
  }
  
initQuiz();