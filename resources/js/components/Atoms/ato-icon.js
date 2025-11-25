/**
 * @file ato-icon.js
 * @description Componente de icono SVG reutilizable.
 * Gestiona la renderización de iconos SVG importados y permite personalización.
 * @variants
 *  - name: Nombre del icono a mostrar (star-filled, star-empty, user, search, etc.).
 *  - size: Tamaño del icono (defecto: 24px).
 *  - color: Color del icono (defecto: currentColor).
 *  - state: Estilo del contenedor si with-background está activo (primary, secondary, disabled).
 *  - with-background: Booleano para mostrar el icono dentro de un contenedor con fondo.
 */
import { globalStyles } from '../styles.js';
import starFilled from '../Icons/Estrella Rellena.svg?raw';
import starEmpty from '../Icons/Estrella Vacia.svg?raw';
import user from '../Icons/Usuario.svg?raw';
import search from '../Icons/Buscar.svg?raw';
import message from '../Icons/Mensaje.svg?raw';
import calendar from '../Icons/Calendario.svg?raw';
import home from '../Icons/Home.svg?raw';
import menu from '../Icons/Menu.svg?raw';
import check from '../Icons/Aceptar.svg?raw';
import error from '../Icons/Adevertencia.svg?raw';

const icons = {
  'star-filled': starFilled,
  'star-empty': starEmpty,
  'user': user,
  'search': search,
  'message': message,
  'calendar': calendar,
  'home': home,
  'menu': menu,
  'check': check,
  'error': error
};

/**
 * Componente Atomo: Icono
 * Renderiza iconos SVG basados en el nombre proporcionado.
 * Soporta personalización de tamaño, color y estado.
 */
export class AppIcon extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  /**
   * Atributos observados por el componente.
   * @returns {string[]} Lista de atributos
   */
  static get observedAttributes() {
    return ['name', 'size', 'color', 'state', 'with-background'];
  }

  /**
   * Se ejecuta cuando un atributo observado cambia.
   * @param {string} name - Nombre del atributo
   * @param {string} oldValue - Valor anterior
   * @param {string} newValue - Nuevo valor
   */
  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.render();
    }
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
    const name = this.getAttribute('name');
    const size = this.getAttribute('size') || '24px';
    const color = this.getAttribute('color') || 'currentColor';
    const state = this.getAttribute('state') || 'primary';
    const withBackground = this.hasAttribute('with-background');
    const svgContent = icons[name] || '';

    this.shadowRoot.innerHTML = `
      <style>
        ${globalStyles}
        :host {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          ${withBackground ? '' : `width: ${size}; height: ${size};`}
          color: ${color};
        } 

        /*Tamaños estandar y estilos generales del atomo*/
        
        .icon-container {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 50px;
          height: 50px;
          border-radius: 10px;
          padding: 20px;
        }

        /*Variantes*/
        
        .icon-container.primary {
          background-color: var(--color-primary);
          color: var(--bg);
        }

        .icon-container.secondary {
          background-color: var(--color-secondary);
          color: var(--bg);
        }

        .icon-container.disabled {
          background-color: var(--bg);
          color: var(--bg);
          opacity: 0.6;
        }

        .icon-wrapper {
          width: ${size};
          height: ${size};
          display: flex;
          align-items: center;
          justify-content: center;
        }

        svg {
          width: 100%;
          height: 100%;
          fill: currentColor;
        }
        svg path {
          stroke: currentColor;
          fill: currentColor;
        }
      </style>
      ${withBackground ? `
        <div class="icon-container ${state}">
          <div class="icon-wrapper">
            ${svgContent}
          </div>
        </div>
      ` : `
        <div class="icon-wrapper">
          ${svgContent}
        </div>
      `}
    `;

    const svgElement = this.shadowRoot.querySelector('svg');
    if (svgElement) {
      svgElement.removeAttribute('width');
      svgElement.removeAttribute('height');
      svgElement.setAttribute('width', '100%');
      svgElement.setAttribute('height', '100%');

      svgElement.querySelectorAll('path').forEach(path => {
        if (path.hasAttribute('stroke')) path.setAttribute('stroke', 'currentColor');
        if (path.hasAttribute('fill') && path.getAttribute('fill') !== 'none') path.setAttribute('fill', 'currentColor');
      });
    }
  }
}

customElements.define('ato-icon', AppIcon);
