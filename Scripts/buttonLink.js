public var iconSprite : tk2dSprite = null;
public var stopColor : Color = Color.red;
public var proceedColor : Color = Color.green;
public var activeColor : Color = Color.white;
private var maxLinkLength : double = 400;
private var lastMousePos : Vector2;
var drawBool : boolean = false;
public var buttonCost : int = 100;

public var linkBlockPrefab : Component = null;
public var linkPrefab : Component = null;
public var selectable : boolean = false;
private var clickerScript : Component;
private var maxLengthReached : boolean = false;
private var nodeAPopulated : boolean = false;
private var uiScript : uiController;
private var selectedNode : Transform;

function Start () {
	var tempClicker = GameObject.Find("clicker");
	clickerScript = tempClicker.GetComponent(clicker);
	iconSprite = GetComponent(tk2dSprite);
	var tempUi = gameObject.Find("UI");
	uiScript = tempUi.GetComponent(uiController);
	selectedNode = clickerScript.getSelectedTransform();
}//end Start

function Update () {
	if(drawBool == true){
		iconSprite.color = stopColor;
		var tempHoveredTransform = clickerScript.getHoveredTransform();
		if(tempHoveredTransform != null){
			var tempHoveredScript = tempHoveredTransform.GetComponent(node);
			if(tempHoveredScript != null){
				if(tempHoveredScript.getHuman() == 0 && uiScript.getEnergy() > buttonCost) {
					iconSprite.color = proceedColor;
					var linkStart : Transform = selectedNode;
					var linkEnd : Transform = clickerScript.getSelectedTransform();
					if(Input.GetMouseButtonDown(0)){
						var tempLink = Instantiate(linkPrefab, transform.position, Quaternion(0, 0, 0, 0)); 
						var tempLinkScript = tempLink.GetComponent("link");
						tempLinkScript.setLinkEnd(linkEnd);
						tempLinkScript.setLinkStart(linkStart);
						tempLinkScript.Start();
						uiScript.withdrawEnergy(buttonCost);
						drawBool = false;
						iconSprite.color = Color.white;
					}
				}
			}
		}
		else if (Input.GetMouseButtonDown(0)){
			drawBool = false;
			iconSprite.color = Color.white;
		}
	}
}//end Update

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

