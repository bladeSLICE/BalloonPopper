#pragma strict

var startGameButton : GameObject;
private var gameUI : GameObject;

function Start () {
    gameUI = GameObject.FindWithTag("UIController");
    DisableGameUI();
    OpenMainMenu();
}

function Update () {

}

function OpenMainMenu () {
    Instantiate(startGameButton);
}

function ShowHighScoreMenu() {
    OpenMainMenu();
}

function DisableGameUI() {
    gameUI.SendMessage("Disable");
}