//Global Variblies
//Inputs variblies
const realSearch = document.querySelector("#getMovies");
const search = document.querySelector("#search");
const nameInput = document.querySelector("#name");
const email = document.querySelector("#email");
const telPhone = document.querySelector("#tel");
const password = document.querySelector("#password");
const age = document.querySelector("#age");
const rePassword = document.querySelector("#rePassword");
const submitBtn = document.querySelector("#submitBtn");
//warrings
const nameWarring = document.querySelector("#name-warring");
const emailWarring = document.querySelector("#email-warring");
const ageWarring = document.querySelector("#age-warring");
const telWarring = document.querySelector("#tel-warring");
const passwordWarring = document.querySelector("#pass-warring");
const rePassWarring = document.querySelector("#repass-warring");
//RegEx 
const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const nameRegex = /^[A-Z][-a-zA-Z]+$/;
const passRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/; //8 chars at least 1 char & 1 num
const telRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
const ageRegex = /^\S[0-9]{0,3}$/;
//API Variblies
let apiKey = `?api_key=eba8b9a7199efdcb0ca1f96879b83c44&fbclid=IwAR329J3L4o5HCBdmnRtb10khNGNAOGU2pIbRWIo4PNniuCHsK-cMpvZhSfc`;
let trendingUrl = `https://api.themoviedb.org/3/trending/all/day`;
let popularUrl = `https://api.themoviedb.org/3/movie/popular`;
let topRatedUrl = `https://api.themoviedb.org/3/movie/top_rated`;
let nowPlayingUrl = `https://api.themoviedb.org/3/movie/now_playing`;
let upComingUrl = `https://api.themoviedb.org/3/movie/upcoming`;
let searchUrl = `https://api.themoviedb.org/3/search/movie`;

let moviesData = [];

let widthNavBar = $(".navBar").outerWidth();
//Program Events

getData(nowPlayingUrl);

//Header Events
$("#open").click(function(){
    $("header").animate({left:`0px`},1000);
    $("#open").addClass("d-none").removeClass("d-block");
    $("#close").removeClass("d-none").addClass("d-block");
    console.log(widthNavBar);
});
$("#close").click(function(){
    $("header").animate({left:`-${widthNavBar}px`},1000);
    $("#open").removeClass("d-none").addClass("d-block");
    $("#close").addClass("d-none").removeClass("d-block");
});
//Nav Bar Events
document.querySelector("#popular").addEventListener("click", function(e){
    e.preventDefault();
    getData(popularUrl);
});
document.querySelector("#now-playing").addEventListener("click", function(e){
    e.preventDefault();
    getData(nowPlayingUrl);
});
document.querySelector("#top-rate").addEventListener("click", function(e){
    e.preventDefault();
    getData(topRatedUrl);
});
document.querySelector("#trending").addEventListener("click", function(e){
    e.preventDefault();
    getData(trendingUrl);
});
document.querySelector("#up-coming").addEventListener("click", function(e){
    e.preventDefault();
    getData(upComingUrl);
});
//Validation Events
nameInput.addEventListener("keyup", function(){
    let nameTxt = nameInput.value;
    if(nameRegex.test(nameTxt)){
        nameWarring.classList.add("d-none");
        nameWarring.classList.remove("d-block");
        console.log("true");
    }else{
        nameWarring.classList.remove("d-none");
        nameWarring.classList.add("d-block");
        console.log("false");
    }
});
email.addEventListener("keyup", function(){
    let emailTxt = email.value;
    if(emailRegex.test(emailTxt)){
        emailWarring.classList.add("d-none");
        emailWarring.classList.remove("d-block");
        console.log("true");
    }else{
        emailWarring.classList.remove("d-none");
        emailWarring.classList.add("d-block");
        console.log("false");
    }
});
telPhone.addEventListener("keyup", function(){
    let telTxt = telPhone.value;
    if(telRegex.test(telTxt)){
        telWarring.classList.add("d-none");
        telWarring.classList.remove("d-block");
        console.log("true");
    }else{
        telWarring.classList.remove("d-none");
        telWarring.classList.add("d-block");
        console.log("false");
    }
});
age.addEventListener("keyup", function(){
    let ageTxt = age.value;
    if(ageRegex.test(ageTxt)){
        ageWarring.classList.add("d-none");
        ageWarring.classList.remove("d-block");
        console.log("true");
    }else{
        ageWarring.classList.remove("d-none");
        ageWarring.classList.add("d-block");
        console.log("false");
    }
});
password.addEventListener("keyup", function(){
    let passTxt = password.value;
    if(passRegex.test(passTxt)){
        passwordWarring.classList.add("d-none");
        passwordWarring.classList.remove("d-block");
        console.log("true");
    }else{
        passwordWarring.classList.remove("d-none");
        passwordWarring.classList.add("d-block");
        console.log("false");
    }
});
//Btn Events
submitBtn.addEventListener("click", function(){
    if(isEmpty()){
        submitBtn.disabled = "true";
    }else{
        submitBtn.removeAttribute("disabled");
    }
});
//Search Event 
realSearch.addEventListener('keyup',function(){
    let searchTxt = realSearch.value;
    if(searchTxt !== ""){
        getData(searchUrl,"&query="+searchTxt);
    }else{
        getData(nowPlayingUrl);
    }
});
//Program Functions
//get Data From Api
async function getData(moviesUrl, searchQury = null){
    let response = await fetch(`${moviesUrl}${apiKey}${searchQury}`,{
        method: "GET",
    });
    let dataResponse = await response.json();
    moviesData = dataResponse.results;
    console.log(moviesData);
    displayData();
}
function displayData(){
    let movieItem = ``;
    for(let i = 0; i < moviesData.length; i++){
        movieItem += `
        <div class="col-lg-4 col-md-6 my-3">
            <div class="movie-card h-100 w-100">
                <img src="https://image.tmdb.org/t/p/w500${moviesData[i].poster_path}" alt="movie-pic" class="w-100 rounded">
                <div class="overlay text-black text-center center">
                    <div class="info">
                    <h6 class="movieName fw-bold p-0">${moviesData[i].original_title}</h6>
                    <p class="description p-0">
                    ${moviesData[i].overview}
                    </p>
                    <p class="rate p-0">rate <span id="rate">${moviesData[i].vote_average}</span></p>
                    <span class="date">${moviesData[i].release_date}</span> 
                    </div>
                </div>
            </div>
        </div>
        `;
    }
    console.log(movieItem);
    document.querySelector("#movieList").innerHTML = movieItem;
}
function isEmpty(){
    if(nameInput.value == "" && email.value == "" && password.value == "" && rePassword.value == "" && telPhone.value == "" && age.value == ""){
        return true;
    }else{
        return false;
    }
}