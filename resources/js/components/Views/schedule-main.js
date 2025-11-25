/**
 * @file schedule-main.js
 * @description Vista principal del flujo de agendamiento.
 * Presenta la información del tutor y las reseñas, sirviendo como punto de entrada.
 * @variants
 *  - show-success: Atributo que activa la visualización de una notificación de éxito.
 */
import { globalStyles } from '../styles.js';
import '../Organisms/cards/org-tutor-card.js';
import '../Organisms/org-bottom-bar.js';
import '../Atoms/ato-icon.js';
import '../Atoms/Buttons/ato-icon-button.js';
import '../Organisms/org-toast-notification.js';
import '../Organisms/cards/org-review-card.js';

/**
 * Componente Vista: Pantalla Principal de Agenda
 * Vista principal que muestra la información del tutor, reseñas y permite iniciar el proceso de agendamiento.
 * Coordina la interacción entre los diferentes organismos y átomos.
 */
class ViewScheduleMain extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  /**
   * Atributos observados por el componente.
   * @returns {string[]} Lista de atributos
   */
  static get observedAttributes() {
    return ['show-success'];
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
    const agendarBtn = this.shadowRoot.querySelector('#agendar-btn');
    agendarBtn.addEventListener('click', () => {
      document.dispatchEvent(new CustomEvent('navigate', {
        detail: { view: 'view-schedule-calendar' }
      }));
    });


    const tutorCard = this.shadowRoot.querySelector('org-tutor-card');
    tutorCard.addEventListener('tutor-selected', () => {

      if (tutorCard.hasAttribute('selected')) {
        tutorCard.removeAttribute('selected');
      } else {
        tutorCard.setAttribute('selected', '');
      }
    });
  }

  render() {
    const showSuccess = this.hasAttribute('show-success');
    /* Esta vista principal contiene la logica que permite interactuar con todos los atomos y
    organismos que la componen, permitiendo ver sus estados y acciones haciendo que en conjunto
    se forme la ruta critica para poder agendar una tutoria */
    this.shadowRoot.innerHTML = `
      <style>
        ${globalStyles}
        :host {
          display: block;
          height: 100vh;
          background-color: var(--color-bg);
          overflow: hidden;
        }

        .layout {
          display: grid;
          grid-template-rows: auto 1fr auto;
          height: 100%;
        }

        header {
          padding: 16px 24px;
          display: flex;
          align-items: center;
          gap: 16px;
          background-color: var(--color-bg);
        }

        h1 {
          font-size: 20px;
          font-weight: 700;
          color: var(--color-primary);
          margin: 0;
        }

        .menu-icon {
          color: var(--color-primary);
          cursor: pointer;
        }

        .content {
          padding: 16px 24px;
          overflow-y: auto;
          padding-bottom: 100px;
        }

        .page-title {
          text-align: center;
          font-size: 16px;
          font-weight: 700;
          margin-bottom: 16px;
          color: var(--color-text-main);
        }

        .reviews-section {
          margin-top: 24px;
        }

        .reviews-title {
          font-size: 16px;
          font-weight: 700;
          color: var(--color-text-main);
          margin-bottom: 12px;
          text-align: center;
          position: relative;
        }
        
        .reviews-title::after {
           content: '';
           display: block;
           width: 40px;
           height: 2px;
           background-color: var(--color-bf-alt);
           margin: 4px auto 0;
        }

        .reviews-list {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
        }
      </style>

      <div class="layout">
        <header>
          <div class="menu-icon">
            <ato-icon name="menu" size="24px" color="var(--color-primary)"></ato-icon>
          </div>
          <h1>TutorApp</h1>
        </header>

        <main class="content">
          <div class="page-title">Agendar</div>
          
          <div style="display: flex; justify-content: center;">
            <org-tutor-card></org-tutor-card>
          </div>

          <div class="reviews-section">
            <div class="reviews-title">Reseñas</div>
            <div class="reviews-list">
              <org-review-card></org-review-card>
              <org-review-card></org-review-card>
            </div>
          </div>
        </main>

        <ato-icon-button 
          label="Agendar" 
          icon="calendar" 
          variant="primary"
          id="agendar-btn"
          style="position: fixed; bottom: 80px; left: 50%; transform: translateX(-50%); width: 70%; max-width: 350px;">
        </ato-icon-button>

        <org-bottom-bar></org-bottom-bar>
      </div>

      ${showSuccess ? '<org-toast-notification type="success" message="Tutoria Agendada<br>Correctamente"></org-toast-notification>' : ''}
    `;
  }
}

customElements.define('view-schedule-main', ViewScheduleMain);

