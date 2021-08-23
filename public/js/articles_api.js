// Функции для работы со статьями нашего крутейшего API
import {onServe} from "./helpers/serve.js";
import {config} from "./network_config.js";

async function createNewArticle(articleData) {
    const targetUrl = `http://${config.host}:${config.port}/api/articles`;
    return onServe(targetUrl, 'POST', articleData);
}

function renderNewArticleRow(articleData, containerSelector) {
    const {title, url, size, count_words} = articleData;
    const html = `
        <tr>
            <td>${title}</td>
            <td>${url}</td>
            <td>${size}kb</td>
            <td>${count_words}</td>
        </tr>
    `;
    document.querySelector(containerSelector).insertAdjacentHTML('beforeend', html);
}

function renderInfoByImport(articleData, selectorContainer, executeTime) {
    const {url, size, count_words} = articleData;
    const elem = document.querySelector(selectorContainer);
    const template = `
        <p class="import_success message-header">Импорт завершён!</p>
        <div class="import_info message-body">
            <p>Найдена статья по адресу: ${url}</p>
            <p>Время обработки: ${executeTime}</p>
            <p>Размер статьи: ${size}Kb</p>
            <p>Количество слов: ${count_words}</p>
        </div>
    `;
    elem.innerHTML = template;
}

export {createNewArticle, renderNewArticleRow, renderInfoByImport};
