public var iconSprite : tk2dSprite = null;
public var activeColor : Color = Color.white;
public var proceedColor : Color = Color.green;
public var stopColor : Color = Color.red;
public var linkBlockPrefab : GameObject = null;
public var buttonCost : int = 200;

private var drawBool : boolean = false;
private var nodeAPopulated : boolean = false;
private var maxLengthReached : boolean = false;
private var clickerScript : Component;
private var lastMousePos : Vector2;
private var selectedTransform : Transform;

private var nodeA : Transform = null;
private var nodeB : Transform = null;
private var maxLinkLength : double = 400;
private var uiScript : uiController;


function Start () {
	iconSprite = GetComponent(tk2dSprite);
	var tempClicker = GameObject.Find("clicker");
	clickerScript = tempClicker.GetComponent(clicker);
	var tempUi = gameObject.Find("UI");
	uiScript = tempUi.GetComponent(uiController);
}

function Update () {
	if(drawBool == true){
		iconSprite.color = stopColor;
		var tempHoveredTransform = clickerScript.getHoveredTransform();
		if(tempHoveredTransform != null){
			var tempHoveredScript = tempHoveredTransform.GetComponent(node);
			if(tempHoveredScript != null){
				if(tempHoveredScript.getHuman() == 0 && uiScript.getEnergy() > buttonCost) {
					iconSprite.color = proceedColor;
					if(Input.GetMouseButtonDown(0)){
						tempHoveredScript.populate();
						iconSprite.color = Color.white;
						uiScript.withdrawEnergy(buttonCost);
						drawBool = false;
					}
				}
			}
		}
		else if (Input.GetMouseButtonDown(0)){
			drawBool = false;
			iconSprite.color = Color.white;
		}
	}	
}


public function mouseEnter () {
}//end MouseEnter	

public function mouseExit() {
}//end mouseExit

public function mouseOver() {
}//end mouseOver

function onMouseDown0 () {
	if(clickerScript.getSelectedTransform().GetComponent(node) != null)
		drawBool = true;
	
	iconSprite.color = activeColor;
	iconSprite.Build();
}//end onMouseDown0

function onMouse0 () {
}//end onMouse0

public function isSelectable(){
	return false;
}//end is Selectable

public function select(){
}//end select

public function deselect(){
}//end deselect