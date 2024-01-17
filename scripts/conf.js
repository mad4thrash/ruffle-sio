if (document.getElementById('conf-script')) {
let names = document.getElementById('names');
const saveNamesBtn = document.getElementById('save-names');
const editNamesBtn = document.getElementById('edit-names');
const results = document.getElementById('insert-results');
const titleInput = document.getElementById('title-conf');
const titleBtn = document.getElementById('save-title');
const clearBtn = document.getElementById('clear-conf');
const randomToggle = document.getElementById('random-ex-switch');
const riggedToggle = document.getElementById('rigged-ex-switch');

const saveNames = () => {
    const namesValues = names.value;
    const namesArr = namesValues.split(',').map(name => name.trim());
    localStorage.setItem('names', JSON.stringify(namesArr));
    names.value = '';
    const ulResults = document.createElement('ul');
    results.appendChild(ulResults);
    ulResults.classList.add('list-group')
    ulResults.innerHTML = namesArr.map(name => `<li>${name}</li>`).join('');
}

saveNamesBtn.addEventListener('click', saveNames);

editNamesBtn.addEventListener('click', () => {
    const namesToEdit = JSON.parse(localStorage.getItem('names'));
    names.value = namesToEdit.join(', ');
    results.innerHTML = '';
});

titleBtn.addEventListener('click', () => {
    const titleValue = titleInput.value;
    localStorage.setItem('title', titleValue);
    titleInput.value = '';
    alert(`Il titolo "${titleValue}" è stato salvato`);
});

clearBtn.addEventListener('click', () => {
    localStorage.clear();
    alert('La Configurazione è stata cancellata');
});

randomToggle.addEventListener('click', (e) => {
    localStorage.setItem('random', randomToggle.checked);
    if(e.target.checked){
        results.innerHTML = `<div id="number-winners-div"><p>Seleziona il numero di vincitori</p>` + `<input type="number" id="number-of-winners" placeholder="Numero di vincitori"><button id="save-results">Salva</button></div>`;
        const saveResultsBtn = document.getElementById('save-results');
        saveResultsBtn.addEventListener('click', () => {
            const numberOfWinners = document.getElementById('number-of-winners').value;
            localStorage.setItem('numberOfWinners', numberOfWinners);
            results.innerHTML = `<p>Hai selezionato ${numberOfWinners} vincitori</p>`
        });
    } else {
        results.innerHTML = '';
        localStorage.removeItem('numberOfWinners');
    }
});

riggedToggle.addEventListener('click', (e) => {
    localStorage.setItem('rigged', riggedToggle.checked);
    if(e.target.checked) {
    
    const namesToSelect = JSON.parse(localStorage.getItem('names'));
    results.innerHTML = `<p>Seleziona i vincitori</p>` + namesToSelect.map(name => `<input type="checkbox" name="name" value="${name}">${name}<br>`).join('') +
    `<button id="save-results">Salva</button>`;
    const saveResultsBtn = document.getElementById('save-results');
    saveResultsBtn.addEventListener('click', () => {
        const checkedNames = document.querySelectorAll('input[name="name"]:checked');
        const checkedNamesArr = Array.from(checkedNames).map(name => name.value);
        localStorage.setItem('winners', JSON.stringify(checkedNamesArr));
        alert('Vincitori salvati');
    });
    } else {
        results.innerHTML = '';
        localStorage.removeItem('winners');
    }
});

const isRandom = JSON.parse(localStorage.getItem('random'));
const isRigged = JSON.parse(localStorage.getItem('rigged'));

if (isRandom) {
    randomToggle.checked = true;
}
if (isRigged) {
    riggedToggle.checked = true;
}
}

