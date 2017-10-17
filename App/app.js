console.log("App is executing");

// The app was launched, open a window to run window.html, which contains the foreground script
chrome.app.runtime.onLaunched.addListener(function() {
  chrome.app.window.create('window.html', {
    'outerBounds': {
      'width': 400,
      'height': 500
    }
  });
});


