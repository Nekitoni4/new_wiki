function delegate(on, callback, delegatedSelector, delegatingSelector = 'body') {
    document.querySelector(delegatingSelector).addEventListener(on, (event) => {
        document.querySelectorAll(delegatedSelector).forEach(elem => {
           if (event.target.isEqualNode(elem)) {
               callback(event);
           }
        });
    });
}

function showContainer(containerSelector, hiddenClass = 'hidden') {
    document.querySelector(containerSelector).classList.remove(hiddenClass);
}

function closeContainer(containerSelector, hiddenClass = 'hidden') {
    document.querySelector(containerSelector).classList.add(hiddenClass);
}

function delayToggle(delay, containerSelector, toggleClass = 'hidden') {
    setTimeout(() => {
        toggle(containerSelector, toggleClass);
    }, delay);
}

function toggle(selector, targetClass = 'hidden', afterCallback = null) {
    document.querySelector(selector).classList.toggle(targetClass);
    if (afterCallback) afterCallback(selector, targetClass);
}

function animateToggle(selector, animateClass, toggleDelay = 5000) {
    toggle(selector, animateClass, () => {
       delayToggle(toggleDelay, selector, animateClass);
    });
}

export {delegate, toggle, animateToggle, showContainer, closeContainer};
