#pragma strict
var letterTextMesh : TextMesh;
private var deystroyLetter : String;
private var useDestroyLetter = false;

function Start () {
	
}

function Update () {
    if (transform.position.y > 7) {
        DeleteFromMemory();
    }
    if (useDestroyLetter == true) {
        if (Input.GetKeyDown(deystroyLetter)) {
            Pop();
        }
    }
}

function OnTouchPhaseBegan() {
	Pop();
}

function Pop() {
    var gameController : GameObject;
    gameController = GameObject.FindGameObjectWithTag("GameController");    
	gameController.SendMessage("BalloonPopped",1);
	gameObject.Destroy(gameObject);
}

function AddSpeed(speed : float) {
	rigidbody.velocity = Vector3(0,speed,0);
}

function DeleteFromMemory() {
    var gameController : GameObject;
    gameController = GameObject.FindGameObjectWithTag("GameController");
	gameController.SendMessage("BalloonDeleted");
	gameObject.Destroy(gameObject);
}

function AddDestroyLetter(letter : String) {
    letterTextMesh.text = letter.ToUpper();
    deystroyLetter = letter;
    useDestroyLetter = true;
}