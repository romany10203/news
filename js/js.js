

let req = new XMLHttpRequest();
let news;
let country = "eg";
let category = "general";
let searchInp = document.getElementById("searchInp");
let link;
let newsTemp;
let countriesTemp = "";
let countryArr = [
    "ae","ar","at","au","be","bg","br","ca", "ch",
    "cn","cz","de","eg","fr","gb","gr", "hk","hu",
    "id","il","in","it","jp","id", "kr","lt","lv",
    "ma","mx","my","ng","nl", "no","nz","ph","pt",
    "ro","ru","rs","sa", "se","sg","si","sk","th",
    "tw","sa","us","us","ve","za"
];

let links = document.getElementsByClassName("nav-link");
let countries = document.getElementById("countries");

link = `https://cors-anywhere.herokuapp.com/newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=7ad0212514724cb29a48d475b0f1ce71`;
getData();


for(let i = 0 ; i < countryArr.length ; i++)
{
    if(countryArr[i] == "eg")
        countriesTemp += `<option selected value="${countryArr[i]}">${countryArr[i]}</option>`;
    countriesTemp += `<option value="${countryArr[i]}">${countryArr[i]}</option>`;
}
countries.innerHTML = countriesTemp;


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
    newsTemp = "";
    for(let i = 0 ; i < news.length ; i++)
    {
        newsTemp += `<div class="col-md-3 my-3">
                    <div class="new p-1">
                        <img src=${news[i].urlToImage} class="img-fluid"/>
                        <h5 class="my-2">${news[i].title}</h5>
                        <p class="text-muted">${news[i].description}</p>
                        <a class="p-1 bg-dark text-white" href=${news[i].url} _blanc>Read more...</a>
                    </div>
                </div>`;
    }
    document.getElementById("rowNews").innerHTML = newsTemp;
}

for(let i = 0 ; i < links.length ; i++)
{
    links[i].addEventListener("click",function(e){

        category = e.target.innerHTML;
        link = `https://cors-anywhere.herokuapp.com/newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=7ad0212514724cb29a48d475b0f1ce71`;
        getData();
    })
}


searchInp.addEventListener("keyup",function(e){

    link = `https://cors-anywhere.herokuapp.com/newsapi.org/v2/everything?q=${this.value}&from=2020-05-28&sortBy=publishedAt&apiKey=7ad0212514724cb29a48d475b0f1ce71`;
    getData();
})

countries.addEventListener("change",function(e){

    country = this.value;
    link = `https://cors-anywhere.herokuapp.com/newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=7ad0212514724cb29a48d475b0f1ce71`;
    getData();
})
