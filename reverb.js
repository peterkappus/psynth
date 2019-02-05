
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
}

// One-liner to resume playback when user interacted with the page.
document.querySelector('body').addEventListener('click', function() {
  context.resume().then(() => {
    console.log('Playback resumed successfully');
  });
});

//each voice has it's own reverb (should prevent crunchy noises)
function createVoice(time){
  //alert(")

  console.log("ok");
  mic = new p5.AudioIn();
  mic.start();

  myVerb = new p5.Reverb();
  myVerb.process(mic,time,1);
}

function startRecording() {
  background(red_color);
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
    var reverbTime = timeSlider.value();
    debug("reverbtime: " + reverbTime)
    createVoice(reverbTime);
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
