/*STYLES CSS*/
import "./scss/styles.scss";
/*---------*/

/*TEMPLATE AND FRAGMENT */
const fragment = document.createDocumentFragment();
const template = document.querySelector("#template-card").content;

const container = document.querySelector(".card-wrapper");

function getApi() {
    const URL = "https://api.themoviedb.org/3";
    const key = "b9ddfc9d41f7d2d3fc81bd6280d7db38";
    const URI = `${URL}/search/movie?api_key=${key}&language=en-US&query=dark&include_adult=false`;

    fetch(URI)
        .then((res) => {
            if (!res === "ok") {
                throw new Error(`status : ${status}`);
            }

            return res.json();
        })
        .then((data) => {
            const { results } = data;

            setHtml(results);
        })
        .catch((err) => console.log(err));
}

getApi();

function setHtml(data) {
    console.log(data);
    data.forEach((item) => {
        const { id, title, vote_average: rating, poster_path: img } = item;

        template.querySelector(
            ".card__img"
        ).src = `https://image.tmdb.org/t/p/w500${img}`;
        template.querySelector(".card__img").alt = title;
        template.querySelector(".card__title").textContent = title;
        template.querySelector(".card__text").textContent = rating;
        const clone = document.importNode(template, true);

        fragment.appendChild(clone);
    });

    container.appendChild(fragment);
}