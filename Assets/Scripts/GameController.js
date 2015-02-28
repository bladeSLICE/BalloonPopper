#pragma strict
var scoreObject : GameObject;
var balloonObject : GameObject;
var useKeyboardControls : boolean;
private var balloonsInGame : int;
private var score : int;
private var gameIsInRound : boolean;
private var keyLetters = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
private var scoreUIText : GameObject;
private var gameUIController : GameObject;
private var menuController : GameObject;
private var xBound : float;
private var yBound : float;
function Start () {
    yBound = Camera.main.camera.orthographicSize;
    xBound = yBound * Camera.main.camera.aspect;
    
    gameUIController = GameObject.FindGameObjectWithTag("UIController");
    menuController = GameObject.FindGameObjectWithTag("MenuController");

    
    score = 0;
}

function Update () {
    
}

function BalloonPopped(ballonScoreValue: int) {
	score += ballonScoreValue;
    scoreUIText.guiText.text = "Score: " + score;
    BalloonDeleted();
}

function StartGame() {
    scoreUIText = Instantiate(scoreObject, Vector3(0,1,0), Quaternion.identity);
    if(useKeyboardControls == true){
    	TouchScreenKeyboard.Open("",TouchScreenKeyboardType.Default,false);
    }
    score = 0;
    scoreUIText.guiText.text = "Score: " + score;
    balloonsInGame = 0;
    gameIsInRound = false;
    //SpawnBalloons(30);
    StartRound(20,1.0,3.0,0.5,2);
    while(gameIsInRound) {
        yield WaitForSeconds(1);
    }
    yield WaitForSeconds(3);
    StartRound(20,1.0,3.75,0.25,2);
    while(gameIsInRound) {
        yield WaitForSeconds(1);
    }
    yield WaitForSeconds(3);
    StartRound(25,1.5,4.5,0.25,1.5);
    while(gameIsInRound) {
        yield WaitForSeconds(1);
    }
    yield WaitForSeconds(3);
    StartRound(25,2.0,5.0,0.25,1.5);
    while(gameIsInRound) {
        yield WaitForSeconds(1);
    }
    yield WaitForSeconds(3);
    StartRound(25,2.25,6.0,0,1.5);
    while(gameIsInRound) {
        yield WaitForSeconds(1);
    }
    yield WaitForSeconds(3);
    EndGame();
}

function SpawnBalloons(numberToSpawn : int) {
	for (var i = 0; i < numberToSpawn; i++) {
        var clone : GameObject;
        var xCoordinate = Random.Range(-3.0,3.0);
        clone = Instantiate(balloonObject, Vector3(xCoordinate,-5,0), Quaternion.identity);
        clone.SendMessage("SetSpeed",Random.Range(0.015,0.045));
        balloonsInGame ++;
        yield WaitForSeconds (Random.Range(0,2));
    }
    WaitForGameToEnd();
}

function BalloonDeleted() {
    balloonsInGame --;
}

function WaitForGameToEnd() {
    while(balloonsInGame > 0) {
        yield WaitForSeconds(1);
    }
    menuController.SendMessage("ShowHighScoreMenu");
}

function StartRound(nubmerOfBalloonsToSpawn : int, minBalloonSpeed : float, maxBalloonSpeed : float, minWaitTime : float, maxWaitTime : float) {
    gameIsInRound = true;
    for (var i = 0; i < nubmerOfBalloonsToSpawn; i++) {
        SpawnBalloon(Random.Range(-1*xBound+balloonObject.renderer.bounds.extents.x,xBound-balloonObject.renderer.bounds.extents.x), Random.Range(minBalloonSpeed,maxBalloonSpeed));
        yield WaitForSeconds (Random.Range(minWaitTime,maxWaitTime));
    }
    while(balloonsInGame > 0) {
        yield WaitForSeconds(1);
    }
    gameIsInRound = false;
}

function EndGame() {
    scoreUIText.Destroy(scoreUIText);
    var menuController = GameObject.FindGameObjectWithTag("MenuController");
    menuController.SendMessage("ShowHighScoreMenu");
}

function SpawnBalloon(xCoordinate : float, balloonSpeed : float) {
        var clone : GameObject;
        clone = Instantiate(balloonObject, Vector3(xCoordinate,-1*yBound-balloonObject.renderer.bounds.extents.y,0), Quaternion.identity);
        clone.SendMessage("AddSpeed",balloonSpeed);
        if (useKeyboardControls == true) {
            clone.SendMessage("AddDestroyLetter",keyLetters[Random.Range(0,25)]);
        }
        balloonsInGame ++;
}