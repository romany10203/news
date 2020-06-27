

let req = new XMLHttpRequest();
let news;
let country = "eg";
let category = "general";
let searchInp = document.getElementById("searchInp");
let searchBtn = document.getElementById("searchBtn");
let link;
let temp;
let links = document.getElementsByClassName("nav-link");
let countries = document.getElementById("countries");

link = `https://cors-anywhere.herokuapp.com/newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=7ad0212514724cb29a48d475b0f1ce71`;
getData();


function getData()
{    
/*
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
*/
axios.get(link).then(function (response) {
    // handle success
    console.log(response.data);
    news = response.data.articles;
    displayNews();
  })

}



function displayNews()
{
    temp = "";
    for(let i = 0 ; i < news.length ; i++)
    {
        temp += `<div class="col-md-3 my-1">
                    <div class="new p-2">
                        <img src=${news[i].urlToImage} class="img-fluid"/>
                        <h5 style="text-align: right; direction:rtl">${news[i].title}</h5>
                        <p class="text-muted" style="text-align: right; direction:rtl">${news[i].description}</p>
                        <a style="text-decoration: none;background-color: #007bff;text-align: center;padding: 7px;color: white;" href=${news[i].url}target="_blank">Read more...</a>
                    </div>
                </div>`;
    }
    document.getElementById("rowNews").innerHTML = temp;
}

for(let i = 0 ; i < links.length ; i++)
{
    links[i].addEventListener("click",function(e){

        category = e.target.innerHTML;
        link = `http://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=7ad0212514724cb29a48d475b0f1ce71`;
        getData();
    })
}


searchInp.addEventListener("keyup",function(e){

    link = `http://newsapi.org/v2/everything?q=${this.value}&from=2020-05-26&sortBy=publishedAt&apiKey=7ad0212514724cb29a48d475b0f1ce71`;
    getData();
})

countries.addEventListener("change",function(e){

    country = this.value;
    link = `http://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=7ad0212514724cb29a48d475b0f1ce71`;
    getData();
})
