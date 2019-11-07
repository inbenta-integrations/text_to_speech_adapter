/**
 *  Text to speech adapter using responsivevoice.org
 *
 *  Requires the ResponsiveVoice library from
 *  https://code.responsivevoice.org/responsivevoice.js
 *
 * @param {object} conf:
 *    - voice (string): Voice name from https://responsivevoice.org/text-to-speech-languages/
 *    - readSideWindowContent (boolean): If enabled also reads the sideWindow content
 *    - useMessagesQueue (boolean): If enabled, all incoming messages are stacked and played in order
 *                                  If disabled, stops playing the current message when a new one is received
 */
function textToSpeechAdapter(conf) {
  return function(chatbot) {
    let ttsMessagesQueue = [];
    let speaking = false;
    let finished = true;
    let playInterval;

    // Import ResponsiveVoice library
    importScript({ src: 'https://code.responsivevoice.org/1.5.14/responsivevoice.js' });

    // Play every displayed message
    chatbot.subscriptions.onDisplayChatbotMessage(function(messageData, next) {
      let ttsText = messageData.message;
      // Append the sideWindow content to the message text to be read
      if (conf.readSideWindowContent && messageData.sideWindowContent) {
        ttsText += messageData.sideWindowContent;
      }
      // Append message to the TTS queue
      addTextToQueue(ttsText);
      return next(messageData);
    });

    // Add message to queue and start playing
    function addTextToQueue(text) {
      if (typeof text === 'string' && text !== '') {
        ttsMessagesQueue.push(text);

        var t=setInterval(function(){
          if(finished){
              clearInterval(t);
              playMessagesQueue();
          }
        },300);
      }
    }

    // Handle the messages queue
    function playMessagesQueue() {
      if (window.responsiveVoice && !speaking){
        speaking = conf.useMessagesQueue;
        let nextMessage = ttsMessagesQueue.shift();
        if(nextMessage !== undefined){
            playText(nextMessage);
        }
      }
    }

    // Execute TTS library
    function playText(text) {
      let decodedText = decodeEntities(text);

      finished = false
      window.responsiveVoice.speak(decodedText, conf.voice, {
          onend: finishedPlayingMessage
      });
    }

    // Remove HTML entities and tags from a given text
    function decodeEntities(text) {
      let textArea = document.createElement('textarea');
      textArea.innerHTML = text;
      text = textArea.textContent || textArea.innerText;
      textArea = null;
      return text.replace(/<(?:.|\n)*?>/gm, '');
    }

    // Callback to continue playing the messages queue
    function finishedPlayingMessage() {
      speaking = false;

      if (ttsMessagesQueue.length > 0) {
        playMessagesQueue();
      }else{
        finished = true;
      }
    }
  }

  // Import script helper function
  function importScript(script, callback) {
    let dom = document.createElement('script');
    dom.type = 'text/javascript';
    if (callback) dom.onload = callback;
    if (script.src) dom.src = script.src;
    if (script.integrity) dom.integrity = script.integrity;
    if (script.crossorigin) dom.crossOrigin = script.crossorigin;
    document.getElementsByTagName('head')[0].appendChild(dom, document.currentScript);
  }
}
