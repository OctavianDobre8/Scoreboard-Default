import ScoreboardView from './Scoreboard/ScoreboardView.js';

document.addEventListener('DOMContentLoaded', () => {
  let playerOneScore = 0;
  let playerTwoScore = 0;

  const root = document.getElementById('app');
  const view = new ScoreboardView(
    root,
    'Echipa 1',
    'Echipa 2',
    (player, direction) => {
      // Update the score
      const difference = direction === 'minus' ? -1 : 1;

      if (player === 'one') {
        playerOneScore = Math.max(playerOneScore + difference, 0);
      } else {
        playerTwoScore = Math.max(playerTwoScore + difference, 0);
      }

      // Update the view with the new scores
      view.update(playerOneScore, playerTwoScore);
    }
  );

  let teamOneAttacks = 0;
  let teamTwoAttacks = 0;
  let currentTeamOneCircle = 0;
  let currentTeamTwoCircle = 0;

  function switchTeams() {
    const teamOne = document.getElementById('team-one');
    const teamTwo = document.getElementById('team-two');

    // Toggle the active class
    teamOne.classList.toggle('active');
    teamTwo.classList.toggle('active');

    // Reset the current active circle for the new active team
    if (teamOne.classList.contains('active')) {
      currentTeamTwoCircle = 0;
    } else {
      currentTeamOneCircle = 0;
    }
  }

  // Make the first team active initially
  document.getElementById('team-one').classList.add('active');

  // Add event listener to the "Edit Numbers" button
  document.getElementById('edit-numbers').addEventListener('click', () => {
    // Create a textbox for each circle
    document.querySelectorAll('.player-circle').forEach(circle => {
      const textbox = document.createElement('input');
      textbox.type = 'text';
      textbox.value = circle.textContent;
      textbox.size = 1; // Make the textbox small
      textbox.maxLength = 2; // Limit input to two characters

      // Replace the circle with the textbox
      circle.parentNode.replaceChild(textbox, circle);
    });
  });

  // Add event listener to the "Save Numbers" button
  document.getElementById('save-numbers').addEventListener('click', () => {
    // Replace each textbox with a circle
    document.querySelectorAll('input[type="text"]').forEach(textbox => {
      const circle = document.createElement('div');
      circle.className = 'player-circle';
      circle.textContent = textbox.value;

      // Replace the textbox with the circle
      textbox.parentNode.replaceChild(circle, textbox);
    });

    // Set up the event listeners for the new circles
    setupCircleEventListeners();
  });

  // Add event listener to the team names
  document.querySelectorAll('.scoreboard__name').forEach(name => {
    name.addEventListener('click', () => {
      // Create a textbox with the current name
      const textbox = document.createElement('input');
      textbox.type = 'text';
      textbox.value = name.textContent;
      textbox.style.width = '100px'; // Set the width
      textbox.style.height = '20px'; // Set the height
      textbox.style.textAlign = 'center'; // Center the text
      textbox.style.color = 'white'; // Set the text color
      textbox.style.backgroundColor = 'transparent'; // Set the background color
      textbox.style.border = 'none'; // Remove the border
      textbox.style.outline = 'none'; // Remove the outline

      // Replace the name with the textbox
      name.parentNode.replaceChild(textbox, name);

      // Focus the textbox and select the text
      textbox.focus();
      textbox.select();

      // Save the new name when Enter is pressed
      textbox.addEventListener('keydown', event => {
        if (event.key === 'Enter') {
          // Prevent form submission
          event.preventDefault();

          // Replace the textbox with the name
          const newName = document.createElement('div');
          newName.className = 'scoreboard__name';
          newName.textContent = textbox.value;
          newName.style.color = 'white'; // Set the text color

          textbox.parentNode.replaceChild(newName, textbox);
        }
      });
    });
  });

  // Add keydown event listener
  document.addEventListener('keydown', event => {
    if (event.key === 'e') {
      const editButton = document.getElementById('edit-numbers');
      const saveButton = document.getElementById('save-numbers');
      const isHidden = editButton.style.display === 'none';

      editButton.style.display = isHidden ? 'block' : 'none';
      saveButton.style.display = isHidden ? 'block' : 'none';
    }
    // Check which key was pressed
    if (event.key === 'ArrowUp') {
      // Increment the score of the first team
      playerOneScore = playerOneScore + 1;
    } else if (event.key === 'ArrowDown') {
      // Decrement the score of the first team, but don't go below zero
      playerOneScore = Math.max(playerOneScore - 1, 0);
    } else if (event.key === 'ArrowRight') {
      // Increment the score of the second team
      playerTwoScore = playerTwoScore + 1;
    } else if (event.key === 'ArrowLeft') {
      // Decrement the score of the second team, but don't go below zero
      playerTwoScore = Math.max(playerTwoScore - 1, 0);
    }

    if (event.key === 'l') {
      // Get the active team and the current active circle for that team
      const activeTeam = document.querySelector('.team.active');
      const activeTeamId = activeTeam.id;
      const currentCircle =
        activeTeamId === 'team-one'
          ? currentTeamOneCircle
          : currentTeamTwoCircle;

      // Get the circle elements for the active team
      const circles = activeTeam.querySelectorAll('.player-circle');

      // If the current active circle is less than the number of circles, change its color
      if (currentCircle < circles.length) {
        circles[currentCircle].style.backgroundColor = 'red';

        // Increment the current active circle for the active team
        if (activeTeamId === 'team-one') {
          currentTeamOneCircle++;
        } else {
          currentTeamTwoCircle++;
        }

        // Switch the active team if all players have attacked
        if (currentTeamOneCircle >= 11 || currentTeamTwoCircle >= 11) {
          switchTeams();
        }
      }
    }

    // Update the view with the new scores
    view.update(playerOneScore, playerTwoScore);
  });
});
