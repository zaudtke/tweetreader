let initial = {
    profileImageUrl : "https://pbs.twimg.com/profile_images/913591850576969730/lQx8iaMm_normal.jpg",
    name : "THAT Conference",
    screenName : "ThatConference",
    createdAt : "Tue Jun 19 11:48:00 +0000 2018",
    text : "We’re geeking out over this year’s #THATConference keynotes. @jessitron @housecor @reverentgeek and @jlengstorf are rocking the big stage this year. So much awesome will be shared.",
    imageUrl : "https://pbs.twimg.com/media/DgELVFPUcAAO-ya.jpg"
}


let viewModel = {
    refreshUrl : '',
    tweets : [initial]
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
    
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "/api/tweets" + viewModel.refreshUrl);
    xhr.onload = function(){
        var result = JSON.parse(xhr.responseText);
        viewModel.refreshUrl = result.refreshUrl;
        viewModel.tweets.push.apply(viewModel.tweets,result.tweets);
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
    selectTweet();
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



