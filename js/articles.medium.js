function fetchArticles() {
    let results = document.getElementById('results');

fetch(`https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@skaveesh`)
        .then((res) => res.json())
        .then((data) => {
        
            document.querySelector('body').className = '';

            const res = data.items; //This is an array with the content. 
   
            if (!res) {
                results.innerHTML = `Author name error.`;
                return;
            }
            const posts = res.filter(item => item.categories.length > 0);
            if (posts.length === 0) {
                results.textContent = 'No results.';
                return;
            }
            

            let output = document.createDocumentFragment();

            posts.forEach((item) => {
           
                output = renderItem(item, output);
            });

      
            results.innerHTML = '';
            results.appendChild(output);
        }).catch(e => {
            console.log('error: ', e);
        });
}

function renderItem(item, output) {

    let url = item.link.split('?')[0];

    let section = document.createElement('section');
    section.className = "card_container";

    let a_img = document.createElement('a');

    a_img.href = url;
    a_img.className = 'image card_image';
    a_img.style.backgroundImage = "url('" + item.thumbnail + "')";
    a_img.target = '_blank';
    section.appendChild(a_img);

    let div_title = document.createElement('div');
    div_title.className = 'card_title';
    div_title.textContent = item.title;
    div_title.target = '_blank';
    section.appendChild(div_title);

    let span = document.createElement('span');
    let date = item.pubDate.split(' ')[0];
    span.innerHTML = `&nbsp;(${date})`;
    div_title.appendChild(span);
    section.appendChild(div_title);
    output.appendChild(section);
    return output;
}

fetchArticles();