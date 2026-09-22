// var randomNumber = Math.floor(Math.random() * 100) + 1;

// var guesses = document.querySelector(".guesses");
// var lastResult = document.querySelector(".lastResult");
// var lowOrHi = document.querySelector(".lowOrHi");

// var guessesSubimit = document.querySelector(".guessSubmit");
// var guessField = document.querySelector(".guessField");

// var guessCount = 1;
// var resetButton;

// guessField.focus();

// function checkGuess() {
//   var userGuess = Number(guessField.value);
//   if (guessCount === 1) {
//     guesses.textContent = "Palpites anteriores: ";
//   }
//   guesses.textContent += userGuess + " ";

//   if (userGuess === randomNumber) {
//     lastResult.textContent = "Parabéns! Você acertou.";
//     lastResult.style.backgrundColor = "green";
//     lowOrHi.textContent = " ";
//     setGameOver()
//   } else if (guessCount === 10){
//     lastResult.textContent = "!!! FIM DE JOGO !!!";
//     lowOrHi.textContent = "";
//     setGameOver()
//   } else {

//     lastResult.textContent = "Errado!";
//     lastResult.style.backgrundColor = "red";
//     if (userGuess < randomNumber){
//         lowOrHi.textContent = "Seu numero está baixo!"
//     } else if (userGuess > randomNumber) {
//         lowOrHi.textContent = "Seu numero está Alto!"
//     }
//   }
//   guessCount++;
//   guessField.value = "";
//   guessField.focus();
// }

// guessesSubimit.addEventListener("click", checkGuess);

// function setGameOver(){
//   guessField.disabled = true;
//   guessesSubimit.disabled = true;
//   resetButton = document.createElement("button");
//   resetButton.textContent = "iniciar novo jogo?";
//   document.body.appendChild(resetButton);
//   resetButton.addEventListener('click', resetGame)
// };

// function resetGame() {
//   guessCount = 1;

//   var resetParas = document.querySelectorAll(".resultParas p");
//   for (var i = 0; i < resetParas.length; i++) {
//     resetParas[i].textContent = "";
//   }

//   resetButton.parentNode.removeChild(resetButton);

//   guessField.disabled = false;
//   guessSubmit.disabled = false;
//   guessField.value = "";
//   guessField.focus();

//   lastResult.style.backgroundColor = "white";

//   randomNumber = Math.floor(Math.random() * 100) + 1;
// }

var button = document.querySelector("button");

button.onclick = function () {
  var nome = prompt("Qual é o seu nome?");
  alert("Olá " + nome + ", é um prazer te ver!");
};

var nome = ["Blandon", "Andreza", "Miguel", "Dante"];
var idade = ["29 anos", "32 anos", "2 anos", "RN"];

console.log(nome[0], "tem", idade[0]);
console.log(idade[3], "é a idade de", nome[3]);

var meuNumero = "500"; // opa, isso continua sendo uma string
typeof meuNumero;
meuNumero = 500; // bem melhor — agora isso é um número
typeof meuNumero;