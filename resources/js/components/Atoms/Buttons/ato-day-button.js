import { globalStyles } from '../../styles.js';

export class AppDayButton extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  static get observedAttributes() {
    return ['day', 'state'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this.render();
  }

  connectedCallback() {
    this.render();
    this.addEventListeners();
  }

  addEventListeners() {
    const state = this.getAttribute('state') || 'available';
    if (state !== 'disabled') {
      this.shadowRoot.querySelector('.day-button').addEventListener('click', () => {
        this.dispatchEvent(new CustomEvent('day-click', {
          bubbles: true,
          composed: true,
          detail: { day: this.getAttribute('day') }
        }));
      });
    }
  }

  render() {
    const day = this.getAttribute('day') || '';
    const state = this.getAttribute('state') || 'available';

    this.shadowRoot.innerHTML = `
      <style>
        ${globalStyles}
        :host {
          display: block;
        }

        /*Tamaños estandar y estilos generales del atomo*/

        .day-button {
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 5px;
          font: var(--text-body);
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
          border: 1px solid transparent;
        }

        /*Variantes*/
        
        .day-button.available {
          color: var(--color-secondary);
          background-color: var(--color-bg);
          border-color: var(--color-secondary);
        }

        .day-button.available:hover {
          border-color: var(--color-primary);
          color: var(--color-primary);
        }

        .day-button.today {
          color: var(--color-primary);
          background-color: var(--color-bg);
          border-color: var(--color-primary);
        }

        .day-button.today:hover {
          background-color: var(--color-bg-alt);
        }

        .day-button.disabled {
          color: var(--color-text-light);
          background-color: var(--color-bg);
          cursor: not-allowed;
          opacity: 0.3;
        }

        .day-button.used,
        .day-button.selected {
          color: white;
          background-color: var(--color-primary);
          border-color: var(--color-primary);
        }

        .day-button.used:hover,
        .day-button.selected:hover {
          opacity: 0.9;
        }
      </style>

      <div class="day-button ${state}">
        ${day}
      </div>
    `;
  }
}

customElements.define('ato-day-button', AppDayButton);
