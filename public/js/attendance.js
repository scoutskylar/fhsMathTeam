message('Initializing...');

var firebaseConfig = {
  apiKey: "AIzaSyA_9ZR6kJBOvdipEswlp0JC-wzw5slo9HI",
  authDomain: "fhsmath.firebaseapp.com",
  databaseURL: "https://fhsmath.firebaseio.com",
  projectId: "fhsmath",
  storageBucket: "fhsmath.appspot.com",
  messagingSenderId: "800574817607",
  appId: "1:800574817607:web:b0a9b9664ef9e9a13df862",
  measurementId: "G-02NY8SGCTJ"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();


// function that displays a message 
function message(text, box = 'info') {
  let errorBox = document.getElementById('error-box');
  let confirmedBox = document.getElementById('confirmed-box');
  let infoBox = document.getElementById('info-box');
  message = (function(text, box = 'info') {
    errorBox.style.display = 'none';
    confirmedBox.style.display = 'none';
    infoBox.style.display = 'none';
    if (text === undefined) {
      return;
    }
    if (box == 'error') {
      errorBox.innerHTML = text;
      errorBox.style.display = '';
    } else if (box == 'confirm') {
      confirmedBox.innerHTML = text;
      confirmedBox.style.display = '';
    } else { // info
      infoBox.innerHTML = text;
      infoBox.style.display = '';
    }
  })
  message(text, box);
}

const attendanceForm = document.getElementById('attendance-form');

if (attendanceForm) {
  attendanceForm.addEventListener('submit', e => {
    attendanceForm.style.display = 'none';
    e.preventDefault();
    // attendanceSignIn(document.getElementById('attendance-name').value);
    attendanceSignIn();
    attendanceForm.parentElement.removeChild(attendanceForm);
    message('Sending...');
    // console.info('Firebase Database sign-in has been sent!');
  })
}

var user;
firebase.auth().onAuthStateChanged(function(userFromAuth) {
  if (userFromAuth) {
    user = userFromAuth;
    document.getElementById('attendance-name').value = user.displayName;
    attendanceForm.style.display = '';
    message();
  } else {
    message();
    document.getElementById('sign-in-wrapper').style.display = '';
  }
});

message('Loading...');

// firebase.auth().signInAnonymously().catch(function(error) {
//   console.log('Firebase authentication failed. Error:', error);
//   message('Identification failed.', 'error');
//   attendanceForm.parentElement.removeChild(attendanceForm);
// });

// Initialize the FirebaseUI Widget using Firebase.
// var ui = new firebaseui.auth.AuthUI(firebase.auth());
// ui.start('#firebaseui-auth-container', {
//   signInOptions: [
//     firebase.auth.EmailAuthProvider.PROVIDER_ID
//   ],
//   // Other config options...
// });

function signInWithMicrosoft() {
  if (firebase.auth().currentUser) {
    // window.location.reload();
  } else {
    var provider = new firebase.auth.OAuthProvider('microsoft.com');
    firebase.auth().signInWithRedirect(provider);
  }
}

// firebase.auth().getRedirectResult().then(function(result) {
//   user = result.user;
//   if (!user) {
//     message('To submit attendance, you must connect your school accout.');
//     document.getElementById('sign-in-wrapper').style.display = '';
//   }
//   console.log(result);
// }).catch(function(error) {
//   console.log('Error in getRedirectResult:', error);
// });

function signOut() {
  firebase.auth().signOut().then(function() {
    user = null;
    location.reload();
    // console.info('The account connection has been reset.');
    // message('The account connection has been reset successfully!', 'confirm');
  }).catch(function(error) {
    console.log('An error during signout. Error:', error);
    message('An error occurred while trying to reset the account connection. ', 'error');
  });
}

function attendanceSignIn() {
  
  firebase.database().ref('attendance/' + new Date().toDateString() + '/' + user.displayName).push(true)
  // .set(
  //   {
  //     // "date": (d => 
  //     //   (d.toGMTString().slice(0, d.toGMTString().indexOf(','))) + ', ' +
  //     //   (d.getMonth() + 1) + '/' +
  //     //   d.getDate() + '/' +
  //     //   d.getFullYear() % 100
  //     // )(new Date()),
  //     // "date": new Date().toDateString(),
  //     // "timestamp": firebase.database.ServerValue.TIMESTAMP
  //   }
  // )
  .then(function() {
    // console.log('Firebase Database sign-in succeeded.');
    message('Attendance was submitted successfully!', 'confirm');
  }, function(error) {
    console.log('Firebase Database push failed. Error:', error);
    message('You are already marked as present.');
  });
}
