message('Initializing...');

function setEventType(calendar) {
  try {
    if (!calendar) return null;
    const now = new Date(new Date().toDateString()).getTime() / 1000;
    let eventTypes = [];
    //data rows
    for (var event_i in calendar) {
      try {
        const event = calendar[event_i];
        if (now >= event.epoch && now - event.epoch < 86400 && event.type && eventTypes.indexOf(event.type) < 0) {
          eventTypes.push(event.type);
        }
      } catch (err) {
        continue;
      }
    }
    if (eventTypes.length > 0) {
      switch (eventTypes.length) {
        case 0:
          document.getElementById('attendance-event-type').innerText = 'event';
        case 1:
          document.getElementById('attendance-event-type').innerText = eventTypes[0];
          break;
        case 2:
          document.getElementById('attendance-event-type').innerText = eventTypes[0] + ' or ' + eventTypes[1];
          break;
        default:
          eventTypes[eventTypes.length - 1] = 'or ' + eventTypes[eventTypes.length - 1];
          document.getElementById('attendance-event-type').innerText = eventTypes.join(', ');
          break;
      }
      document.getElementById('attendance-event-specifier').setAttribute('data-show', 'true');
    }
  } catch (err) { }
}

{
  let xhr = new XMLHttpRequest();
  xhr.onload = function() {
    setEventType(JSON.parse(this.responseText));
  };
  xhr.open('GET', '../js/events.json');
  xhr.send();
}

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
function message(text, box) {
  box = box || 'info';
  let errorBox = document.getElementById('error-box');
  let confirmedBox = document.getElementById('confirmed-box');
  let infoBox = document.getElementById('info-box');
  /* REMOVED:
  let hr = document.getElementById('attendance-bottom-hr');
  */
  message = (function(text, box) {
    box = box || 'info';
    errorBox.style.display = 'none';
    confirmedBox.style.display = 'none';
    infoBox.style.display = 'none';
    if (text === undefined) {
      let attendanceFormCheck = document.getElementById('attendance-form');
      /* if (!attendanceFormCheck || attendanceFormCheck.style.display == 'none') {
        hr.style.display = 'none';
      } else {
        hr.style.display = '';
      } */
      return;
    }/*  else {
      hr.style.display = '';
    } */
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
  attendanceForm.addEventListener('submit', function(e) {
    attendanceForm.style.display = 'none';
    e.preventDefault();
    // attendanceSignIn(document.getElementById('attendance-name').value);
    attendanceSignIn();
    attendanceForm.parentElement.removeChild(attendanceForm);
    message('Sending...');
    // console.info('Database sign-in has been sent!');
  })
}

var user;
firebase.auth().onAuthStateChanged(function(userFromAuth) {
  if (userFromAuth) {
    user = userFromAuth;
    var name = user.displayName;
    
    // document.getElementById('attendance-name').value = user.displayName;
    document.getElementById('attendance-name').innerText = user.displayName;
    attendanceForm.style.display = '';
    message();
  } else {
    message();
    document.getElementById('sign-in-wrapper').style.display = '';
  }
});

message('Loading...');

// firebase.auth().signInAnonymously().catch(function(error) {
//   console.log('Authentication failed. Error:', error);
//   message('Identification failed.', 'error');
//   attendanceForm.parentElement.removeChild(attendanceForm);
// });

function signInWithMicrosoft() {
  if (firebase.auth().currentUser) {
    // window.location.reload();
  } else {
    var provider = new firebase.auth.OAuthProvider('microsoft.com');
    provider.setCustomParameters({
      prompt: 'select_account'
    })
    firebase.auth().signInWithRedirect(provider);
  }
}

// firebase.auth().getRedirectResult().then(function(result) {
//   user = result.user;
//   if (!user) {
//     message('To submit attendance, you must log in with your school accout.');
//     document.getElementById('sign-in-wrapper').style.display = '';
//   }
//   console.log(result);
// }).catch(function(error) {
//   console.log('Error in getRedirectResult:', error);
// });

function signOut() {
  firebase.auth().signOut().then(function() {
    user = null;
    // location.reload();
    message('You have been logged out successfully!', 'confirm');
  }).catch(function(error) {
    console.log('An error during signout. Error:', error);
    message('An error occurred while trying to log out.', 'error');
  });
}

var timeAdjust = null, serverDate;
function attendanceSignIn() {
  if (timeAdjust === null) {
    firebase.database().ref('/.info/serverTimeOffset')
    .once('value')
    .then(function stv(data) {
      timeAdjust = data.val();
      pushAttendance();
    }, function (error) {
      console.log('Time sync failed. Error:', error);
      return error;
    });
  } else {
    pushAttendance();
  }
}

function pushAttendance() {
  serverDate = new Date(Date.now() + timeAdjust);
  let dateString = 
    '(' + serverDate.getFullYear().toString() + '-' + // (YYYY-
    ('0' + serverDate.getMonth()).slice(-2) + '-' +   // MM-
    ('0' + serverDate.getDate()).slice(-2) + ') ' +   // DD)
    serverDate.toDateString(); // e.g. Fri Nov 08 2019
  firebase.database().ref('attendance/' + dateString + '/' + user.displayName).push(true)
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
    // console.log('Database sign-in succeeded.');
    message('Attendance was submitted successfully!', 'confirm');
  }, function(error) {
    console.log('Database push failed. Error:\n', error);
    message('You are already marked as present (or there was a weird error).');
  });
}
