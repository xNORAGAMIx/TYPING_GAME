const word = document.getElementById('word')
const text = document.getElementById('text')
const scoreEl = document.getElementById('score')
const timeEl = document.getElementById('time')
const end = document.getElementById('end-game-container')
const settingsBtn = document.getElementById('settings-btn')
const settings = document.getElementById('settings')
const settingsForm = document.getElementById('settings-form')
const difficultySelect = document.getElementById('difficulty')

const game_word = [
    'sigh',
    'tense',
    'airplane',
    'ball',
    'pies',
    'juice',
    'warlike',
    'bad',
    'north',
    'dependent',
    'steer',
    'silver',
    'highfalutin',
    'superficial',
    'quince',
    'eight',
    'feeble',
    'admit',
    'drag',
    'loving'
  ];

  let randomWord;

  let score = 0;
  let time = 10;

  let difficulty = localStorage.getItem('difficulty') !==null ? localStorage.getItem('difficulty') : 'medium';

  text.focus();

  const timeInterval = setInterval(updateTime, 1000);

  function updateTime() {
    time--;
    timeEl.innerHTML = time + 's';
    if(time === 0){
        clearInterval(timeInterval);
        gameOver();
    }
  }

  function genWord(){
    return game_word[Math.floor(Math.random() * game_word.length)];
  }

  function addWord(){
    randomWord = genWord();
    word.innerHTML = randomWord;
  }

  function updateScore(){
    score++;
    scoreEl.innerHTML = score; 
  }

  function gameOver(){
    end.innerHTML = `<p>Score: ${score}</p>
                    <button onclick="location.reload()">Try Again</button>`;

                    end.style.display = `flex`;
  }

  addWord();

  text.addEventListener('input', (e) => {
    const insertedText = e.target.value;
    if(insertedText === randomWord){
        addWord();
        updateScore();
        e.target.value = '';

        if(difficulty === 'hard'){
            time += 2;
        } else if(difficulty === 'medium'){
            time += 3;
        } else {
            time += 5;
        }
        updateTime();
    }
  });

  settingsBtn.addEventListener('click', () => settings.classList.toggle('hide'))

  settingsForm.addEventListener('change', e => {
    difficulty = e.target.value;
    localStorage.setItem('difficulty', difficulty);
  })

