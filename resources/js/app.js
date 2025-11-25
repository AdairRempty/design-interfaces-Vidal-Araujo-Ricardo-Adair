import './bootstrap';
import './components/Views/schedule-main.js';
import './components/Views/schedule-calendar.js';
import './components/Views/schedule-success.js';


document.addEventListener('navigate', (e) => {
    const { view, params } = e.detail;
    const currentView = document.querySelector('body > *');
    const newView = document.createElement(view);

    if (params) {
        Object.keys(params).forEach(key => {
            newView.setAttribute(key, params[key]);
        });
    }

    currentView.replaceWith(newView);
});