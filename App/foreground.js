// The app receives external messages from the extension. The messages should contain the content of the file to write
chrome.runtime.onMessageExternal.addListener(
  function(message, sender, sendResponse) {
    document.querySelector("#output").innerHTML = "We have received info from the extension."
    chrome.fileSystem.chooseEntry({type: 'saveFile', suggestedName: message.fileName }, function(writableFileEntry) {
            writableFileEntry.createWriter(function(writer) {
              writer.onwriteend = function(e) {
                console.log('write complete');
                console.log(message.content)
              };
              writer.write(new Blob([message.content], {type: 'text/plain'}));
            });
        });
  });