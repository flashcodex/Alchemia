// eSpeak and other code here are under the GNU GPL.
"use strict";
function generateSpeech(text, args) {
  var self = { text: text, args: args, ret: null };
  (function() {

  }).call(self);
  return self.ret;
}



onmessage = function(event) {
  postMessage(generateSpeech(event.data.text, event.data.args));
};
