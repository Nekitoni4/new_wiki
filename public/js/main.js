// Точка входа для всех обработчиков
import { getPageInfo } from './wiki_page.js';
import { createNewArticle, renderNewArticleRow, renderInfoByImport } from "./articles_api.js";
import { getArticlesByAtom, getCoincidencesNumber, renderSearchRows, renderArticleContent,
        getArticleById} from "./search_api.js";
import {delegate, toggle, animateToggle, showContainer, closeContainer} from './helpers/DOM.js';
import {renderErrorNotification, renderSuccessNotification} from "./error_api.js";

document.querySelector('.wiki_import').addEventListener('submit', (event) => {
    event.preventDefault();
    const titlePage = document.querySelector('.wiki_import__field').value;
    const time = performance.now();
    getPageInfo(titlePage).then((articleData) => {
        toggle('.import_progress');
        return createNewArticle(articleData);
    }).catch((err) => {
        toggle('.import_progress');
        err.json().then((err) => {
            renderErrorNotification(err);
            animateToggle('.notification', 'animate_open');
        });

    }).then((articleData) => {
        const executeTime = ((performance.now() - time)/1000).toFixed(2);
        renderNewArticleRow(articleData, '.articles tbody');
        renderInfoByImport(articleData, '.import_info__wrapper', executeTime);
        toggle('.import_progress');
        toggle('.import_info__wrapper');
    });
});

document.querySelector('.import_articles__btn').addEventListener('click', (event) => {
    showContainer('.import_articles__wrapper');
    closeContainer('.search_articles__wrapper');
});

document.querySelector('.search_articles__btn').addEventListener('click', (event) => {
    showContainer('.search_articles__wrapper');
    closeContainer('.import_articles__wrapper');
});


document.querySelector('.articles_search').addEventListener('submit', (event) => {
    event.preventDefault();
    const targetAtom = document.querySelector('.search_field').value;
    getArticlesByAtom(targetAtom).then(searchArticles => {
        const success_notification = `Успешно! Найдено ${getCoincidencesNumber(searchArticles)} статьи`;
        renderSuccessNotification(success_notification);
        animateToggle('.is-success', 'animate_open');
       renderSearchRows(searchArticles, '.search_results');
    }).catch(err => {
        renderErrorNotification(err);
        animateToggle('.is-danger', 'animate_open');
    });
});

delegate('click', (event) => {
    event.preventDefault();
    const targetID = event.target.dataset.id;
    getArticleById(targetID).then((article) => {
        renderArticleContent(article, '.card__article_content');
        document.querySelector('.content_frame').classList.remove('hidden');
    }).catch(err => {
        renderErrorNotification(err);
        animateToggle('.is-danger', 'animate_open');
    });
}, 'a', '.search_results');
