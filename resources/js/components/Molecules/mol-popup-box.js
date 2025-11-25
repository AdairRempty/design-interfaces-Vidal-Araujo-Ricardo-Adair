/**
 * @file mol-popup-box.js
 * @description Componente molecular de cuadro emergente (Popup).
 * Utilizado para mostrar mensajes de confirmación, éxito o error que requieren acción del usuario.
 * @variants
 *  - state: Define el estilo y el icono (success, error).
 *  - title: Título del popup.
 *  - message: Mensaje descriptivo.
 *  - button-text: Texto del botón de acción.
 */
import { globalStyles } from '../styles.js';
import '../Atoms/Buttons/ato-button-medium.js';
import '../Atoms/ato-icon.js';

/**
 * Componente Molécula: Cuadro Emergente (Popup)
 * Muestra un mensaje modal con un título, descripción y un botón de acción.
 * Soporta estados de éxito y error.
 */
export class MolPopupBox extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  /**
   * Atributos observados por el componente.
   * @returns {string[]} Lista de atributos
   */
  static get observedAttributes() {
    return ['state', 'title', 'message', 'button-text'];
  }

  /**
   * Se ejecuta cuando el componente se añade al DOM.
   */
  connectedCallback() {
    this.render();
  }

  /**
   * Se ejecuta cuando un atributo observado cambia.
   */
  attributeChangedCallback() {
    this.render();
  }

  /* Estados de la molecula */
  render() {
    const state = this.getAttribute('state') || 'success';
    const title = this.getAttribute('title') || 'Título';
    const message = this.getAttribute('message') || 'Mensaje del cuadro emergente.';
    const buttonText = this.getAttribute('button-text') || 'Aceptar';

    /* Configuración de los 3 estados */
    const stateConfig = {
      success: {
        icon: 'check',
        label: 'Éxito',
        color: 'var(--color-success)'
      },
      error: {
        icon: 'error',
        label: 'Error',
        color: 'var(--color-error)'
      }
    };

    const currentConfig = stateConfig[state] || stateConfig.success;

    /*Parametros de la molecula*/

    this.shadowRoot.innerHTML = `
      <style>
        ${globalStyles}
        :host {
          display: block;
          width: 270px;
          height: 170px;
          position: fixed;
          top: 20px;
          left: 20px;
          opacity: 1;
          transform: rotate(0deg);
          
          background-color: var(--color-bg);
          border-radius: 12px;
          box-shadow: 0 4px 15px var(--color-secondary);
          border: 1px solid var(--color-bg-alt);
          z-index: 1000;
          overflow: hidden;
          font-family: var(--font-family);
        }

        .container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100%;
          padding: 16px;
          text-align: center;
        }

        .title {
          font-size: 16px;
          font-weight: 700;
          color: var(--color-text-main);
          margin: 0 0 4px 0;
        }

        .message {
          font-size: 12px;
          color: var(--color-secondary);
          margin: 0 0 16px 0;
          line-height: 1.4;
        }

        .status-bar {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 4px;
          background-color: ${currentConfig.color};
        }
      </style>

      <div class="status-bar"></div>
      <div class="container">
        
        <div class="title">${title}</div>
        <div class="message">${message}</div>
        

        <ato-button-medium 
          variant="primary" 
          label="${buttonText}"
          style="width: 100%;"
        ></ato-button-medium>
      </div>
    `;/* Atomo de boton implementado */

    const btn = this.shadowRoot.querySelector('ato-button-medium');
    if (btn) {
      btn.addEventListener('click', () => {
        this.dispatchEvent(new CustomEvent('action', { bubbles: true, composed: true }));
      });
    }
  }
}

customElements.define('mol-popup-box', MolPopupBox);