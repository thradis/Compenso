public var infoPanePrefab : Component;

var temp : boolean = false;
var selected : Component;

var script : Component;
static var hit : RaycastHit;
static var lastHit : RaycastHit;
static var lastSelected : Component;
var holding : boolean = false;

var mainCamera : Camera;
var uiCamera : Camera;

function Update(){
    var ray = uiCamera.ScreenPointToRay(Input.mousePosition);
    if (!Physics.Raycast(ray, hit, Mathf.Infinity)){
    	ray = mainCamera.ScreenPointToRay(Input.mousePosition);
    }//end if
    lastHit = hit;
    
    if(Input.GetMouseButton(0) == false)
    	holding = false;
    
    if (Physics.Raycast(ray, hit, 10000) && hit.transform.tag == "clickable" && holding == false){
    	script = hit.transform.GetComponent(clickableInterface);
    	if(lastHit.transform.GetInstanceID != hit.transform.GetInstanceID)
    		script.mouseEnter();
    	else if(lastHit.transform.GetInstanceID == hit.transform.GetInstanceID)
    		script.mouseOver();

    	if(Input.GetMouseButtonDown(0)) {
    		if(script.isSelectable()){
    			selected = script;
    			selected.select();
    		}//end if
    		script.onMouseDown0();
    	}//end if
    	else if(Input.GetMouseButton(0)){
    		holding = true;
			StartCoroutine("hold0");
    	}//end else if
    	else if(Input.GetMouseButtonUp(0)){
    	}//end else if
    	else {
    	}//end else
    }//end if
    else if (script != null && holding == false){
    	script.mouseExit();
        script = null;
    }//end else if
    else if (Input.GetMouseButtonDown(0)) {
    	selected = null;
    }//end else if
    
    //send messages to selected node
    if(lastSelected != selected && lastSelected != null)
    	lastSelected.deselect();
    	
    lastSelected = selected;
}//end Update

function hold0 () {
	script.onMouse0();
	yield WaitForFixedUpdate;
	if(Input.GetMouseButton(0))
		StartCoroutine("hold0");
}//end hold0

function getSelectedTransform () : Transform {
	if (selected != null)
		return selected.transform;
	else
		return null;
}

function getHoveredTransform () {
	if (script != null)
		return script.transform;
	else
		return null;
}