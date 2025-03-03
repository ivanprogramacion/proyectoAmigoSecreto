let names = JSON.parse(localStorage.getItem('names')) || [];
let results = JSON.parse(localStorage.getItem('results')) || [];
let drawTimestamp = parseInt(localStorage.getItem('drawTimestamp')) || null;
const drawExpirationTime = 60 * 1000; // 60 segundos (1 minuto)

function updateNameList() {
    const nameList = document.getElementById('nameList');
    nameList.innerHTML = '';
    names.forEach(name => {
        const li = document.createElement('li');
        li.textContent = name;
        nameList.appendChild(li);
    });
}

function updateResultList() {
    const resultList = document.getElementById('resultList');
    resultList.innerHTML = '';
    results.forEach(pair => {
        const li = document.createElement('li');
        li.textContent = `${pair.giver} → ${pair.receiver}`;
        resultList.appendChild(li);
    });
}

function addName() {
    const input = document.getElementById('nameInput');
    const name = input.value.trim();
    if (name && !names.includes(name)) {
        names.push(name);
        localStorage.setItem('names', JSON.stringify(names));
        input.value = '';
        updateNameList();
    }
}

function removeName() {
    const input = document.getElementById('removeNameInput');
    const name = input.value.trim();
    if (name && names.includes(name)) {
        names = names.filter(n => n !== name);
        localStorage.setItem('names', JSON.stringify(names));
        updateNameList();
        input.value = '';
    }
}

function updateName() {
    const oldNameInput = document.getElementById('oldNameInput');
    const newNameInput = document.getElementById('newNameInput');
    const oldName = oldNameInput.value.trim();
    const newName = newNameInput.value.trim();
    if (oldName && newName && names.includes(oldName) && !names.includes(newName)) {
        names = names.map(n => (n === oldName ? newName : n));
        localStorage.setItem('names', JSON.stringify(names));
        updateNameList();
        oldNameInput.value = '';
        newNameInput.value = '';
    }
}

function drawNames() {
    if (names.length < 2) {
        alert('Debe haber al menos 2 participantes.');
        return;
    }
    let shuffled = [...names].sort(() => Math.random() - 0.5);
    results = shuffled.map((name, index) => {
        return {
            giver: name,
            receiver: shuffled[(index + 1) % shuffled.length]
        };
    });
    drawTimestamp = Date.now();
    localStorage.setItem('results', JSON.stringify(results));
    localStorage.setItem('drawTimestamp', drawTimestamp.toString());
    updateResultList();
    checkDrawExpiration();
}

function resetDraw() {
    results = [];
    localStorage.removeItem('results');
    localStorage.removeItem('names');
    localStorage.removeItem('drawTimestamp');
    names = [];
    drawTimestamp = null;
    updateNameList();
    updateResultList();
}

function checkDrawExpiration() {
    if (drawTimestamp && Date.now() - drawTimestamp > drawExpirationTime)
     {
        alert('El sorteo ha expirado. Se debe realizar un nuevo sorteo.');
        resetDraw();
    } else {
        setTimeout(checkDrawExpiration, 5000); // Verificar cada 5 segundos
    }
}

updateNameList();
updateResultList();
checkDrawExpiration();
