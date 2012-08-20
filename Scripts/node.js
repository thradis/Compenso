@script RequireComponent (Collider)

//resources
private var maxAir : int = 500;
private var maxWater : int = 500;
private var maxSpace : int = 500;
public var air : double = 400;
public var water : double = 400;
public var plant : double = 400;
public var human : double = 800;
private var selected : boolean = false;
private var linkable : boolean = true;
private var toxic : boolean = false;

var nodeSize : int = 8;
public var selectedHue : Color;
public var landSprite : tk2dSprite = null;
public var waterSprite : tk2dSprite = null;
public var airSprite : tk2dSprite = null;
public var auraSprite : tk2dSprite = null;
var selectable : boolean = true;
var tickTime : float = 1;

private var waterSpriteID : int;
private var lastWaterSpriteID : int = -1;
private var airSpriteID : int;
private var lastAirSpriteID : int = -1;
private var landSpriteID : int;
private var lastLandSpriteID : int = -1;

private var energyTank : double = 0;


//*******private functions*******
//

function Start () {
	maxWater = 500 + (50 * nodeSize);
	maxAir = 500 + (50 * nodeSize);
	maxSpace = 500 + (100 * nodeSize);
	var tempScale = 50 + nodeSize * 3;
	landSprite.scale = Vector2(tempScale, tempScale);
	landSprite.Build();
	airSprite.scale = Vector2(tempScale, tempScale);
	airSprite.Build();
	waterSprite.scale = Vector2(tempScale, tempScale);
	waterSprite.Build();
	auraSprite.scale = Vector2(tempScale, tempScale);
	auraSprite.Build();
	
	toxic = false;
}//end Start

function Update(){

	//toxicity switch
	if(human > maxSpace * 0.98 || (air + water) < (maxAir + maxWater)*.005)
		toxic = true;
	if((air + water) > (maxAir + maxWater) * 0.25 && human <= 0)
		toxic = false;
		
	updateSprite();
	
	//zero checks
	if(air < 0)
		air = 0;
	if(water < 0)
		water = 0;
	if(plant < 0)
		plant = 0;
	if(human < 0)
		human = 0;

		
		
}//end Update

private function updateSprite(){
	//sprite checks
	if(water >= maxWater *(0.875))
		waterSpriteID = 0;
	else if(water >= maxWater *(0.75))
		waterSpriteID = 1;
	else if(water >= maxWater *(0.625))
		waterSpriteID = 2;
	else if(water >= maxWater *(0.5))
		waterSpriteID = 3;
	else if(water >= maxWater *(0.375))
		waterSpriteID = 4;
	else if(water >= maxWater *(0.25))
		waterSpriteID = 5;
	else if(water >= maxWater *(0.125))
		waterSpriteID = 6;
	else 
		waterSpriteID = 7;
		
	if(waterSpriteID != lastWaterSpriteID){
		waterSprite.spriteId = waterSprite.GetSpriteIdByName("water0"+waterSpriteID);
		waterSprite.Build();
		lastWaterSpriteID = waterSpriteID;
	}
	
	if(plant >= maxSpace *(0.875))
		landSpriteID = 0;
	else if(plant >= maxSpace *(0.75))
		landSpriteID = 1;
	else if(plant >= maxSpace *(0.625))
		landSpriteID = 2;
	else if(plant >= maxSpace *(0.5))
		landSpriteID = 3;
	else if(plant >= maxSpace *(0.375))
		landSpriteID = 4;
	else if(plant >= maxSpace *(0.25))
		landSpriteID = 5;
	else if(plant >= maxSpace *(0.125))
		landSpriteID = 6;
	else 
		landSpriteID = 7;
		
	if(landSpriteID != lastLandSpriteID){
		landSprite.spriteId = landSprite.GetSpriteIdByName("land0"+landSpriteID);
		landSprite.Build();
		lastWaterSpriteID = landSpriteID;
	}
	
	if(air >= maxAir *(0.875))
		airSpriteID = 0;
	else if(air >= maxAir *(0.75))
		airSpriteID = 1;
	else if(air >= maxAir *(0.625))
		airSpriteID = 2;
	else if(air >= maxAir *(0.5))
		airSpriteID = 3;
	else if(air >= maxAir *(0.375))
		airSpriteID = 4;
	else if(air >= maxAir *(0.25))
		airSpriteID = 5;
	else if(air >= maxAir *(0.125))
		airSpriteID = 6;
	else 
		airSpriteID = 7;
		
	if(airSpriteID != lastAirSpriteID){
		airSprite.spriteId = airSprite.GetSpriteIdByName("air0"+airSpriteID);
		airSprite.Build();
		lastWaterSpriteID = airSpriteID;
	}
	
	var humanSpriteID : int = -1;
	if(human >= maxSpace *(0.875))
		humanSpriteID = 8;
	else if(human >= maxSpace *(0.75))
		humanSpriteID = 7;
	else if(human >= maxSpace *(0.625))
		humanSpriteID = 6;
	else if(human >= maxSpace *(0.5))
		humanSpriteID = 5;
	else if(human >= maxSpace *(0.375))
		humanSpriteID = 4;
	else if(human >= maxSpace *(0.25))
		humanSpriteID = 3;
	else if(human >= maxSpace *(0.125))
		humanSpriteID = 2;
	else 
		humanSpriteID = 1;
	
	var tempInt : int = 3 * nodeSize + 50 + humanSpriteID * 3 + 5;
	if (human == 0){
		tempInt = 1;
	}
	auraSprite.scale = Vector2(tempInt, tempInt);
	auraSprite.Build();
	
	
	
	
}

