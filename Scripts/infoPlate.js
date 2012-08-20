#pragma strict
public var humanPaneScript : infoPane;
public var plantPaneScript : infoPane;
public var waterPaneScript : infoPane;
public var airPaneScript : infoPane;
public var nodeScript : node = null;
private var lastAirNum : int;
private var lastWaterNum : int;
private var lastPlantNum : int;
private var lastHumanNum : int;

function Start () {
}

function Update () {

	if(nodeScript != null){
		var tempAir : int = nodeScript.getAir();
		var tempWater : int = nodeScript.getWater();
		var tempPlant : int = nodeScript.getPlant();
		var tempHuman : int = nodeScript.getHuman();

		if(tempAir != lastAirNum){
			airPaneScript.setNum(tempAir);
			lastAirNum = tempAir;
		}
		if(tempWater != lastWaterNum){
			waterPaneScript.setNum(tempWater);
			lastWaterNum = tempWater;
		}
		if(tempPlant != lastPlantNum){
			plantPaneScript.setNum(tempPlant);
			lastPlantNum = tempPlant;
		}
		if(tempHuman != lastHumanNum){
			humanPaneScript.setNum(tempHuman);
			lastHumanNum = tempHuman;
		}
	}
}

public function setNode (tempScript : node){
	nodeScript = tempScript;
	airPaneScript.setNum(nodeScript.getAir());
	airPaneScript.setDenom(nodeScript.getMaxAir());
	waterPaneScript.setNum(nodeScript.getWater());
	waterPaneScript.setDenom(nodeScript.getMaxWater());
	plantPaneScript.setNum(nodeScript.getPlant());
	plantPaneScript.setDenom(nodeScript.getMaxSpace());
	humanPaneScript.setNum(nodeScript.getHuman());
	humanPaneScript.setDenom(nodeScript.getMaxSpace());
}