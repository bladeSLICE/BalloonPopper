#pragma strict

function Start () {

}

function Update () {
	for (var touch : Touch in Input.touches) {
		var ray = Camera.main.ScreenPointToRay (touch.position);
		var hit : RaycastHit;
		if (Physics.Raycast (ray, hit)) {
			switch (touch.phase) {
				case TouchPhase.Began:
					hit.transform.gameObject.SendMessage("OnTouchPhaseBegan");
					break;
				case TouchPhase.Moved:
					hit.transform.gameObject.SendMessage("OnTouchPhaseMoved");
					break;
				case TouchPhase.Stationary:
					hit.transform.gameObject.SendMessage("OnTouchPhaseStationary");
					break;
				case TouchPhase.Ended:
					hit.transform.gameObject.SendMessage("OnTouchPhaseEnded");
					break;
				case TouchPhase.Canceled: 
					hit.transform.gameObject.SendMessage("OnTouchPhaseCanceled");
					break;
			}
		}
	}
}