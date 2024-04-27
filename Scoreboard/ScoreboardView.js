export default class ScoreboardView {
  constructor(root, playerOneName, playerTwoName, onControlButtonClick) {
    this.root = root;
    this.root.innerHTML = `
      <div class="scoreboard">
        <div id="team-one-name" class="scoreboard__name scoreboard__name--one">${playerOneName}</div>
        <div id = "team-two-name" class="scoreboard__name scoreboard__name--two">${playerTwoName}</div>
        <div class="scoreboard__score" data-for-player = "one">0</div>
        <div class="scoreboard__score" data-for-player = "two">0</div>
        <div class="scoreboard__controls" data-for-player = "one">
          <button class="scoreboard__control-button">-</button>
          <button class="scoreboard__control-button">+</button>
        </div>
        <div class="scoreboard__controls" data-for-player = "two">
          <button class="scoreboard__control-button">-</button>
          <button class="scoreboard__control-button">+</button>
        </div>
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
    this.root
      .querySelectorAll('.scoreboard__control-button')
      .forEach(controlButton => {
        controlButton.addEventListener('click', () => {
          const direction =
            controlButton.textContent === '-' ? 'minus' : 'plus';
          const player = controlButton.closest('.scoreboard__controls').dataset
            .forPlayer;

          onControlButtonClick(player, direction);
        });
      });
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
