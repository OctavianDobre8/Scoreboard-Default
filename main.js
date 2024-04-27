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

  // Function to setup event listeners for the circles
  function setupCircleEventListeners() {
    // Add event listeners to the circles
    document.querySelectorAll('.player-circle').forEach(circle => {
      circle.addEventListener('click', () => {
        // Only change the circle if it belongs to the active team
        if (circle.parentNode.classList.contains('active')) {
          circle.style.backgroundColor = 'red';
          // Increment the attack count for the active team
          if (circle.parentNode.id === 'team-one') {
            teamOneAttacks++;
          } else {
            teamTwoAttacks++;
          }

          // Switch the active team if all players have attacked
          if (teamOneAttacks >= 11 || teamTwoAttacks >= 11) {
            switchTeams();
          }
        }
      });
    });
  }

  // Call the function at the beginning
  setupCircleEventListeners();

  // The function to switch teams
  function switchTeams() {
    const teamOne = document.getElementById('team-one');
    const teamTwo = document.getElementById('team-two');
    teamOne.classList.toggle('active');
    teamTwo.classList.toggle('active');

    // Reset the attack count for the new active team
    if (teamOne.classList.contains('active')) {
      teamTwoAttacks = 0;
    } else {
      teamOneAttacks = 0;
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
});
