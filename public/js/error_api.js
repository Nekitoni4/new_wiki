function renderErrorNotification(errorData, notificationContainer = '.is-danger .notification__content') {
    const errorMessage = errorData['title'][0];
    const elem = document.querySelector(notificationContainer);
    elem.innerHTML = errorMessage;
}

function renderSuccessNotification(successData, notificationContainer = '.is-success .notification__content') {
    document.querySelector(notificationContainer).textContent = successData;
}

export {renderErrorNotification, renderSuccessNotification};
