let logWindow = [];
// btn selectors
const btns = document.querySelectorAll(".btn");
const attackBtn = document.querySelector(".attack-btn");
const healBtn = document.querySelector(".heal-btn");
const giveUpBtn = document.querySelector(".give-up-btn");
const resetBtn = document.querySelector(".reset-btn");

// hp selectors
const playerHp = document.querySelector(".hp-player");
const botHp = document.querySelector(".hp-bot");

// log selectors
const logContainer = document.querySelector(".log-container");
const logInner = document.getElementById("log-inner");

// after game selectors
const winText = document.querySelector(".winner");
const loseText = document.querySelector(".loser");
const tieText = document.querySelector(".tie");

// healths
let hp1 = 50; // PLAYER'S HEALTH
let hp2 = 50; // BOT'S HEALTH
playerHp.innerHTML = hp1;
botHp.innerHTML = hp2;

// CLICK EVENTS
function allClicks() {
  let clicked = 0;
  let clickLimit = 0;

  // attack btn
  attackBtn.addEventListener("click", function () {
    clicked++;
    let botDamage = Math.floor(Math.random() * 10 + 1); // Damage scale 1-10
    let playerDamage = Math.floor(Math.random() * 10 + 1); // Damage scale 1-10
    playerHp.innerHTML = hp1 = hp1 - botDamage;
    botHp.innerHTML = hp2 = hp2 - playerDamage;
    // log container
    function logScreen1() {
      let logs = `<div id="log-inner">
                  <p class="turn-count">Turn 
                  <span class="counter"> ${clicked}
                  </span></p>
                  <hr>
                  <article class="log-list">
                  <span class="player-dmg-log">Player</span> dealt
                  <span class="dmg-log">${playerDamage}</span>
                  damage to the <span class="bot-dmg-log">Bot</span>.
                  </article>;
                  <article class="log-list">
                  <span class="bot-dmg-log">Bot</span>
                  dealt <span class="dmg-log">${botDamage}</span>
                  damage to the 
                  <span class="player-dmg-log">Player</span>.
                  </article>;
                  </div>`;

      logWindow.push(logs);
      logContainer.innerHTML = logWindow;
      return logs;
    }

    logScreen1();
    logContainer.scrollTop = logContainer.scrollHeight;
    gameOver();
  });

  // heal btn and click limitation
  healBtn.addEventListener("click", function () {
    clickLimit++;
    clicked++;
    let botDamage = Math.floor(Math.random() * 10 + 1); // Damage scale 1-10
    let playerHeal = Math.floor(Math.random() * 5 + 1); // Heal scale 1-5
    let playerDamage = Math.floor(Math.random() * 5 + 1); // Damage scale 1-5
    playerHp.innerHTML = hp1 = hp1 + playerHeal;
    playerHp.innerHTML = hp1 = hp1 - botDamage;
    botHp.innerHTML = hp2 = hp2 - playerDamage;

    //click limitation
    if (clickLimit === 5) {
      healBtn.disabled = true;
      healBtn.classList.add("disabled");
    }

    function logScreen2() {
      let logs = `<div id="log-inner">
                  <p class="turn-count">Turn 
                  <span class="counter">${clicked}
                  </span></p>
                  <hr>
                  <article class="log-list">
                  <span class="player-dmg-log">Player</span> dealt
                  <span class="dmg-log">${playerDamage}</span>
                  damage to the <span class="bot-dmg-log">Bot</span>.
                  </article>;
                  <article class="log-list">
                  <span class="player-dmg-log">Player</span>
                  recover <span class="heal-log">${playerHeal}</span> health.
                  </article>;
                  <article class="log-list">
                  <span class="bot-dmg-log">Bot</span>
                  dealt <span class="dmg-log">${botDamage}</span>
                  damage to the 
                  <span class="player-dmg-log">Player</span>.
                  </article>;
                  </div>`;
      logWindow.push(logs);
      logContainer.innerHTML = logWindow;
      return logs;
    }
    
    logScreen2();
    logContainer.scrollTop = logContainer.scrollHeight;
    gameOver();
  });

  // give up btn
  giveUpBtn.addEventListener("click", function () {
    playerHp.innerHTML = hp1 = 0;

    gameOver();
  });

  // reset btn
  resetBtn.addEventListener("click", function () {
    window.location = window.location;
  });
}

// game over
function gameOver() {
  if (hp1 <= 0 || hp2 <= 0) {
    btns.forEach((btn) => {
      if (!btn.classList.contains("reset-btn")) {
        btn.disabled = true;
        btn.classList.add("disabled");
      } else {
        btn.disabled = false;
      }

      // winner/loser/tie
      if (hp1 <= 0 && hp2 > 0) {
        loseText.classList.remove("hidden");
      }
      if (hp2 <= 0 && hp1 > 0) {
        winText.classList.remove("hidden");
      }
      if (hp2 <= 0 && hp1 <= 0) {
        tieText.classList.remove("hidden");
      }
    });
  }
}

allClicks();
