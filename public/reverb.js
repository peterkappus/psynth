
var muted = false;
var reverbTime = 40;
var maxTime = 80;
var reverbs = [];
var recorder;
var red_color = "#c00";
var gray_color = "#999";
var timeSlider; // a slider for our reverbtime
var mic = null; //initially...

//var reverbs = [];

//press "M" to mute
//press ENTER to save

function setup() {
  createCanvas(window.innerWidth,window.innerHeight);
  timeSlider = createSlider(0, maxTime, reverbTime, 1)
  timeSlider.position(50, 50);
  timeSlider.style('width', '80%');
    
  startRecording();
  createVoice(reverbTime);
}

function touchStarted() {
  getAudioContext().resume()
}

function killAVerb() {
  //disconnect and then remove the oldest reverb on the stack.
  reverbs.shift().disconnect();
}

function setReverb() {
  mic.stop();
  mic = null;
  var reverbTime = timeSlider.value();
  debug("reverbtime: " + reverbTime)
  createVoice(reverbTime);

}


//each voice has it's own reverb (should prevent crunchy noises)
function createVoice(time){
  //alert(")

  background(red_color);

  console.log("ok");
  mic = new p5.AudioIn();
  mic.start();

  myVerb = new p5.Reverb();
  myVerb.process(mic,time,1);
  reverbs.push(myVerb);
  
  muted = false;

}

function startRecording() {
  //debug('start recording');
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

  //key "s" to "set" reverb and create a new voice (with new reverb)
  //should prevent clipping on old reverb object
  if(keyCode == 83) {
    setReverb();
  }


  //K = KillaVerb
  if(keyCode == 75) {
    killAVerb();
  }

  // Total reverbs
  if(keyCode == 84) {
    console.log(reverbs.length);
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
