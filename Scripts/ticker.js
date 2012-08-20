public var tickingScript : Component;
public var tickInterval : float ;
public var tickBool : boolean ;

private var lastTick : float ;

function Start () {

}//end Start

function Update () {
	if(tickBool) {
		if(Time.time >= lastTick + tickInterval){
			tickingScript.tick();
			lastTick += tickInterval;
		}//end if
	}//end if	
}//end Update

public function setTicker (tempBool : boolean) {
	tickBool = tempBool;
}//end setTicker