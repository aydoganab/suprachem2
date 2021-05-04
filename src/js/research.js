let xhr = new XMLHttpRequest();
xhr.onload = function () {
    let pubdata = JSON.parse(xhr.responseText);
    for (let i = 0; i < pubdata.length; i++) {
        let s = pubdata[i];
        if (s.resfield != "") {
            let list = document.querySelector("[data-rf='" + s.resfield + "']");

            let li = document.createElement("li");
            let title = document.createTextNode(s.title+", ");
            let journal = document.createElement("i");
            journal.className = "pe-2";
            journal.appendChild(document.createTextNode(s.journal));
            let year = document.createElement("strong");
            year.className = "pe-2";
            year.appendChild(document.createTextNode(s.year));
            let link = document.createElement("a");
            link.href = "publications.html#pub" + s.num;
            link.innerHTML = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill=\"currentColor\" style=\"vertical-align: -0.1em\" viewBox=\"0 0 16 16\"><path d=\"M4.715 6.542 3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1.002 1.002 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4.018 4.018 0 0 1-.128-1.287z\"/><path d=\"M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 1 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 1 0-4.243-4.243L6.586 4.672z\"/></svg>";

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