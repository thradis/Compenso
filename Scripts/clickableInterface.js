
public var script : Component;

function Start () {
}//end Start

function Update () {
}//end Update

//*****MOUSE FUNCTIONS*****

public function mouseEnter () {
	script.mouseEnter();
}//end MouseEnter	

public function mouseExit() {
	script.mouseExit();
}//end mouseExit

public function mouseOver() {
	script.mouseOver();
}//end mouseOver

function onMouseDown0 () {
	script.onMouseDown0();
}//end onMouseDown0

function onMouse0 () {
	script.onMouse0();
}//end onMouse0

public function isSelectable(){
	return script.isSelectable();
}//end is Selectable

public function select(){
	script.select();
}//end select

public function deselect(){
	script.deselect();
}//end deselect

/*
-------------ADD FOLLOWING CODE TO ANY CLICKABLE OBJECT--------------

public var selectable : boolean = false;
public function mouseEnter () {
}//end MouseEnter	

public function mouseExit() {
}//end mouseExit

public function mouseOver() {
}//end mouseOver

function onMouseDown0 () {
}//end onMouseDown0

function onMouse0 () {
}//end onMouse0

public function isSelectable(){
	return selectable;
}//end is Selectable

public function select(){
}//end select

public function deselect(){
}//end deselect

*/
