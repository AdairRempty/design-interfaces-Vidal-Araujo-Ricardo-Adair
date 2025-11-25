import { globalStyles } from '../styles.js';
import '../Atoms/ato-icon.js';

export class OrgToastNotification extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  static get observedAttributes() {
    return ['type', 'message'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this.render();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const type = this.getAttribute('type') || 'success';
    const message = this.getAttribute('message') || 'Tutoria Agendada<br>Correctamente';

    const iconName = type === 'error' ? 'error' : 'check';
    /* Atomo de icono implementado ademas de la logica de la molecula usando parametros y atomos
    ya existentes */
    this.shadowRoot.innerHTML = `
      <style>
        ${globalStyles}
        :host {
          display: block;
          position: fixed;
          top: 80px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 1200;
          width: 90%;
          max-width: 340px;
        }
        
        .toast {
          background-color: var(--color-success);
          border-left: 4px solid var(--color-success);
          border-radius: 4px;
          padding: 16px;
          display: flex;
          align-items: center;
          gap: 12px;
          box-shadow: 0 4px 12px var(--color-secondary);
          animation: slideDown 0.3s ease-out;
        }

        .toast.error {
          background-color: var(--color-error);
          border-left-color: var(--color-error);
        }

        .icon-container {
           color: white;
           display: flex;
           align-items: center;
           flex-shrink: 0;
        }

        .toast.error .icon-container {
          color: white;
        }

        .message {
          color: white;
          font-weight: 600;
          font-size: 14px;
          line-height: 1.4;
          text-align: left;
        }

        .toast.error .message {
          color: white;
        }

        @keyframes slideDown {
          from { transform: translateY(-20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      </style>

      <div class="toast ${type}">
        <div class="icon-container">
           <ato-icon name="${iconName}" size="24px" color="white"></ato-icon>
        </div>
        <div class="message">
          ${message}
        </div>
      </div>
    `;
  }
}

customElements.define('org-toast-notification', OrgToastNotification);
