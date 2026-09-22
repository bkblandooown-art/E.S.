// Complete variable definitions and random function

const customName = document.getElementById("customname");
const generateBtn = document.querySelector(".randomize");
const story = document.querySelector(".story");

function randomValueFromArray(array) {
  const random = Math.floor(Math.random() * array.length);
  return array[random];
}

// Solution: Raw text strings

const characters = ["Willy, o Duende", "Big Daddy", "Papai Noel"];
const places = ["o refeitório de caridade", "Disneyland", "a Casa Branca"];
const events = [
  "entrou em combustão espontânea",
  "derreteu, virando uma poça na calçada",
  "transformou-se em uma lesma e deslizou para longe",
];

// Solution: Partial return random string function

function returnRandomStoryString() {
  const randomCharacter = randomValueFromArray(characters);
  const randomPlace = randomValueFromArray(places);
  const randomEvent = randomValueFromArray(events);

  let storyText = `Fazia 34 graus Celsius lá fora, então ${randomCharacter} saiu para caminhar. Quando chegou a ${randomPlace}, a pessoa ficou horrorizada por alguns instantes e, em seguida, ${randomEvent}. Bob viu tudo, mas não se surpreendeu — ${randomCharacter} pesa cerca de 136 quilos, e era um dia quente.`;

  return storyText;
}

// Solution: Event listener and partial generate function definition

generateBtn.addEventListener("click", generateStory);

function generateStory() {
  let newStory = returnRandomStoryString();

  if (customName.value !== "") {
    const name = customName.value;
    newStory = newStory.replace("Bob", name);
  }

  if (document.getElementById("br").checked) {
    const weight = `${Math.round(300 * 0.45)} Kilos`;
    const temperature = `${Math.round((94 - 32) * (5 / 9))} Celsius`;
    newStory = newStory.replace("300 pounds", weight);
    newStory = newStory.replace("94 Fahrenheit", temperature);
  }

  story.textContent = newStory;
  story.style.visibility = "visible";
}