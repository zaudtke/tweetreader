
let viewModel = {
    refreshUrl : '',
    tweets : []
}

const animations = ["bounceIn", "bounceInDown", "bounceInLeft", "bounceInRight", "bounceInUp", "fadeIn", "fadeInDown", "fadeInDownBig", "fadeInLeft", "fadeInLeftBig", "fadeInRight", "fadeInRightBig", "fadeInUp", "fadeInUpBig", "flip", "flipInX", "flipInY", "lightSpeedIn", "rotateIn", "rotateInDownLeft", "rotateInDownRight", "rotateInUpLeft", "rotateInUpRight", "slideInUp", "slideInDown", "slideInLeft", "slideInRight", "zoomIn", "zoomInDown", "zoomInLeft", "zoomInRight", "zoomInUp", "rollIn"];

function authenticate(){
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "/api/authenticate");
    xhr.onload = function(){
        getTweets('');
    };
    xhr.send();
}

function getTweets(){
    document.getElementById("getTweets").style="display:block";
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "/api/tweets" + viewModel.refreshUrl);
    xhr.onload = function(){
        var result = JSON.parse(xhr.responseText);
        
        viewModel.refreshUrl = result.refreshUrl;
        viewModel.tweets.push.apply(viewModel.tweets,result.tweets);
        document.getElementById("getTweets").style="display:none";
    };
    xhr.send();
}

function getTags(){
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "/api/tags");
    xhr.onload = function(){
        var result = JSON.parse(xhr.responseText);
        document.getElementById("tags").innerText = result;
    };
    xhr.send();
}

function bootstrapApp(){
    getTags();
    authenticate();
    window.setInterval(selectTweet,10000);
    window.setInterval(getTweets,120005);
}

function selectTweet(){

    let animation = animations[getRandomNumber(animations.length)];


    let tweetDiv = document.getElementById("tweet");


    tweetDiv.className = "";
    tweetDiv.classList.add(animation, "animated");
    

    let rnd = getRandomNumber(viewModel.tweets.length);
    let tweet = viewModel.tweets[rnd];
    document.getElementById("profileImage").src = tweet.profileImageUrl;
    document.getElementById("name").innerText = tweet.name;
    document.getElementById("screenName").innerText = tweet.screenName;
    document.getElementById("createdAt").innerText = (new Date(tweet.createdAt)).toLocaleDateString();
    document.getElementById("text").innerHTML = tweet.text;
    document.getElementById("attachment").src = tweet.imageUrl;
    
    
}

function getRandomNumber(upperBound) {
    var result = 0;
    result = Math.round((Math.random()) * upperBound);
    if (result === upperBound)
        result--;

    return result;
}



