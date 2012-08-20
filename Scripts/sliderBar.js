@script RequireComponent(tk2dSprite)

private var nodeA : Component = null;
private var nodeB : Component = null;
private var link : Component = null;
private var sprite : tk2dSprite ;
public var maxDist : double = 600;
public var sliderPercent : int = 50;

var tempBool : boolean = false;


function Start () {
	sprite = transform.GetComponent("tk2dSprite");
	link = transform.parent.GetComponent("link");
	nodeA = link.getLinkStart();
	nodeB = link.getLinkEnd();
	transform.right = nodeB.transform.position - nodeA.transform.position;
	transform.position = transform.parent.position;
	transform.position.z = 3;
}

function Update () {
	if(nodeA == null || nodeA != link.getLinkStart())
		nodeA = link.getLinkStart();
	if(nodeB == null || nodeB != link.getLinkEnd())
		nodeB = link.getLinkEnd();
		
}

public function getValue(){
	if(sliderPercent > 100)
		sliderPercent = 100;
	else if(sliderPercent < 0)
		sliderPercent = 0;
	return sliderPercent;
}

public function resetPos () {
	transform.right = nodeB.transform.position - nodeA.transform.position;
	transform.position = nodeA.transform.position - ((nodeA.transform.position - nodeB.transform.position)/(200)) * (sliderPercent + 50);
	transform.position.z = 3;
}

public function resetScale () {
	sprite.scale = Vector2(Camera.main.orthographicSize / 1.5, Camera.main.orthographicSize / 1.5);
	nodeA = link.getLinkStart();
	nodeB = link.getLinkEnd();
	transform.right = nodeB.transform.position - nodeA.transform.position;
	transform.position.z = 3;
}

public var selectable : boolean = false;

public function mouseEnter () {
}//end MouseEnter	

public function mouseExit() {
}//end mouseExit

public function mouseOver() {
}//end mouseOver

public function onMouseDown0 () {
}//end onMouseDown0

public function onMouse0 () {
	tempBool = true;
	nodeA = link.getLinkStart();
	nodeB = link.getLinkEnd();
	var mousePos : Vector3 = Camera.main.ScreenToWorldPoint(new Vector3(Input.mousePosition.x, Input.mousePosition.y, 1003));
	var relativeMousePos : Vector3 = transform.InverseTransformPoint(mousePos);
	var diffDist : float = mousePos.x - transform.position.x;
	var AtoB : float = new Vector2.Distance(nodeA.transform.position, nodeB.transform.position);
	var toA : float = new Vector2.Distance(transform.position, nodeA.transform.position);
	var toB : float = new Vector2.Distance(transform.position, nodeB.transform.position);
	if(relativeMousePos.x < maxDist/2  || relativeMousePos.x > maxDist/2) {
		if(relativeMousePos.x < 0 && toA > AtoB/4)
			transform.position = Vector2.MoveTowards(transform.position, nodeA.transform.position, maxDist * 200);
		else if(relativeMousePos.x > 0 && toB > AtoB/4)
			transform.position = Vector2.MoveTowards(transform.position, nodeB.transform.position, maxDist * 200);
	}
	
	sliderPercent = (toA - (AtoB/4)) / (AtoB/200);
}//end onMouse0

public function isSelectable(){
	return false;
}//end is Selectable

public function select(){
}//end select

public function deselect(){
}//end deselect

