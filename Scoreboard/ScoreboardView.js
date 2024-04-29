export default class ScoreboardView {
  constructor(root, playerOneName, playerTwoName) {
    this.root = root;
    this.root.innerHTML = `
      <div class="scoreboard">
        <div id="team-one-name" class="scoreboard__name scoreboard__name--one">${playerOneName}</div>
        <div id="team-two-name" class="scoreboard__name scoreboard__name--two">${playerTwoName}</div>
        <div class="scoreboard__score" data-for-player="one">0</div>
        <div class="scoreboard__score" data-for-player="two">0</div>
        <div id="team-one" class="team">
          ${Array(11).fill('<div class="player-circle">0</div>').join('')}
        </div>
        <div id="team-two" class="team">
          ${Array(11).fill('<div class="player-circle">0</div>').join('')}
        </div>
        <button id="edit-numbers">Editeaza Numerele</button>
        <button id="save-numbers">Salveaza</button>
      </div>
    `;
  }

  update(playerOneScore, playerTwoScore) {
    this.root.querySelector(
      ".scoreboard__score[data-for-player='one']"
    ).textContent = playerOneScore;
    this.root.querySelector(
      ".scoreboard__score[data-for-player='two']"
    ).textContent = playerTwoScore;
  }
}