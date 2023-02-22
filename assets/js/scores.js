var submitScore = document.querySelector("#submit");
var highScores = document.querySelector("#highscores");
var userInitialsEl = document.querySelector("#initials");
var clearScores = document.querySelector("#clear");

if (submitScore){
submitScore.addEventListener("click", function(){
        
    // In localstorage set key 'userInit' with value of initials from user
    localStorage.setItem("userInit",userInitialsEl.value);

    // Change page function
    changePage();
})};     

// Func to change html page to show highscores
var changePage = function () { 
    window.location.href = "highscores.html";
}


var getUserData = function (){

    if (score){
        // Get value from key 'userInit'
        var initials = localStorage.getItem("userInit");
        // Get initials from key 'lastScore'
        var score = localStorage.getItem("lastScore");
        var listItem = document.createElement("li");
        listItem.textContent = (initials + " - " + score);
        highScores.appendChild(listItem);
    }
    
    // Get value from key 'userInit'
    var initials = localStorage.getItem("userInit");
    // Get initials from key 'lastScore'
    var score = localStorage.getItem("lastScore");

    // If score isn't null (e.g doesn't take input)
    // Create list element
    var userList = document.createElement("li");
    // Set text content of initials
    userList.textContent = (initials + " - " + score);
    highScores.appendChild(userList);
    localStorage.setItem("userList", userList.value);


}
getUserData();

// Func to clear client data
var clearData = function (){
    // Clear local storage
    localStorage.clear();
    highScores.textContent = "";
}

// If click on clear scores - call clear localstorage func
clearScores.addEventListener("click", clearData)


