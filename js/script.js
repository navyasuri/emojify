let video;
let poseNet; // This would be the machine learning model
let poses;
let emojis = [];
let neutral;
// import FaceExpressionNet from 'lib/faceapi'
// let net = FaceExpressionNet();
// console.log(net);


function setup() {
    createCanvas(640, 480);
    background(255);
    video = createCapture(VIDEO);
    video.hide() // hides the html element

    for (let i = 0; i < 7; i++) {
        emojis.push(loadImage('img/' + i.toString() + '.png'));
    }

    // poseNet = ml5.poseNet(video, console.log("Model Loaded"));
    // poseNet.on('pose', (results) => {
    //     poses = results; // store the trained data into poses 
    // });

    faceapi.load
    faceapi.loadSsdMobilenetv1Model('/models')
    faceapi.loadFaceExpressionModel('/models');
    // console.log(faceapi.nets)

}

function draw() {
    // background(0);
    // image(img, x, y, w, h)
    // image(video, 0, 0); // Video gives an image every frame, display at given coords
    // console.log(video.elt)

    faceapi.detectAllFaces(video.elt).withFaceExpressions()
        .then((allFaces) => {

            background(255);
            image(video, 640, 0, -640, 480)
            for (var detectionsWithExpressions of allFaces) {
                console.log(allFaces);

                let bestExpr = "";
                let max = 0;


                if (detectionsWithExpressions == undefined) {
                    console.log("No face detected");
                    // bestExpr = "neutral";
                    // max = 1;
                    // background(255);
                    // image(video, 0, 0);
                }
                else {
                    let face = detectionsWithExpressions.detection;
                    let exprs = detectionsWithExpressions.expressions;
                    for (let i = 0; i < exprs.length; i++) {
                        if (exprs[i].probability > max) {
                            max = exprs[i].probability;
                            bestExpr = exprs[i].expression;
                            bestImg = emojis[i];
                        }
                    }

                    let small = Math.max(face.box.width, face.box.height);

                    image(bestImg, face.box.x, face.box.y, small, small);
                    // console.log(neutral, face.box.x, face.box.y, small, small);
                    // co
                }
            }
        });
    }