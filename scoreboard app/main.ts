interface Player {
    name: string;
    score: number;
  }

class ScoreBoard {
     players: Player[] = [];
  
    addPlayer(name: string) {
      const newPlayer: Player = {
        name: name,
        score: 0,
      };
      this.players.push(newPlayer);
    }
  
    renderPlayers() {
      const renderPlayers = document.getElementById("render_players");
      const playersCount = document.getElementById("players_count");
      const totalPoints = document.getElementById("total_points");
      if (renderPlayers && playersCount && totalPoints) {
        renderPlayers.innerHTML = ""; 
        playersCount.textContent = `Players: ${scoreboard.players.length}`;
        totalPoints.textContent = `Total Points: ${calculateTotalPoints()}`;

        if (scoreboard.players.length == 0) {
            alert ("No more players!");
        }
        else {
            const maxScore = Math.max(...scoreboard.players.map(player => player.score));
            this.players.forEach((player, index) => {
                const playerItem = document.createElement("li");
                const starIcon = document.createElement("i");
                starIcon.classList.add("fa-regular", "fa-star");

                if (player.score === maxScore && player.score !== 0) {
                    starIcon.style.backgroundColor = "gold"; 
                  }
                  playerItem.innerHTML = `
                    <span> <button onclick="removePlayer(${index})">x</button> </span>
                    ${starIcon.outerHTML} ${player.name}
                    <span> <button onclick="decreaseScore(${index})">-</button> </span>
                    <span> ${player.score} </span>
                    <span> <button onclick="increaseScore(${index})">+</button> </span>
                `;
                renderPlayers.appendChild(playerItem);
              });
        }
      }
    }
  }
  
  const scoreboard = new ScoreBoard();
  
  function addPlayer() {
    const inputElement = document.getElementById("input") as HTMLInputElement;
    const playerName = inputElement.value;
    if (playerName) {
      scoreboard.addPlayer(playerName);
      scoreboard.renderPlayers();
      inputElement.value = ""; 
    }
  }

  function removePlayer(index: number) {
    scoreboard.players.splice(index, 1);
    scoreboard.renderPlayers();
  }

  function decreaseScore(index: number) {
    if (scoreboard.players[index].score > 0) {
      scoreboard.players[index].score -= 1;
      scoreboard.renderPlayers();
    }
  }
  
  function increaseScore(index: number) {
    scoreboard.players[index].score += 1;
    scoreboard.renderPlayers();
  }
  
  function calculateTotalPoints(): number {
    return scoreboard.players.reduce((total, player) => total + player.score, 0);
  }
  

  
  
    
  