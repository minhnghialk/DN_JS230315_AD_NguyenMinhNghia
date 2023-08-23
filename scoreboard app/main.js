"use strict";
class ScoreBoard {
    constructor() {
        this.players = [];
    }
    addPlayer(name) {
        const newPlayer = {
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
                alert("No more players!");
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
    const inputElement = document.getElementById("input");
    const playerName = inputElement.value;
    if (playerName) {
        scoreboard.addPlayer(playerName);
        scoreboard.renderPlayers();
        inputElement.value = "";
    }
}
function removePlayer(index) {
    scoreboard.players.splice(index, 1);
    scoreboard.renderPlayers();
}
function decreaseScore(index) {
    if (scoreboard.players[index].score > 0) {
        scoreboard.players[index].score -= 1;
        scoreboard.renderPlayers();
    }
}
function increaseScore(index) {
    scoreboard.players[index].score += 1;
    scoreboard.renderPlayers();
}
function calculateTotalPoints() {
    return scoreboard.players.reduce((total, player) => total + player.score, 0);
}
