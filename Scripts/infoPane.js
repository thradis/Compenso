#pragma strict
public var numSprite : tk2dTextMesh;
public var denomSprite : tk2dTextMesh;

function Start () {

}

function Update () {

}

public function setNum(temp : int) {
	numSprite.text = temp.ToString();
	numSprite.Commit();
}

public function setDenom (temp : int) {
	denomSprite.text = temp.ToString();
	denomSprite.Commit();
}