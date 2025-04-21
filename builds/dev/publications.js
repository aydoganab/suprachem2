let xhr = new XMLHttpRequest();
xhr.onload = function () {
    let pubdata = JSON.parse(xhr.responseText);
    for (let i = 0; i < pubdata.length; i++) {
        let s = pubdata[i];

        let card = document.createElement('div');
        card.className = "card";

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
            let show_abstract = document.createElement("a");
            show_abstract.setAttribute("href", "#");
            show_abstract.setAttribute("data-a", s.num);
            show_abstract.classList.add("card-link", "small", "show-abstract");
            show_abstract.appendChild(document.createTextNode("Show abstract"));
            card_body.appendChild(show_abstract);
            let p_abstract = document.createElement('p');
            p_abstract.setAttribute("id", "abstract-" + s.num);
            p_abstract.classList.add('card-text', 'd-none', "abstract");
            p_abstract.appendChild(document.createTextNode(s.abstract));
            card_body.appendChild(p_abstract);
        }

        if (s.doi !== "") {
            let card_footer = document.createElement("div");
            card_footer.classList.add("card-footer", "text-end");
            let doi = document.createElement('a');
            doi.href = "https://doi.org/" + s.doi;
            doi.target = "_blank";
            doi.classList.add('card-link', "text-truncate");
            doi.innerHTML = 'DOI: ' + s.doi + ' <svg class="suprachem-icon"><use xlink:href="icons.svg#elink"></use></svg>';
            card_footer.appendChild(doi);
            card.appendChild(card_footer);
        }



        document.getElementById('pubs').appendChild(card);
    }

    //show abstracts
    let show_abstracts = document.getElementsByClassName("show-abstract");
    for (let i = 0; i < show_abstracts.length; i++) {
        show_abstracts[i].addEventListener("click", function (e) {
            e.preventDefault();
            let a = this.getAttribute("data-a");
            let p_abstract = document.getElementById("abstract-" + a);
            if (this.classList.contains("show")){
                p_abstract.classList.add("d-none");
                this.classList.remove("show");
                this.childNodes[0].textContent = "Show abstract";
            }else {
                p_abstract.classList.remove("d-none");
                this.classList.add("show");
                this.childNodes[0].textContent = "Hide abstract";
            }
        });
    }
};
const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}${month}${day}`;
};
const currentDate = new Date();
xhr.open('GET', 'publications.json?_'+formatDate(currentDate), true);
xhr.send();