/**
 * @file ato-profile-icon.js
 * @description Componente de imagen de perfil circular.
 * Muestra una imagen de usuario o un placeholder por defecto.
 * @variants
 *  - img: URL de la imagen de perfil.
 *  - size: Tamaño del componente (defecto: 45px).
 */
import { globalStyles } from '../../styles.js';
import user from '../Icons/Foto.svg?raw';

export class AtoProfileIcon extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
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
    /*Tamaños estandar y estilos generales del atomo*/
    this.shadowRoot.innerHTML = `
      <style>
        ${globalStyles}
        :host {
          display: block;
          width: 100px;
          height: 100px;
          position: relative;
          left: 10px;
          transform: rotate(0deg);
          opacity: 1;
        }

        /*Estilos del icono*/

        .icon-wrapper {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: var(--color-primary);
          border-radius: 50%;
          color: white;
          overflow: hidden;
        }

        /*Estilos del svg*/
        
        svg {
          width: 48px;
          height: 48px;
          fill: currentColor;
        }
        
        svg path {
          stroke: currentColor;
          fill: currentColor;
        }
      </style>
      <div class="icon-wrapper">
        ${user}
      </div>
    `;
  }

}

customElements.define('ato-profile-icon', AtoProfileIcon);
