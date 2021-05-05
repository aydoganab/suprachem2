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
            link.innerHTML = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"1em\" height=\"1em\" fill=\"currentColor\" style=\"vertical-align: 0em\" viewBox=\"0 0 16 16\"><path fill-rule=\"evenodd\" d=\"M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5z\"/><path fill-rule=\"evenodd\" d=\"M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0v-5z\"/></svg>";

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