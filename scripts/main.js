if (document.getElementById('main-script')) {
const ruffleTitleMain = document.querySelector('.ruffle-title-main');
const titleFromStorage = localStorage.getItem('title');
ruffleTitleMain.textContent = titleFromStorage;
const namesFromStorage = JSON.parse(localStorage.getItem('names'));
const isRandom = JSON.parse(localStorage.getItem('random'));
const isRigged = JSON.parse(localStorage.getItem('rigged'));
const winnersFromStorage = JSON.parse(localStorage.getItem('winners'));
const shuffleBox = document.getElementById('shuffle');
const winnerBox = document.getElementById('winners');
const numberOfWinners = JSON.parse(localStorage.getItem('numberOfWinners'));
const startShuffle = document.getElementById('start-button');



  startShuffle.addEventListener('click', function(e) {
    e.preventDefault();
    startShuffle.disabled = true;
    if(isRigged){
    const weightedNames = namesFromStorage.map(name => {
        return {
          nome: name,
          peso: winnersFromStorage.includes(name) ? 2 : 1
        };
      });
    
    let intervalId;
    let winnerIndex = 1;
    intervalId = setInterval(function() {
        weightedNames.sort(() => Math.random() - 0.5);
        shuffleBox.textContent = weightedNames[0].nome;
        if (weightedNames[0].peso === 2) {
            winnerBox.classList.remove('hidden');
            document.getElementById(`winner-${winnerIndex}`).textContent = weightedNames[0].nome;
            weightedNames.splice(0, 1);
            winnerIndex++;
            if (winnerIndex > winnersFromStorage.length) {
                clearInterval(intervalId);
            }
        }
    }, 175);
} else if(isRandom) {
    let intervalId;
    let winnerIndex = 1;
    intervalId = setInterval(function() {
        namesFromStorage.sort(() => Math.random() - 0.5);
        shuffleBox.textContent = namesFromStorage[0];
        if (winnerIndex <= numberOfWinners) {
            winnerBox.classList.remove('hidden');
            document.getElementById(`winner-${winnerIndex}`).textContent = namesFromStorage[0];
            namesFromStorage.splice(0, 1);
            winnerIndex++;
            if (winnerIndex > numberOfWinners) {
                clearInterval(intervalId);
            }
        }
    }, 175);

}}); 

}

