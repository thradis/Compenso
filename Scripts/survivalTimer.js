#pragma strict
public var textScript : tk2dTextMesh;
public var nodeArray : node[];

function Start () {

}

function Update () {
	var tempTotal : int = 0;
	for(var selectedNode : node in nodeArray){
		tempTotal += selectedNode.getHuman();
	}
	
	if(parseInt(textScript.text) != tempTotal){
		textScript.text = tempTotal.ToString();
		textScript.Commit();
	}
	
	if (tempTotal == 0)
		Application.Quit();

}