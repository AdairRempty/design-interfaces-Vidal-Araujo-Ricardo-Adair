import { globalStyles } from '../../styles.js';
import '../ato-icon.js';

export class AppIconButton extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  static get observedAttributes() {
    return ['label', 'icon', 'variant', 'disabled'];
  }

  connectedCallback() {
    this.render();
    this.addEventListeners();
  }

  addEventListeners() {
    const button = this.shadowRoot.querySelector('.icon-button');
    if (button && !this.hasAttribute('disabled')) {
      button.addEventListener('click', () => {
        this.dispatchEvent(new CustomEvent('click', { bubbles: true, composed: true }));
      });
    }
  }

  render() {
    const label = this.getAttribute('label') || 'Button';
    const icon = this.getAttribute('icon') || '';
    const variant = this.getAttribute('variant') || 'primary';
    const disabled = this.hasAttribute('disabled');

    this.shadowRoot.innerHTML = `
      <style>
        ${globalStyles}
        :host {
          display: inline-block;
        }

        /*Tamaños estandar y estilos generales del atomo*/

        .icon-button {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 16px;
          border-radius: 8px;
          border: none;
          cursor: pointer;
          transition: all 0.2s ease;
          font-family: var(--font-family);
          font-size: 14px;
          font-weight: 500;
          width: 100%;
          height: 40px;
        }

        /*Variantes*/
        
        .icon-button.primary {
          background-color: var(--color-primary);
          color: var(--color-bg);
        }

        .icon-button.primary:hover:not(:disabled) {
          box-shadow: 0 4px 12px var(--color-secondary);
          transform: translateY(-1px);
        }

        .icon-button.secondary {
          background-color: white;
          color: var(--color-primary);
          border: 2px solid var(--color-primary);
        }

        .icon-button.secondary:hover:not(:disabled) {
          box-shadow: 0 4px 12px var(--color-secondary);
          transform: translateY(-1px);
        }

        .icon-button.disabled,
        .icon-button:disabled {
          background-color: var(--color-secondary);
          color: var(--color-bg);
          cursor: not-allowed;
          opacity: 0.6;
        }

        .label {
          flex: 1;
          text-align: left;
        }

        .icon {
          color: currentColor;
        }
      </style>

      <button class="icon-button ${variant}" ${disabled ? 'disabled' : ''}>
        <span class="label">${label}</span>
        ${icon ? `<ato-icon name="${icon}" size="20px" class="icon"></ato-icon>` : ''}
      </button>
    `;
  }
}

customElements.define('ato-icon-button', AppIconButton);
