var camera, orbitControls, scene, renderer;

init();
animate();

function init() 
{
	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera( 45, 
								window.innerWidth / window.innerHeight,
								0.1, 1000)  ;
	camera.position.x = -10;
	camera.position.y = 10;
	camera.position.z = 10;

	// create a render and set the size
	renderer = new THREE.WebGLRenderer();
	renderer.setClearColor( 0x00000000 );
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement );

	orbitControls = new THREE.OrbitControls( camera, renderer.domElement );
	orbitControls.autoRotate = true;
	orbitControls.enableZoom = true;

	//camera.lookAt(scene.position);
	var vertices = [];
	vertices.push(new THREE.Vector3(0.0, 0.0, 0.0)); //000
	vertices.push(new THREE.Vector3(0.0, 0.0, 1.0)); //001
	vertices.push(new THREE.Vector3(0.0, 1.0, 0.0)); //010
	vertices.push(new THREE.Vector3(0.0, 1.0, 1.0)); //011
	vertices.push(new THREE.Vector3(1.0, 0.0, 0.0)); //100
	vertices.push(new THREE.Vector3(1.0, 0.0, 1.0)); //101
	vertices.push(new THREE.Vector3(1.0, 1.0, 0.0)); //110
	vertices.push(new THREE.Vector3(1.0, 1.0, 1.0)); //111

    //orange = x-axis
    //blue = y-axis
    //green = z-axis
	var faces = [];
	addFace(faces, 0, 3, 2, "rgb(100%, 0%, 0%)");
	addFace(faces, 0, 1, 3, "rgb(90%, 0%, 0%)");

	addFace(faces, 0, 5, 1, "rgb(0%, 0%, 100%)");
	addFace(faces, 0, 4, 5, "rgb(0%, 0%, 90%)");

	addFace(faces, 0, 6, 4, "rgb(0%, 0%, 10%)");
	addFace(faces, 0, 2, 6, "rgb(0%, 0%, 20%)");

	addFace(faces, 1, 5, 7, "rgb(10%, 0%, 0%)");
	addFace(faces, 1, 7, 3, "rgb(20%, 0%, 0%)");
	
	addFace(faces, 3, 7, 6, "rgb(100%, 0%, 100%)");
	addFace(faces, 3, 6, 2, "rgb(90%, 0%, 90%)");

	addFace(faces, 4, 7, 5, "rgb(20%, 0%, 20%)");
	addFace(faces, 4, 6, 7, "rgb(10%, 0%, 10%)");

	cubeGeometry = new THREE.Geometry();
	cubeGeometry.vertices = vertices;
	cubeGeometry.faces = faces;

	var cubeMaterial = new THREE.MeshBasicMaterial (
		{wireframe: false,
		color: 0xff00ff,
		vertexColors: THREE.FaceColors});

	var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);	
	scene.add(cube);	
	var axes = new THREE.AxisHelper( 1.5 );
	scene.add ( axes );
}

function addFace(faces, a, b, c, colorCode)
{
    var face = new THREE.Face3(a, b, c);
    face.color = new THREE.Color(colorCode);
    faces.push(face);
}

function render() {
	renderer.render(scene, camera);
}

function onWindowResize() 
{
	
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}

function animate() 
{
    requestAnimationFrame( animate );

	// required if controls.enableDamping = true, 
	// or if controls.autoRotate = true
    orbitControls.update(); 
    //stats.update();
    render();
}
