let xhr = new XMLHttpRequest();
xhr.onload = function () {
    let pubdata = JSON.parse(xhr.responseText);
    for (let i = 0; i < pubdata.length; i++) {
        let s = pubdata[i];
        if (s.resfield != "") {
            let list = document.querySelector("[data-rf='" + s.resfield + "']");

            let li = document.createElement("li");
            li.className = "fw-light";
            li.style.fontSize = "0.9375rem";

            let title = document.createTextNode(s.title+", ");

            let journal = document.createElement("i");
            journal.className = "pe-2";
            journal.appendChild(document.createTextNode(s.journal));

            let year = document.createElement("strong");
            year.className = "pe-2";
            year.appendChild(document.createTextNode(s.year));

            let link = document.createElement("a");
            link.setAttribute("target", "_blank");
            link.setAttribute("title", "Go to paper");
            link.href = "https://doi.org/" + s.doi;

            link.innerHTML = '<svg class="suprachem-icon"><use xlink:href="icons.svg#elink"></use></svg>';

            li.appendChild(title);
            li.appendChild(journal);
            li.appendChild(year);
            li.appendChild(link);

            list.appendChild(li);

        }

    }
};
xhr.open('GET', 'publications.json', true);
xhr.send();