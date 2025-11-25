import { globalStyles } from '../styles.js';
import user from '../Icons/Foto.svg?raw';

export class AtoProfileIcon extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

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
