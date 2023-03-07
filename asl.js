
gesture = ""


Webcam.set({
    width:350,
    height:300,
    image_format : 'png',
    png_quality:90
    });
    
    camera = document.getElementById("camera");
    
    Webcam.attach( '#camera' );
    
    function take_snapshot()
    {
        Webcam.snap(function(data_uri) {
            document.getElementById("result").innerHTML = document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'"/>';
        });
    }
    
    console.log('ml5 version', ml5.version);
    
    classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/eexiDUohU/model.json', modelLoaded);
    
    function modelLoaded()
    {
        console.log('Model loaded!')
    }
    function speak()
    {
        var synth = window.speechSynthesis;
        speak_data = "The ASL Gesture is: " + gesture;
        var utterThis = new SpeechSynthesisUtterance(speak_data);
        synth.speak(utterThis);
    }

    function check()
    {
        img = document.getElementById('captured_image');
        classifier.classify(img, gotResult);
    }
    function gotResult(error, results) {
        if (error) {
            console.error(error);
        } else {
            console.log(results);
            document.getElementById("result_gesture_name").innerHTML = results[0].label;
            gesture = results[0].label;
            speak();
            if(results[0].label == "L")
            {
                document.getElementById("update_gesture").innerHTML = "&#x24C1;";
            }
            if(results[0].label == "4")
            {
                document.getElementById("update_gesture").innerHTML = "&#x2463;";
            }
            if(results[0].label == "R")
            {
                document.getElementById("update_gesture").innerHTML = "&#x24C7;";
            }
            if(results[0].label == "Good Idea")
            {
                document.getElementById("update_gesture").innerHTML = "&#x1F44C;";
            }
            if(results[0].label == "Best")
            {
                document.getElementById("update_gesture").innerHTML = "&#x1F44D;";
            }
            if(results[0].label == "Please")
            {
                document.getElementById("update_gesture").innerHTML = "&#x270B;";
            }
            if(results[0].label == "3")
            {
                document.getElementById("update_gesture").innerHTML = "&#x2462;";
            }
        }
    }