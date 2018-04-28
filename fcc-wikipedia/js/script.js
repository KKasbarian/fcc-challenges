/* General Const and variables */
var api_link = 'https://en.wikipedia.org/w/api.php?action=opensearch&format=json&formatversion=2&limit=10&generator=prefixsearch&&wbptterms=description&origin=*&search=';
var input = document.getElementById("search-field");
var submit_btn = document.getElementById("submit-btn");
var search_res = document.getElementById("search-results");
var search_answer = document.getElementById("res-search-info");
var search_res_count = document.getElementById("res-num");

/* Listen to a click from the Enter key */
input.addEventListener("keydown", function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        submit_btn.click();
    }
});

/* Show Live results on each key press */
/* input.onkeypress = function() {
    return fetchWikiResult();
} */

/* Get Results from WikiPedia */
function fetchWikiResult() {
    search_res.innerHTML = "";
    var xmlRequest = new XMLHttpRequest();
    xmlRequest.open("GET", api_link+input.value);
    xmlRequest.onload = function() {
        if (xmlRequest.readyState == 4 && xmlRequest.status == 200) {
            var wikiData = JSON.parse(xmlRequest.responseText);
            if (input.value == "") {
                search_res_count.innerHTML = 'No Results.';
                search_answer.innerHTML = 'Search box is empty. Type some keyword and search again.';
            } else {
                search_res_count.innerHTML = 'About \'' + wikiData[1].length + '\' Results';
                search_answer.innerHTML = 'Searched: ' +  input.value;
            }
            appendWikiResults(wikiData);
        } else {
            alert("No network errors, but an error from the server was accured. Try again in few minutes!");
        }
    }; // END xmlRequest onLoad function
    xmlRequest.onerror = function() {
        alert("Connection or network error. Try again later!");
    }; // END xmlRequest onError function
    xmlRequest.send();
}

/* Append information into Cards */
function appendWikiResults(data) {
    for (var i = 0; i < data[1].length; i++) {
        document.getElementById("search-results").innerHTML +=
                "<a class='animated slideInUp' href='" + data[3][i] + "' target='_blank'><div>" +
                "<h1 class='res-title'>" + data[1][i] + "</h1>" +
                "<h2 class='res-link'>" + data[3][i] + "</h2>" +
                "<p class='res-desc'>" + data[2][i] +  "</p></div></a>";
    }
}

/* Input Autocomplete Suggestions */

new autoComplete({
    selector: '#search-field',
    minChars: 2,
    source: function(term, suggest){
        term = term.toLowerCase();
        var choices = ['HTML', 'CSS', 'JavaScript', 'PHP', 'WordPress', 'Bootstrap', 'SASS', 'SCSS', 'Git', 'GitHub', 'Front-End Web Development', 'Back-End Web Development', 'Full-Stack Web Development', 'Web Developer', 'Web Development', 'Programming', 'Programmer', 'Windows', 'Linux', 'Macintosh', 'Android', 'iOS', 'Aliens', 'Lol'];
        var matches = [];
        for (i=0; i<choices.length; i++)
            if (~choices[i].toLowerCase().indexOf(term)) matches.push(choices[i]);
        suggest(matches);
    }
});