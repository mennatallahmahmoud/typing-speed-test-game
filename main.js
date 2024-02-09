let msg = document.querySelector('.msg');
let selectLvls = document.querySelector('.lvls');
let seconds = document.querySelector('.seconds');
let startBtn = document.querySelector('.start-game');
let theWord = document.querySelector('.word');
let input = document.querySelector('.input');
let upcomingWords = document.querySelector('.up-coming');
let controlBar = document.querySelector('.control');
let timeLeft = document.querySelector('.control .time');
let score = document.querySelector('.control .score');
let totalScore = document.querySelector('.control .total');
let finishResult = document.querySelector('.finish');
let instructions = document.querySelector('.instructions');
let instructionsPara = document.querySelector('.instructions p');
let lvls = {
    "Easy": 5,
    "Normal": 4,
    "Hard": 3,
}
let easyWordsLvl = ["For", "Limit", "Book", "Array", "Loop", "Select", "True", "False", "Level", "Scala", "Value", "Phone", "Pen", "Screen", "Live"];
// let easyWordsLvl = ["For", "Limit", "Book"];
let normWordsLvl = ["Function", "Object", "Result", "Context", "While", "Property", "Method", "Minute", "Document", "Second", "Window", "Computer", "House", "Laptop", "Keyboard"];
// let normWordsLvl = ["Function", "Object", "Result"];
let hardWordsLvl = ["Instructions", "Parameter", "Argument", "Prototype", "Condition", "Variable", "Competition", "Maintance", "Available", "Advantage", "Database", "Application", "Javascript", "Programming", "Generator"];
// let hardWordsLvl = ["Variable"];

input.onpaste = function () {
    return false;
}

seconds.textContent = lvls[selectLvls.value];
timeLeft.innerHTML = lvls[selectLvls.value];
totalScore.innerHTML = easyWordsLvl.length;

selectLvls.oninput = () => {
    if (selectLvls.value == Object.keys(lvls)[0]) {

        seconds.textContent = lvls[selectLvls.value];
        timeLeft.innerHTML = lvls[selectLvls.value];
        totalScore.innerHTML = easyWordsLvl.length;

    } else if (selectLvls.value == Object.keys(lvls)[1]) {

        seconds.textContent = lvls[selectLvls.value];
        timeLeft.innerHTML = lvls[selectLvls.value];
        totalScore.innerHTML = normWordsLvl.length;

    } else if (selectLvls.value == Object.keys(lvls)[2]) {

        seconds.textContent = lvls[selectLvls.value];
        timeLeft.innerHTML = lvls[selectLvls.value];
        totalScore.innerHTML = hardWordsLvl.length;

    }
}

startBtn.onclick = function () {
    this.remove();
    input.focus();
    genWords ()
}

function genWords () {
    if (selectLvls.value == Object.keys(lvls)[0]) {

        let randomWord = easyWordsLvl[Math.floor(Math.random() * easyWordsLvl.length)];
        wordIndex = easyWordsLvl.indexOf(randomWord)
        easyWordsLvl.splice(wordIndex, 1);
        theWord.innerHTML = randomWord;
        upcomingWords.innerHTML = '';
        for (let i = 0; i < easyWordsLvl.length; i++) {
            let div = document.createElement('div');
            div.appendChild(document.createTextNode(easyWordsLvl[i]));
            upcomingWords.appendChild(div);
        }
    } else if (selectLvls.value == Object.keys(lvls)[1]) {

        let randomWord = normWordsLvl[Math.floor(Math.random() * normWordsLvl.length)];
        wordIndex = normWordsLvl.indexOf(randomWord)
        normWordsLvl.splice(wordIndex, 1);
        theWord.innerHTML = randomWord;
        upcomingWords.innerHTML = '';
        for (let i = 0; i < normWordsLvl.length; i++) {
            let div = document.createElement('div');
            div.appendChild(document.createTextNode(normWordsLvl[i]));
            upcomingWords.appendChild(div);
        }
    } else if (selectLvls.value == Object.keys(lvls)[2]) {

        let randomWord = hardWordsLvl[Math.floor(Math.random() * hardWordsLvl.length)];
        wordIndex = hardWordsLvl.indexOf(randomWord)
        hardWordsLvl.splice(wordIndex, 1);
        theWord.innerHTML = randomWord;
        upcomingWords.innerHTML = '';
        for (let i = 0; i < hardWordsLvl.length; i++) {
            let div = document.createElement('div');
            div.appendChild(document.createTextNode(hardWordsLvl[i]));
            upcomingWords.appendChild(div);
        }
    }
    startPlay();
}

function startPlay () {
    timeLeft.innerHTML = lvls[selectLvls.value];
    let start = setInterval(() => {
        timeLeft.innerHTML--;
        if (timeLeft.innerHTML === "0") {
            clearInterval(start);
            chckWord();
        }
    }, 1000);
}

function chckWord () {
    if (input.value.toLowerCase() == theWord.innerHTML.toLowerCase()) {
        input.value = '';
        score.innerHTML++;
        if (easyWordsLvl.length > 0 && normWordsLvl.length > 0 && hardWordsLvl.length > 0) {
            genWords();
        } else {
            input.value = '';
            upcomingWords.remove();
            let div = document.createElement('div');
            div.className = 'win';
            div.appendChild(document.createTextNode('CONGRATS'));
            finishResult.appendChild(div);
            document.getElementById('win').play();
            setTimeout(() => {
                let div = document.createElement('div');
                div.className = 'start-again';
                div.appendChild(document.createTextNode('Start Again'));
                finishResult.appendChild(div);
                document.querySelector('.start-again').addEventListener("click", () => window.location.reload())
            }, 2000);
        }
    } else {
        let div = document.createElement('div');
        div.className = 'lose';
        div.appendChild(document.createTextNode('GAME OVER'));
        finishResult.appendChild(div);
        document.getElementById('lose').play();
        setTimeout(() => {
            let div = document.createElement('div');
            div.className = 'start-again';
            div.appendChild(document.createTextNode('Start Again'));
            finishResult.appendChild(div);
            document.querySelector('.start-again').addEventListener("click", () => window.location.reload())
            
        }, 2000);
    }
}


instructionsPara.innerHTML = `- Press Start Playing To Start The Game.
<br>- Pay Attention To The Timer In Time Left.
<br><br>- If You Choose ${Object.keys(lvls)[0]} Level, You Have [ ${lvls.Easy} ] Seconds To Write Easy Short Word.
<br>- If You Choose ${Object.keys(lvls)[1]} Level, You Have [ ${lvls.Normal} ] Seconds To Write Medium Length Word.
<br>- If You Choose ${Object.keys(lvls)[2]} Level, You Have [ ${lvls.Hard} ] Seconds To Write Hard Long Word.`