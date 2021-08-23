// Модуль для работы с нашим поиском + вспомогательные функции для него
import {onServe} from "./helpers/serve.js";
import {config} from "./network_config.js";

async function getArticlesByAtom(atom) {
    const targetUrl = `http://${config.host}:${config.port}/api/search?atom=${atom.toLowerCase()}`;
    return onServe(targetUrl);
}

async function getArticleById(id) {
    const targetUrl = `http://${config.host}:${config.port}/api/search/${id}`;
    return onServe(targetUrl);
}


function renderArticleContent(article, containerSelector) {
    const elem = document.querySelector(containerSelector);
    const {content} = article;
    elem.innerHTML = `<div class="content">${content}</div>`;
}


function getCoincidencesNumber(searchArticles) {
    return searchArticles.length;
}

function renderCoincidencesNumber(searchArticles, containerSelector) {
    const coincidencesNumber = getCoincidencesNumber(searchArticles);
    document.querySelector(containerSelector).textContent = coincidencesNumber;
}

function renderSearchRows(searchArticles, containerSelector) {
    const targetContainer = document.querySelector(containerSelector);
    targetContainer.innerHTML = '';
    searchArticles.forEach((article) => {
        targetContainer.insertAdjacentHTML('beforeend', renderSearchRow(article));
    });
}

function renderSearchRow(searchArticle) {
    const {title, id} = searchArticle;
    const occurences = searchArticle['pivot']['occurrences'];
    const template = `
        <li><a href="#" data-id="${id}">${title} (${occurences} вхождений)</a></li>
    `;
    return template;
}



export {getArticlesByAtom, renderSearchRows, getCoincidencesNumber, renderArticleContent, getArticleById};
