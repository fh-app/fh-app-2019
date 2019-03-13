// Dom7
var $$ = Dom7;

// Framework7 App main instance
var app = new Framework7({
  root: '#app', // App root element
  id: 'at.fhburgenland.app', // App bundle ID
  name: 'FH Burgenland App', // App name
  theme: 'auto', // Automatic theme detection
  routes: routes,
  dialog: {
    // set default title for all dialog shortcuts
    title: 'FH Burgenland App',
    // change default "OK" button text
    buttonCancel: 'Abbrechen',
    usernamePlaceholder: 'E-Mail',
    passwordPlaceholder: 'Passwort',
    preloaderTitle: 'Lädt ...',
    progressTitle: 'Lädt ...'
  }
});

////////// Globally accessable Data
var appData = {
  loginPath: 'https://fh-app-backend.loc/fhapp-ajax-login-test.php'
};
// Init/Create views
var mainView = app.views.create('#viewMain', {
  url: '/'
});



//////////// HELPERS
function fhAppNotify(title, msg, navigateTo) {
  var notification = app.notification.create({
    title: title,
    text: msg,
    closeButton: true,
    closeOnClick: true,
    on: {
      closed: function () {
        if (!navigateTo) return;
        mainView.router.navigate(navigateTo);
      }
    }
  });
  notification.open();
}

function testJSON(text){
  if (typeof text!=="string"){
      return false;
  }
  try{
      JSON.parse(text);
      return true;
  }
  catch (error){
      return false;
  }
}

function fhAppLoginHelper() {

}

