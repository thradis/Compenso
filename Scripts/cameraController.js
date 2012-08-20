@script RequireComponent(Rigidbody)
@script RequireComponent(Camera)

public var scrollSpeed = .5;
//public var dragSpeed = 10;
public var coastRatio = 1.5;

public var ZoomSpeed : int = 5;
public var ZoomMin : int = 7;
public var ZoomMax : int = 20;

static var closestViewable : Transform = null;

var scanFreq : float = .2;
var viewDistance : float = 15;
var lerpDist : float = 3;

function Start() {
	InvokeRepeating("scanForClosestViewable", 0, scanFreq);
}

function FixedUpdate () {

	var mPosX = Input.mousePosition.x;
	var mPosY = Input.mousePosition.y;

	// Do camera movement by mouse position
	if (mPosX < 0)
		rigidbody.velocity.x = -scrollSpeed * camera.orthographicSize;
	else if (mPosX >= Screen.width)
		rigidbody.velocity.x = scrollSpeed * camera.orthographicSize;
	else
		rigidbody.velocity.x /= coastRatio;
	if (mPosY < 0)
		rigidbody.velocity.y = -scrollSpeed * camera.orthographicSize;
	else if (mPosY >= Screen.height) 
		rigidbody.velocity.y = scrollSpeed * camera.orthographicSize;
	else
		rigidbody.velocity.y /= coastRatio;
		
	if(closestViewable != null) {
		var dist = Vector2.Distance(transform.position, closestViewable.position);
		if(dist > viewDistance * camera.orthographicSize) {
			
			transform.position = Vector3.MoveTowards(transform.position, Vector3(closestViewable.position.x, closestViewable.position.y
			, -1000), dist - (viewDistance * camera.orthographicSize));
		}
		else if(rigidbody.velocity.magnitude < .01)
			rigidbody.velocity = Vector3.zero;
	}
		 
	// Zoom
	
    var zoomDelta : int = Input.GetAxis("Mouse ScrollWheel") * Time.deltaTime;
    if (zoomDelta!=0)
    {
    	if(Camera.main.orthographicSize - ZoomSpeed * zoomDelta > ZoomMin && Camera.main.orthographicSize - ZoomSpeed * zoomDelta < ZoomMax ){
    		Camera.main.orthographicSize -= ZoomSpeed * zoomDelta;
    		Camera.main.ResetWorldToCameraMatrix();
    	}
    }
    

/*

	// Do camera movement by keyboard
	transform.Translate(Vector3(Input.GetAxis("EditorHorizontal") * scrollSpeed * Time.deltaTime,
                              Input.GetAxis("EditorVertical") * scrollSpeed * Time.deltaTime, 0) );

	// Do camera movement by holding down option                 or middle mouse button and then moving mouse
	if ( (Input.GetKey("left alt") || Input.GetKey("right alt")) || Input.GetMouseButton(2) ) {
    transform.Translate(-Vector3(Input.GetAxis("Mouse X")*dragSpeed, Input.GetAxis("Mouse Y")*dragSpeed, 0) );
}
*/
}//end FixedUpdate

function scanForClosestViewable() {
	closestViewable = getNearestNode();
}

function getNearestNode() : Transform {
	var shortestDistance = Mathf.Infinity;
	var nodes = GameObject.FindGameObjectsWithTag("clickable");
	var nearestNode : Transform = null;
	for (var node : GameObject in nodes) {
		var nodePos = node.transform.position;
		var distance = (nodePos - Vector3(transform.position.x, transform.position.y, 
			0)).sqrMagnitude;
		if(distance < shortestDistance){
			nearestNode = node.transform;
			shortestDistance = distance;
		}
	}
	return nearestNode;
}//end getNearestNode