public function tick () {
	requestWater(human * 0.02);
	requestAir(human * 0.02);
	if(toxic == false){
		var humanGrowth : double = human * 0.015;
		if(humanGrowth < maxSpace * .002)
			humanGrowth = maxSpace * .002;
		if(humanGrowth > air || humanGrowth > water){
			if(humanGrowth > air)
				humanGrowth = air;
			if(humanGrowth > water)
				humanGrowth = water;
		}
		
		
		if(humanGrowth == 0){
			if(human * 0.02 > maxSpace * 0.05)
				human *= 0.98;
			else
				human -= maxSpace * .005;
			if(human < 0)
				human = 0;
		}
		else if(humanGrowth + human <= maxSpace && human != 0){
			human += humanGrowth;
			energyTank += humanGrowth;
			requestAir(humanGrowth * 2);
			requestWater(humanGrowth * 2);
			if(plant + human > maxSpace)
				plant = maxSpace - human;
		}
		else if (humanGrowth + human > maxSpace) {
			human = maxSpace;
			plant = 0;
		}
		//plant growth function
		var plantGrowth : double = plant * 0.001;
		if(plantGrowth + plant + human <= maxSpace){
			if((plant + plantGrowth) > maxSpace)
				plant = maxSpace;
			else
				plant += plantGrowth;
		}
		else{
			plant = maxSpace - human;
		}
	}
	else if (toxic) {
		//human decay function
		if(human * 0.1 > maxSpace * 0.05)
			human *= 0.9;
		else
			human -= maxSpace *0.05;
		if(human < 0)
			human = 0;
			
		//plant toxic growth
		var plantToxicGrowth : double = plant * 0.0005;
		if(plantToxicGrowth + human <= maxSpace){
			plant += plantToxicGrowth;
		}
		else{
			plant = maxSpace - human;
		}
	}	
	
	//plant cleansing function
	var cleanAmount : double = plant * 0.005;
	deliverWater(cleanAmount);
	deliverAir(cleanAmount);
}

//*******mouse functions*******
//
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
	waterSprite.color = selectedHue;
	//waterSprite.Build();
}//end select

public function deselect(){
	waterSprite.color = Color.white;
	//waterSprite.Build();
}//end deselect

//*******resource functions*******
// -- all functions accept request amount and return amount accepted
public function requestAir(request : double) {
	if (request <= air){
		air -= request;
		return request;
	}//end if
	else{
		request = air;
		air = 0;
		return request;
	}//end else
}//end requestCleanAir

public function requestWater(request : double) {
	if (request <= water){
		water -= request;
		return request;
	}//end if
	else{
		request = water;
		water = 0;
		return request;
	}//end else
}//end requestCleanWater


public function deliverAir(request : double) {
	if((maxAir - air) <= 0) {
		return 0;
	}//end if
	else if(request <= maxAir - air) {
		air += request;
		return request;
	}//end if
	else if(request > maxAir - air){
		request = maxAir - air;
		air += request;
		return request;
	}//end else
}//end deliverCleanAir

public function deliverWater(request : double) {
	if((maxWater - water) <= 0) {
		return 0;
	}//end if
	else if(request <= maxWater - water) {
		water += request;
		return request;
	}//end if
	else if(request > maxWater - water){
		request = maxWater - water;
		water += request;
		return request;
	}//end else
}//end deliverCleanWater

public function getWater() {
	return parseInt(water);
}

public function getAir() {
	return parseInt(air);
}

public function getPlant() {
	return parseInt(plant);
}

public function getHuman() {
	return parseInt(human);
}

function getMaxAir () {
	return parseInt(maxAir);
}

function getMaxWater () {
	return parseInt(maxWater);
}

function getMaxSpace () {
	return parseInt(maxSpace);
}

public function isLinkable() {
	return linkable;
}

public function emptyEnergyTank(){
	var tempDouble : double = energyTank;
	energyTank = 0;
	return tempDouble;
}

public function populate(){
	human += 50;
}









