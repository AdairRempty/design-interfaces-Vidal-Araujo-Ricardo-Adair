/**
 * @file org-tutor-card.js
 * @description Tarjeta de información del tutor.
 * Muestra detalles clave del tutor como nombre, especialidad, tarifa y calificación.
 * @variants
 *  - selected: Atributo booleano que indica si la tarjeta está seleccionada (cambia el borde).
 */
import { globalStyles } from '../../styles.js';
import '../../Atoms/ato-star-rating.js';
import '../../Atoms/ato-icon.js';
import '../../Atoms/ato-profile-icon.js';

/**
 * Componente Organismo: Tarjeta de Tutor
 * Muestra la información de un tutor, incluyendo nombre, materia, calificación y detalles.
 * Permite seleccionar al tutor al hacer clic.
 */
export class OrgTutorCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  /**
   * Se ejecuta cuando el componente se añade al DOM.
   */
  connectedCallback() {
    this.render();
    this.addEventListeners();
  }

  /**
   * Añade los escuchadores de eventos necesarios.
   */
  addEventListeners() {
    this.shadowRoot.querySelector('.card').addEventListener('click', () => {
      this.dispatchEvent(new CustomEvent('tutor-selected', { bubbles: true, composed: true }));
    });
  }

  /**
   * Renderiza el componente.
   */
  render() {
    this.shadowRoot.innerHTML = `
      <style>
        ${globalStyles}
        :host {
          display: block;
          width: 380px;
        }

        /*Parametros del organismo*/

        .card {
          background-color: var(--color-bg-alt);
          border-radius: 12px;
          padding: 16px;
          box-shadow: 0 2px 4px var(--color-secondary);
          display: flex;
          flex-direction: column;
          gap: 12px;
          border: 2px solid var(--color-bg-alt);
          transition: all 0.2s ease;
          cursor: pointer;
          position: relative;
        }
        
        :host([selected]) .card {
          border-color: var(--color-secondary);
        }

        .header {
          display: flex;
          gap: 16px;
          align-items: center;
        }
        
        /*Reutilizacion de codigo de atomos*/
        
        ato-profile-icon {
          margin-top: 16px;
          left: 8px;
        }

        /*Componentes del organismo*/

        .info {
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .name-row {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            width: 100%;
        }

        .name {
          font: var(--text-h2);
          color: var(--color-text-main);
          margin-bottom: 4px;
        }

        .subject {
          font: var(--text-body);
          color: var(--color-secondary);
        }

        .favorite-icon {
            color: var(--color-rating);
        }

        .rating-row {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-top: 8px;
        }

        .rating-text {
          font: var(--text-body);
          color: var(--color-text-main);
        }

        .extra-info {
            display: none;
            border-top: 1px solid var(--color-bg-alt);
            padding-top: 12px;
            margin-top: 4px;
        }

        :host([selected]) .extra-info {
            display: block;
        }

        .info-line {
            font: var(--text-body);
            color: var(--color-text-main);
            margin-bottom: 4px;
            font-weight: 500;
        }
        
        .info-line span {
            font-weight: 400;
            color: var(--color-secondary);
        }

      </style>


      <div class="card">
        <div class="header"> 
          <ato-profile-icon></ato-profile-icon>
          <div class="info">
            <div class="name-row">
                <div>
                    <div class="name">Maria Perez</div>
                    <div class="subject">Quimica</div>
                </div>
                <div class="favorite-icon">
                    <ato-icon name="star-empty" size="24px" color="var(--color-rating)"></ato-icon>
                </div>
            </div>
            
            <div class="rating-row">
                <ato-star-rating value="5" readonly size="18px"></ato-star-rating>
                <span class="rating-text">4.8 (24 reseñas)</span>
            </div>
          </div>
        </div>

        <div class="extra-info">
            <div class="info-line">Fecha de la tutoria: <span>Lunes</span></div>
            <div class="info-line">Hora de la tutoria: <span>10:00 - 11:00</span></div>
        </div>
      </div>
    `;
    /*Seccion de datos fake para simular una DB*/
  }
}

customElements.define('org-tutor-card', OrgTutorCard);


