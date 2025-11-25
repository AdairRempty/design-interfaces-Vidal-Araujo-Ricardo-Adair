export class AppStarRating extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._value = 0;
  }

  /**
   * Atributos observados por el componente.
   * @returns {string[]} Lista de atributos
   */
  static get observedAttributes() {
    return ['value', 'readonly', 'size'];
  }

  /**
   * Se ejecuta cuando un atributo observado cambia.
   * @param {string} name - Nombre del atributo
   * @param {string} oldValue - Valor anterior
   * @param {string} newValue - Nuevo valor
   */
  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'value') {
      this._value = parseInt(newValue) || 0;
      this.render();
    } else {
      this.render();
    }
  }

  /**
   * Se ejecuta cuando el componente se añade al DOM.
   */
  connectedCallback() {
    this._value = parseInt(this.getAttribute('value')) || 0;
    this.render();
  }

  /**
   * Establece el valor de la calificación.
   * @param {number} val - Nuevo valor
   */
  set value(val) {
    this.setAttribute('value', val);
  }

  /**
   * Obtiene el valor actual de la calificación.
   * @returns {number} Valor actual
   */
  get value() {
    return this._value;
  }

  /**
   * Renderiza el componente.
   */
  render() {
    const readonly = this.hasAttribute('readonly');
    const size = '28px';

    this.shadowRoot.innerHTML = `
      <style>
        ${globalStyles}
        :host {
          display: inline-flex;
          gap: 4px;
        }
        
        /*Parametros del atomo*/
        
        .star {
          cursor: ${readonly ? 'default' : 'pointer'};
          transition: transform 0.1s;
          color: var(--color-rating);
          display: flex;
          align-items: center;
          justify-content: center;
          width: 28px;
          height: 28px;
        }
        
        .star:hover {
           ${!readonly ? 'transform: scale(1.1);' : ''}
        }
      </style>
      ${[1, 2, 3, 4, 5].map(i => `
        <div class="star" data-value="${i}">
          <ato-icon 
            name="${i <= this._value ? 'star-filled' : 'star-empty'}" 
            size="${size}" 
            color="var(--color-rating)">
          </ato-icon>
        </div>
      `).join('')}
    `;

    if (!readonly) {
      this.shadowRoot.querySelectorAll('.star').forEach(star => {
        star.addEventListener('click', () => {
          const val = star.dataset.value;
          this.value = val;
          this.dispatchEvent(new CustomEvent('change', { detail: { value: val } }));
        });
      });
    }
  }
}

customElements.define('ato-star-rating', AppStarRating);
