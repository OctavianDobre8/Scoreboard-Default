import ScoreboardView from './Scoreboard/ScoreboardView.js';

document.addEventListener('DOMContentLoaded', () => {
  let playerOneScore = 0;
  let playerTwoScore = 0;

  const root = document.getElementById('app');
  const view = new ScoreboardView(
    root,
    'Player One',
    'Player Two',
    (player, direction) => {
      //update the score
      const difference = direction === 'minus' ? -1 : 1;

      if (player === 'one') {
        playerOneScore = Math.max(playerOneScore + difference, 0);
      } else {
        playerTwoScore = Math.max(playerTwoScore + difference, 0);
      }

      view.update(playerOneScore, playerTwoScore);
    }
  );

  let teamOneAttacks = 0;
  let teamTwoAttacks = 0;

  //add event listeners to the circles
  document.querySelectorAll('.player-circle').forEach(circle => {
    circle.addEventListener('click', () => {
      circle.style.backgroundColor = 'red';
      //increment the attack count for the active team
      if (circle.parentNode.id === 'team-one') {
        teamOneAttacks++;
      } else {
        teamTwoAttacks++;
      }

      //switch the active team if all player have attacked
      if (teamOneAttacks >= 11 || teamTwoAttacks >= 11) {
        switchTeams();
      }
    });
  });

  //the function to switch teams
  function switchTeams() {
    const teamOne = document.getElementById('team-one');
    const teamTwo = document.getElementById('team-two');
    teamOne.classList.toggle('active');
    teamTwo.classList.toggle('active');

    //copy the player circles from the non-active team to the active team and remove the original ones
    if (teamOne.classList.contains('active')) {
      const teamTwoCircles = Array.from(teamTwo.querySelectorAll('.player-circle'));
      teamTwoCircles.forEach(circle => {
        const clone = circle.cloneNode(true);
        teamOne.appendChild(clone);
        teamTwo.removeChild(circle);
      });
      teamTwoAttacks = 0;
    } else {
      const teamOneCircles = Array.from(teamOne.querySelectorAll('.player-circle'));
      teamOneCircles.forEach(circle => {
        const clone = circle.cloneNode(true);
        teamTwo.appendChild(clone);
        teamOne.removeChild(circle);
      });
      teamOneAttacks = 0;
    }
  }

  // Make the first team active initially
  document.getElementById('team-one').classList.add('active');
});