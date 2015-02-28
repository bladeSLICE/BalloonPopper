#pragma strict

private var gameController : GameObject;
private var touchEventBegan = false;

function Start () {
	gameController = GameObject.FindGameObjectWithTag("GameController");
}

function Update () {
    if (Input.GetMouseButtonDown(0)) {
        gameController.SendMessage("StartGame");
		GameObject.Destroy(transform.gameObject);
    }
}

function OnTouchPhaseBegan() {
	touchEventBegan = true;
}

function OnTouchPhaseEnded() {
	if (touchEventBegan == true) {
		gameController.SendMessage("StartGame");
		GameObject.Destroy(transform.gameObject);
	}
}

function OnTouchPhaseCanceled() {
	touchEventBegan = false;
}