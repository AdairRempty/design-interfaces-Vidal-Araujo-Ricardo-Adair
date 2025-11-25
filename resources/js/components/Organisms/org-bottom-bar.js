import { globalStyles } from '../styles.js';
import '../Atoms/ato-icon.js';

export class OrgBottomBar extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    /*Parametros del organismo*/
    this.shadowRoot.innerHTML = `
      <style>
        ${globalStyles}
        :host {
          display: block;
          width: 100%;
          position: fixed;
          bottom: 0;
          left: 0;
          z-index: 100;
        }

        /*Componentes del organismo*/

        .bar {
          background-color: var(--color-primary);
          padding: 16px 24px 8px 24px;
          border-top-left-radius: 0;
          border-top-right-radius: 0;
          display: flex;
          justify-content: center;
        }

        .home-icon {
          color: white;
          opacity: 0.8;
          cursor: pointer;
          padding: 8px;
        }
        
        .home-icon:hover {
           opacity: 1;
        }
      </style>

      /*Reutilizacion de codigo de atomos*/

      <div class="bar">
        <div class="home-icon">
           <ato-icon name="home" size="24px"></ato-icon>
        </div>
      </div>
    `;
  }
}

customElements.define('org-bottom-bar', OrgBottomBar);


