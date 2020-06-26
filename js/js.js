

let req = new XMLHttpRequest();
let term;
var news;
let country = "eg";
let category = "general";
let searchInp = document.getElementById("searchInp");
let searchBtn = document.getElementById("searchBtn");
let link;
var temp;
var links = document.getElementsByClassName("nav-link");
let countries = document.getElementById("countries");

link = "http://newsapi.org/v2/top-headlines?country="+country+"&category="+category+"&apiKey=7ad0212514724cb29a48d475b0f1ce71";
getData();


function getData()
{    
    req.open("GET",link);

    req.onreadystatechange = function()
    {
        if ((req.status == 200) && (req.readyState == 4))
        {
            news = JSON.parse(req.response);
            news = news.articles;
            displayNews();
        }
    }
    
    req.send();
}



function displayNews()
{
    temp = "";
    for(let i = 0 ; i < news.length ; i++)
    {
        temp += `<div class="col-md-3 my-1">
                    <div class="new p-2">
                        <img scr=`+news[i].urlToImage+` class="img-fluid"/>
                        <h5>`+news[i].title+`</h5>
                        <p class="text-muted">`+news[i].description+`</p>
                        <a href=`+news[i].url+`>Read more...</a>
                    </div>
                </div>`;
    }
    document.getElementById("rowNews").innerHTML = temp;
}

for(let i = 0 ; i < links.length ; i++)
{
    links[i].addEventListener("click",function(e){

        category = e.target.innerHTML;
        link = "http://newsapi.org/v2/top-headlines?country="+country+"&category="+category+"&apiKey=7ad0212514724cb29a48d475b0f1ce71";
        getData();
    })
}


searchInp.addEventListener("keyup",function(e){

    link = "http://newsapi.org/v2/everything?q="+this.value+"&from=2020-05-26&sortBy=publishedAt&apiKey=7ad0212514724cb29a48d475b0f1ce71";
    getData();
})

countries.addEventListener("change",function(e){

    country = this.value;
    link = "http://newsapi.org/v2/top-headlines?country="+country+"&category="+category+"&apiKey=7ad0212514724cb29a48d475b0f1ce71";
    getData();
})