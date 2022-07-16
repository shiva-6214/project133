status = "";
objects = [];
tvimg = "";
objectDetector = "";
r = 0;
g = 0;
b = 0;

function preload() {
    tvimg = loadImage('https://i.postimg.cc/qvkRCtFZ/photo-1619183744799-68f1fd8f1edb-ixlib-rb-1-2.jpg')
}

function setup() {
    canvas = createCanvas(480, 380);
    canvas.center();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("statusOfObject").innerHTML = "Status: Object Detecting";
    r = random(255);
    g = random(255);
    b = random(255);
}

function modelLoaded() {
    console.log("Model is Loaded");
    status = true;
    objectDetector.detect(tvimg, gotResult);
}

function gotResult(error, results) {
    if (error) {
        console.error(error);
    }

    else {
        console.log(results);
        objects = results;
    }
}


function draw() {

    image(tvimg, 0, 0, 480, 380);
    if (status != true) {
        if (status != "") {

            for (var i = 0; i < objects.length; i++) {
                document.getElementById("statusOfObject").innerHTML = "Status : Object Detected";
                document.getElementById("objectDetectedNumber").innerHTML = "Number Of Objects Detect: " + objects.length;

                fill(r, g, b);
                percent = floor(objects[i].confidence * 100);
                text(objects[i].label + " " + percent + "%", objects[i].x, objects[i].y);
                noFill();
                stroke(r, g, b);
                strokeWeight(1);
                rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            }
        }
    }
}  
   