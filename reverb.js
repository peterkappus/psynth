
var muted = false;
var reverbTime = 40;
var maxTime = 80;
var myVerb;
var recorder;
var red_color = "#c00";
var gray_color = "#999";
var timeSlider; // a slider for our reverbtime

//var reverbs = [];

//press "M" to mute
//press ENTER to save

function setup() {
  createCanvas(window.innerWidth,window.innerHeight);
  timeSlider = createSlider(0, maxTime, reverbTime, 1)
  timeSlider.position(50, 50);
  timeSlider.style('width', '80%');
  reverby();
}


function reverby() {
  //alert(")

  mic = new p5.AudioIn();
  mic.start();

  myVerb = new p5.Reverb();
  myVerb.process(mic,reverbTime,1);

  startRecording();
}

function startRecording() {
  background(red_color);
  debug('start recording');
  soundFile = new p5.SoundFile();
  recorder = new p5.SoundRecorder();
  recorder.record(soundFile);
}

function debug(msg){
  console.log(msg);
}

function stopRecording() {
  recorder.stop();
  save(soundFile, 'abstraktor.wav');
}

function keyPressed() {
  //alert(keyCode);

  //"Enter"
  if(keyCode == 13){
    stopRecording();
  }

  //key "s" to "set" reverb
  //need a way to start a new reverb object...
  //okay, but how to remove them?
  if(keyCode == 83) {
    var reverbTime = timeSlider.value();
    debug("reverbtime: " + reverbTime)
    myVerb.set(reverbTime);
    /*newVerb = new p5.Reverb();
    newVerb.process(mic,reverbTime,1);
    reverbs.push(newVerb);
    */
  }

  //mute "m"
  if(keyCode == 77 ) {
    if(muted) {
      mic.start();
      background(red_color);
      debug("listening...");
    }else{
      mic.stop();
      background(gray_color);
      debug("muted");
    }
    muted = !muted;
  }
  //alert(keyCode);
}
