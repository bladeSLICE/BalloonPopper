#pragma strict

function Start () {

}

function Update () {

}

function Disable() {
    //Disable Children too
//    var allChildren = gameObject.GetComponentsInChildren(GameObject);
//    for (var child : GameObject in allChildren ) {
//        child.SendMessage("Disable");
//    }
    
    for ( var r : Renderer in GetComponentsInChildren(Renderer) )
    {
        r.enabled = false;
    }
    
    for ( var text : GUIText in GetComponentsInChildren(GUIText) )
    {
        text.enabled = false;
    }
}