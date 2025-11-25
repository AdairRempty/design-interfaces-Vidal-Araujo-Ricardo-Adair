/**
 * @file org-bottom-bar.js
 * @description Barra de navegación inferior.
 * Proporciona acceso rápido a las secciones principales de la aplicación (Home, Mensajes, Calendario, Perfil).
 * @variants
 *  - No tiene variantes configurables externamente.
 */
import { globalStyles } from '../styles.js';
import '../Atoms/ato-icon.js';

/**
 * Componente Organismo: Barra Inferior
 * Barra de navegación fija en la parte inferior de la pantalla.
 * Contiene el icono de inicio para volver a la pantalla principal.
 */
export class OrgBottomBar extends HTMLElement {
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

      <div class="bar">
        <div class="home-icon">
           <ato-icon name="home" size="24px"></ato-icon>
        </div>
      </div>
    `;
    /*Reutilizacion de codigo de atomos para crear un nav bar que no existe en el figma como molecula*/
  }
}

customElements.define('org-bottom-bar', OrgBottomBar);


