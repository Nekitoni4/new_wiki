// Функции для работы с mediaWiki API

import {onServe} from "./helpers/serve.js";
import {bytesToKb, countWordsInContent} from './helpers/common.js';


function wikiQueryIsMissing(jsonResponse) {
    return jsonResponse.query.pages[0].missing;
}

async function getPageInfoByTitle(title) {
    const requestPath = `https://ru.wikipedia.org/w/api.php?` + new URLSearchParams({
        'action': 'query',
        'origin': '*',
        'prop': 'extracts',
        'exlimit': 1,
        'explaintext': 1,
        'titles': title,
        'formatversion': 2,
        'format': 'json'
    });
    const jsonResponse = await onServe(requestPath);
    if (!wikiQueryIsMissing(jsonResponse)) {
        const jsonPage = jsonResponse.query.pages[0];
        return [jsonPage.pageid, jsonPage.title, jsonPage.extract];
    }
    throw new Error('Страница не найдена по данному запросу!');
}

async function getPageInfoByAddInfo(id) {
    const requestPath = 'https://ru.wikipedia.org/w/api.php?' + new URLSearchParams({
        'format': 'json',
        'origin': '*',
        'action': 'query',
        'pageids': id,
        'prop': 'info',
        'inprop': 'url'
    });
    const response = await onServe(requestPath);
    const targetPage = response.query.pages[id];
    return [targetPage.canonicalurl, bytesToKb(targetPage.length), targetPage.length];
}

async function getPageInfo(title) {
    const [id, pageTitle, content] = await getPageInfoByTitle(title);
    const [url, size] = await getPageInfoByAddInfo(id);
    const countWords = countWordsInContent(content);
    return {
        'title': pageTitle,
        content,
        'url': decodeURI(url),
        'size': +size,
        'count_words': +countWords
    };
}


export { getPageInfo};


