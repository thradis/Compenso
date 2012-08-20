@script RequireComponent(tk2dSprite)

public var nodeA : Transform;
public var nodeB : Transform;
private var nodeBLastPos : Vector3;
private var nodeALastPos : Vector3;
private var lastOrthoSize : int;

public var selectable : boolean = true;
public var selectedHue : Color;
private var selected : boolean = false;

public var linkBlockPrefab : Component;
public var slider : Component;
private var sliderScript : Component;

private var sprite : tk2dSprite;
public var iconSprite : tk2dSprite;
private var lastIconSprite : tk2dSprite = null;

public var activeResourceString : String;

public var activeResource : int = 1;
	//var for storing selected resource for transfer
	// 0 : water
	// 1 : air

function Start () {
	sprite = gameObject.GetComponent("tk2dSprite");
	transform.position = ((nodeB.transform.position - nodeA.transform.position) * 0.5) + nodeA.transform.position;
	iconSprite = iconSprite.GetComponent("tk2dSprite");
	sliderScript = slider.GetComponent("sliderBar");
	drawLink();
	
}

function Update () {
	if(nodeB.transform.position != nodeBLastPos || nodeA.transform.position != nodeALastPos || lastOrthoSize != Camera.main.orthographicSize){
		drawLink();
		sliderScript.resetPos();
		sliderScript.resetScale();
	}
	else if(nodeA.transform.position != nodeALastPos){
		drawLink();
		sliderScript.resetPos();
	}
	nodeBLastPos = nodeB.transform.position;
	nodeALastPos = nodeA.transform.position;
	lastOrthoSize = Camera.main.orthographicSize;
	
	//check for changes in sprites, if so build it.
	if(lastIconSprite != null && lastIconSprite.spriteId != iconSprite.spriteId)
		iconSprite.Build();
	if(selected == true) {
		switch (activeResource) {
		case 0 :
			activeResourceString = "waterIcon";
			break;
		case 1 :
			activeResourceString = "airIcon";
			break;
		}//end switch
		if(activeResourceString != null) {
			iconSprite.spriteId = iconSprite.GetSpriteIdByName(activeResourceString);
		}
	}//end if
}

public function tick() {
	var aScript : node = nodeA.GetComponent(node);
	var bScript : node = nodeB.GetComponent(node);
	aScript = nodeA.GetComponent(node);
	bScript = nodeB.GetComponent(node);
	var sliderValue : int = sliderScript.getValue() - 50;
	var tickAmount : double = sliderValue / 2;
	if (tickAmount < 0)
		tickAmount *= -1;
	switch (activeResource) {
	case 0 :
		if(sliderValue > 0){
			if(bScript.getMaxWater() >= (bScript.getWater() + tickAmount))
				bScript.deliverWater(aScript.requestWater(tickAmount));
			else
				bScript.deliverWater(aScript.requestWater(bScript.getMaxWater() - bScript.getWater()));
		}
		else if (sliderValue < 0){
			if(aScript.getMaxWater() >= (aScript.getWater() + tickAmount))
				aScript.deliverWater(bScript.requestWater(tickAmount));
			else
				aScript.deliverWater(bScript.requestWater(aScript.getMaxWater() - aScript.getWater()));
		}
		break;
	case 1 :
		if(sliderValue > 0){
			if(bScript.getMaxAir() >= bScript.getAir() + tickAmount)
				bScript.deliverAir(aScript.requestAir(tickAmount));
			else
				bScript.deliverAir(aScript.requestAir(bScript.getMaxAir() - bScript.getAir()));
		}
		else if (sliderValue < 0){
			if(aScript.getMaxAir() >= aScript.getAir() + tickAmount)
				aScript.deliverAir(bScript.requestAir(tickAmount));
			else
				aScript.deliverAir(bScript.requestAir(aScript.getMaxAir() - aScript.getAir()));
		}
		break;
	}
}

function getLinkStart() {
	return nodeA;
}

function getLinkEnd(){
	return nodeB;
}

function setLinkStart(tempNode : Transform){
	nodeA = tempNode;
}

function setLinkEnd(tempNode : Transform){
	nodeB = tempNode;
}

function drawLink() {
	sprite.Build();
	var linkStart : Vector2 = nodeA.transform.position;
	var linkEnd : Vector2 = nodeB.transform.position;
	var linkVector : Vector2 = nodeB.transform.position - nodeA.transform.position;
	var linkSprite : tk2dSprite = linkBlockPrefab.GetComponent(tk2dSprite);
	var nextLocation : Vector2 = linkStart;
	
	transform.position = ((nodeB.transform.position - nodeA.transform.position) * 0.5) + nodeA.transform.position;
	
	var blockSpacing : Vector2 = linkVector;
	blockSpacing.Normalize();
	var tempScale = new Vector2(Camera.main.orthographicSize / 3, Camera.main.orthographicSize / 3);
	linkSprite.scale = tempScale;
	blockSpacing *= linkSprite.GetBounds().size.y - 0.01;
	
	sprite.scale = tempScale * 2;
	iconSprite.scale = tempScale * 2;
	
	nextLocation = linkStart;
	for(var child : Transform in transform){
		if(child.name == "linkBlock(Clone)"){
			if((nextLocation - linkStart).magnitude < linkVector.magnitude) {
				child.position = nextLocation;
				child.position.z += 1;
				child.rotation = Quaternion.identity;
				child.transform.up = (nodeB.transform.position - nodeA.transform.position);
				tempSprite = child.GetComponent("tk2dSprite");;
				tempSprite.scale = tempScale;
				nextLocation += blockSpacing;
			}
			else
				Destroy(child.gameObject);
		}
	}
	while((nextLocation - linkStart).magnitude < linkVector.magnitude) {
		var temp = Instantiate(linkBlockPrefab, nextLocation, Quaternion(0, 0, 0, 0));
		temp.transform.position += Vector3.forward;
		temp.transform.up = (nodeB.transform.position - nodeA.transform.position);
		temp.transform.parent = transform;
		nextLocation += blockSpacing;
	}//end while
}



//*****MOUSE FUNCTIONS*****

public function mouseEnter () {
}//end MouseEnter	

public function mouseExit() {
}//end mouseExit

public function mouseOver() {
}//end mouseOver

function onMouseDown0 () {
	activeResource += 1.0;
	if (activeResource > 1){
		activeResource = 0;
	}//end if
}//end onMouseDown0

function onMouse0 () {
}//end onMouse0

public function isSelectable(){
	return selectable;
}//end is Selectable

public function select(){
	selected = true;
}//end select

public function deselect(){
	selected = false;
}//end deselect
