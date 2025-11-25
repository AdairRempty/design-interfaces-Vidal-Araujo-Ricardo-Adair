/**
 * @file ato-button-medium.js
 * @description Componente de botón de tamaño mediano.
 * Similar al botón estándar pero con dimensiones ajustadas para contextos específicos.
 * @variants
 *  - primary: Botón sólido con el color primario.
 *  - secondary: Botón sólido con el color secundario.
 *  - ghost: Botón con fondo transparente y borde.
 */
import { globalStyles, fontImport } from '../../styles.js';
import '../ato-icon.js';

/**
 * Componente Atomo: Botón Mediano
 * Variación del botón estándar con dimensiones y estilos específicos para tamaño mediano.
 */
export class AppButtonMedium extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  /**
   * Atributos observados por el componente.
   * @returns {string[]} Lista de atributos
   */
  static get observedAttributes() {
    return ['variant', 'disabled', 'icon', 'label', 'icon-position'];
  }

  /**
   * Se ejecuta cuando el componente se añade al DOM.
   */
  connectedCallback() {
    this.render();
  }

  /**
   * Renderiza el componente.
   */
  render() {
    const variant = this.getAttribute('variant') || 'primary';
    const disabled = this.hasAttribute('disabled');
    const icon = this.getAttribute('icon');
    const label = this.getAttribute('label') || this.textContent;
    const iconPosition = this.getAttribute('icon-position') || 'left';

    this.shadowRoot.innerHTML = `
      <style>
        ${fontImport}
        ${globalStyles}
        
        :host {
          display: inline-block;
          font-family: var(--font-family);
        }

        /*Tamaños estandar y estilos generales del atomo*/
        
        button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 9px;
          padding: 11px 15px;
          border-radius: 15px;
          border: none;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
          font-family: inherit;
          width: 100px;
          height: 40px;
        }

        /*Variantes*/

        .primary {
          background-color: var(--color-primary);
          color: white;
        }

        .secondary {
          background-color: var(--color-secondary);
          color: white;
        }

        .ghost {
          background-color: transparent;
          color: var(--color-primary);
          border: 1px solid var(--color-primary);
        }
        
        .text {
           background-color: transparent;
           color: var(--color-primary);
           padding: 0;
           min-height: auto;
        }
        
        .text:hover {
           text-decoration: underline;
           background-color: transparent;
           box-shadow: none;
           transform: none;
        }


        .icon-only {
           padding: 10px;
           border-radius: 8px;
           width: 40px;
           height: 40px;
        }


        button:hover:not(:disabled) {
          filter: brightness(0.9);
          transform: translateY(-1px);
        }
        
        .ghost:hover:not(:disabled) {
           background-color: var(--color-bg-alt);
        }

        button:active:not(:disabled) {
          transform: translateY(0);
          filter: brightness(0.8);
        }

        button:disabled {
          background-color: var(--color-bg-alt);
          color: var(--color-text-light);
          cursor: not-allowed;
          border-color: transparent;
          box-shadow: none;
          opacity: 0.6;
        }
        
        .ghost:disabled {
           background-color: transparent;
           border-color: var(--color-border);
           color: var(--color-text-light);
        }

      </style>
      <button class="${variant} ${!label.trim() ? 'icon-only' : ''}" ${disabled ? 'disabled' : ''}>
        ${icon && iconPosition === 'left' ? `<ato-icon name="${icon}" size="18px" color="currentColor"></ato-icon>` : ''}
        ${label ? `<span>${label}</span>` : ''}
        ${icon && iconPosition === 'right' ? `<ato-icon name="${icon}" size="18px" color="currentColor"></ato-icon>` : ''}
        <slot></slot>
      </button>
    `;
  }
}

customElements.define('ato-button-medium', AppButtonMedium);
