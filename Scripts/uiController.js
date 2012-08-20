#pragma strict
public var clickerScript : clicker;
public var uiCamera : Camera;
public var infoPlatePrefab : GameObject;
public var linkBlockPrefab : GameObject;
public var energyText : tk2dTextMesh;

private var lastSelectedID : int = 0;
private var selectedScript : node;
private var activePlate : GameObject;
private var lastOrthoSize : int = 0;
private var lastCameraPosition : Vector2;
private var drawBool : boolean = false;
private var acquiredEnergy : double = 0;

function Start () {

}

function Update () {
	var tempSelectedTransform : Transform = clickerScript.getSelectedTransform();
	if(tempSelectedTransform == null && lastSelectedID != 0) {
		selectedScript = null;
		lastSelectedID = 0;
		deselect();
	}
	else if(tempSelectedTransform != null){
		if(lastSelectedID != tempSelectedTransform.GetInstanceID()){
			selectedScript = tempSelectedTransform.GetComponent(node);
			if(selectedScript != null){
				lastSelectedID = tempSelectedTransform.GetInstanceID();
				select();
			}
		}
	}
	
	if(clickerScript.getSelectedTransform() == null) {
		eraseLink();
	}
	else if(Camera.main.orthographicSize != lastOrthoSize || Camera.main.transform.position != lastCameraPosition && selectedScript != null){
		drawLink();
		lastOrthoSize = Camera.main.orthographicSize;
		lastCameraPosition = Camera.main.transform.position;
	}
	
	acquireEnergy();

}

private function acquireEnergy(){	
	var planets : node[] = FindObjectsOfType(node) as node[];
	for(var planet : node in planets){
		acquiredEnergy += planet.emptyEnergyTank();
	}
	var tempInt : int = acquiredEnergy;
	energyText.text = tempInt.ToString();
	energyText.Commit();
}

private function select(){
	if (activePlate != null)
		Destroy(activePlate);
	var tempPos : Vector3 = uiCamera.ScreenToWorldPoint(new Vector3(150, 80, uiCamera.farClipPlane/2));
	activePlate = Instantiate(infoPlatePrefab, tempPos, Quaternion(0 ,0 , 0, 0));
	var tempScript = activePlate.GetComponent(infoPlate);
	tempScript.setNode(selectedScript);
	activePlate.transform.parent = transform;
}

private function eraseLink() {
	for( var child : Transform in transform) {
		if(child.name == "linkBlock(Clone)"){
			Destroy(child.gameObject);
		}
	}//end for
	drawBool = false;
}//end erase link

private function drawLink(){
	var linkEnd : Vector2 = Camera.main.ScreenToWorldPoint(uiCamera.WorldToScreenPoint(activePlate.transform.position));
	var linkStart : Vector2 = clickerScript.getSelectedTransform().position;
	var linkVector : Vector2 = linkStart - linkEnd;
	var linkSprite : tk2dSprite = linkBlockPrefab.GetComponent(tk2dSprite);
	var nextLocation : Vector2 = linkStart;
	
	var blockSpacing : Vector2 = linkVector;
	blockSpacing.Normalize();
	var tempScale = new Vector2(50, 50);
	linkSprite.scale = tempScale;
	blockSpacing *= linkSprite.GetBounds().size.y;
	
	nextLocation = linkStart;
	for(var child : Transform in transform){
		if(child.name == "linkBlock(Clone)"){
			if((nextLocation - linkStart).magnitude < linkVector.magnitude && (nextLocation - linkStart).magnitude < (linkStart - linkEnd).magnitude) {
				child.position = nextLocation;
				child.rotation = Quaternion.identity;
				child.transform.up = (linkEnd - linkStart);
				nextLocation -= blockSpacing;
			}
			else
				Destroy(child.gameObject);
		}
	}
	while((nextLocation - linkStart).magnitude < linkVector.magnitude && (nextLocation - linkStart).magnitude < (linkStart - linkEnd).magnitude) {
		var temp = Instantiate(linkBlockPrefab, nextLocation, Quaternion(0, 0, 0, 0));
		temp.transform.up = linkEnd - linkStart;
		temp.transform.parent = transform;
		nextLocation -= blockSpacing;
	}//end while
}

private function deselect(){
	if(activePlate.gameObject != null){
		Destroy(activePlate);
		activePlate = null;
	}
	eraseLink();
}

public function getEnergy() {
	return acquiredEnergy;
}

public function withdrawEnergy(request : int){
	acquiredEnergy -= request;
}