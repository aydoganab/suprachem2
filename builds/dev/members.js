let xhr = new XMLHttpRequest();
xhr.onload = function () {
    let memdata = JSON.parse(xhr.responseText);
    for (let i = 0; i < memdata.length; i++) {
        let s=memdata[i];

        let card = document.createElement('div');
        card.className = "card";

        let card_body = document.createElement('div');
        card_body.classList.add("card-body", "card-body-member");
        if (s.loc=="former"){
            card_body.classList.add("py-2");
        }

        let div1 = document.createElement("div");

        let img = document.createElement("img");
        img.classList.add("img-fluid","rounded-circle");
        if (s.loc=="former"){
            img.classList.add("former-member");
        }
        img.setAttribute("loading","lazy");
        img.setAttribute("alt", s.name);
        img.src=("img/members/" + s.img);

        let div2 = document.createElement("div");
        div2.className = "ps-md-4";

        let head5 = document.createElement("h5");
        head5.className = "card-title";
        head5.appendChild(document.createTextNode(s.name));

        let head6 = document.createElement("h6");
        head6.classList.add("card-subtitle", "text-muted");
        head6.appendChild(document.createTextNode(s.level));

        let mememail = document.createElement("a");
        mememail.className = "card-link";
        mememail.setAttribute("href", "mailto:"+s.email);
        mememail.appendChild(document.createTextNode(s.email));

        div1.appendChild(img);
        div2.appendChild(head5);
        div2.appendChild(head6);
        div2.appendChild(mememail);
        card_body.appendChild(div1);
        card_body.appendChild(div2);
        card.appendChild(card_body);
        document.getElementById(s.loc).appendChild(card);

    }
};
const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}${month}${day}`;
};
const currentDate = new Date();
xhr.open('GET', 'members.json?_'+formatDate(currentDate), true);
xhr.send();