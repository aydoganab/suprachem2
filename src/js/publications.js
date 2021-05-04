let xhr = new XMLHttpRequest();
xhr.onload = function () {
    let pubdata = JSON.parse(xhr.responseText);
    for (let i = 0; i < pubdata.length; i++) {
        let s = pubdata[i];

        let card = document.createElement('div');
        card.className = "card";
        card.setAttribute("id", "pub" + s.num);

        let card_body = document.createElement('div');
        card_body.className = "card-body";

        let card_title = document.createElement('h5');
        card_title.className = "card-title";
        card_title.appendChild(document.createTextNode(s.title));

        let h6 = document.createElement('h6');
        h6.classList.add('card-subtitle', 'text-muted');
        h6.appendChild(document.createTextNode(s.authors));

        let p1 = document.createElement('p');
        p1.className = 'card-text';
        p1.innerHTML = "<i>" + s.journal + "</i> <strong>" + s.year + "</strong>";

        if (s.volume != "") {
            p1.innerHTML += ",<i> " + s.volume + "</i>";
        }

        if (s.pages != "") {
            p1.innerHTML += ", " + s.pages;
        }

        card_body.appendChild(card_title);
        card_body.appendChild(h6);
        card_body.appendChild(p1);
        card.appendChild(card_body);

        if (s.image != "") {
            let div_img = document.createElement('div');
            div_img.classList.add('text-center', 'mb-3');
            let img = document.createElement('img');
            img.classList.add('img-fluid', 'img-pub');
            img.style.maxHeight = "250px";
            img.setAttribute("loading", "lazy");
            img.src = s.image;
            div_img.appendChild(img);
            card_body.appendChild(div_img);
        }

        if (s.abstract != "") {
            let p_abstract = document.createElement('p');
            p_abstract.classList.add('card-text', 'd-none', 'd-sm-block');
            p_abstract.appendChild(document.createTextNode(s.abstract));
            card_body.appendChild(p_abstract);
        }

        let doi = document.createElement('a');
        doi.href = "https://doi.org/" + s.doi;
        doi.target = "_blank";
        doi.className = "card-link";
        doi.innerHTML = '<svg style="vertical-align: 0em" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5z"/><path fill-rule="evenodd" d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0v-5z"/></svg> DOI: ' + s.doi;
        card_body.appendChild(doi);


        document.getElementById('pubs').appendChild(card);

    }
    //scroll to hash
    if (window.location.hash) {
        let hash = window.location.hash;
        window.location.href = hash;
    }
};
xhr.open('GET', 'publications.json', true);
xhr.send();