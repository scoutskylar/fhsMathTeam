<?php
if (rand(0, 1) === 0) {
  // "virtual learning"
  $surveyURL = "https://forms.office.com/Pages/ResponsePage.aspx?id=PkZ4tvvZX0eBU43PqJYEfQVpZKlJmVtIg_l5TLcoJupUM1dDWFc0TlVHNEFHUDlVODBETzZCVlRVUS4u";
} else {
  // "the stress of virtual learning"
  $surveyURL = "https://forms.office.com/Pages/ResponsePage.aspx?id=PkZ4tvvZX0eBU43PqJYEfQVpZKlJmVtIg_l5TLcoJupUMEZOOVUzREEwSzNPVjRZMEtCUFNONU9MVC4u";
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="shortcut icon" type="image/ico" href="../../favicon-placeholder-v3.ico">
    <link rel="stylesheet" href="../../css/style.css">
    <link rel="stylesheet" href="../../css/fontawesome.css">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Phase II Survey - FHSMath</title>
</head>
<body>
    <header>
        <a href="" class="header-title"><span>FHS</span>&#8203;<span>Math</span></a>
    </header>

    <nav>
        <a href="../../">Home</a>
        <a href="../../attendance">Attendance</a>
        <a href="../../schedule">Schedule</a>
        <!-- <a href="../../events">Events</a> -->
        <a href="../../contact">Contact</a>
    </nav>

    <main>
        <h1 class="body-title">Phase II Survey</h1>
        <p>
            You should have been redirected. If you weren't, click
            <a href="<?php echo $surveyURL; ?>">here</a>.
        </p>
    </main>

    <footer>
        <p>
            &copy; 2019 Skylar Smith, Natania Dominianni, and Logan Kincanon.
        </p>
        <p>
            <a href="../../development">FAQ &amp; Development</a>&emsp;
            <a href="../../contact">Sponsor Contact</a>
        </p>
    </footer>
    
    <span id="bottom"></span>
    
    <!-- FIREBASE -->
    
    <!-- The core Firebase JS SDK is always required and must be listed first -->
    <script src="https://www.gstatic.com/firebasejs/7.2.3/firebase-app.js" onerror="console.log('Firebase core didn\'t load.')"></script>

    <!-- Add SDKs for Firebase products that you want to use
        https://firebase.google.com/docs/web/setup#available-libraries -->
    <script src="https://www.gstatic.com/firebasejs/7.2.3/firebase-analytics.js"></script>
    
    <script>
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
    </script>
</body>
</html>
