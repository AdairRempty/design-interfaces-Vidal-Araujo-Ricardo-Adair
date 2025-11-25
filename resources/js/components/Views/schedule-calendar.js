/**
 * @file schedule-calendar.js
 * @description Vista de selección de fecha y confirmación.
 * Integra el calendario y los diálogos de confirmación para finalizar la reserva.
 * @variants
 *  - No tiene variantes de visualización externas, maneja su propio estado interno.
 */
import { globalStyles } from '../styles.js';
import '../Organisms/cards/org-tutor-card.js';
import '../Organisms/org-bottom-bar.js';
import '../Organisms/org-calendar-modal.js';
import '../Organisms/org-toast-notification.js';
import '../Molecules/mol-popup-box.js';

/**
 * Componente Vista: Calendario de Agenda
 * Vista que gestiona la selección de fecha y confirmación de la tutoría.
 * Maneja el estado del calendario, popups de confirmación y notificaciones de error.
 */
class ViewScheduleCalendar extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.state = {
      showPopup: false,
      popupState: 'success',
      popupTitle: '',
      popupMessage: '',
      showErrorToast: false
    };
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
    const calendarModal = this.shadowRoot.querySelector('org-calendar-modal');

    if (calendarModal) {
      calendarModal.addEventListener('cancel', () => {
        document.dispatchEvent(new CustomEvent('navigate', {
          detail: { view: 'view-schedule-main' }
        }));
      });

      calendarModal.addEventListener('accept', () => {
        this.state.showPopup = true;
        this.state.popupState = 'success';
        this.state.popupTitle = 'Confirmar';
        this.state.popupMessage = 'Puedes verificar tu tutoria, en calendario';
        this.render();
        this.addEventListeners();
      });
    }

    const popup = this.shadowRoot.querySelector('mol-popup-box');
    if (popup) {
      popup.addEventListener('action', () => {
        if (this.state.popupState === 'success') {
          const isSuccess = Math.random() > 0.5;

          if (isSuccess) {
            document.dispatchEvent(new CustomEvent('navigate', {
              detail: {
                view: 'view-schedule-main',
                params: { 'show-success': '' }
              }
            }));
          } else {
            this.state.popupState = 'error';
            this.state.popupTitle = 'No Disponible';
            this.state.popupMessage = 'Vuelve a intentarlo';
            this.state.showErrorToast = true;

            this.render();
            this.addEventListeners();

            setTimeout(() => {
              if (this.isConnected) {
                this.state.showErrorToast = false;
                this.render();
                this.addEventListeners();
              }
            }, 3000);
          }
        } else {
          document.dispatchEvent(new CustomEvent('navigate', {
            detail: { view: 'view-schedule-main' }
          }));
        }
      });
    }
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        ${globalStyles}
        :host {
          display: block;
          height: 100vh;
          background-color: var(--color-bg);
          overflow: hidden;
          position: relative;
        }

        .layout {
          display: grid;
          grid-template-rows: auto 1fr auto;
          height: 100%;
          filter: ${this.state.showPopup ? 'blur(2px)' : 'none'};
          pointer-events: ${this.state.showPopup ? 'none' : 'auto'};
          transition: filter 0.3s ease;
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

        .content {
          padding: 16px 24px;
          overflow-y: hidden;
        }

        .page-title {
          text-align: center;
          font-size: 16px;
          font-weight: 700;
          margin-bottom: 16px;
          color: var(--color-secondary);
        }

        .overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: var(--color-secondary);
          opacity: 0.5;
          z-index: 900;
          display: ${this.state.showPopup ? 'block' : 'none'};
        }
        
        mol-popup-box {
            top: 50% !important;
            left: 50% !important;
            transform: translate(-50%, -50%) !important;
        }

        org-toast-notification {
            z-index: 1200; 
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
          <org-tutor-card></org-tutor-card>
        </main>

        <org-bottom-bar></org-bottom-bar>
      </div>

      ${!this.state.showPopup ? '<org-calendar-modal></org-calendar-modal>' : ''}
      
      <div class="overlay"></div>
      
      ${this.state.showPopup ? `
        <mol-popup-box 
            state="${this.state.popupState}" 
            title="${this.state.popupTitle}" 
            message="${this.state.popupMessage}"
            button-text="Aceptar">
        </mol-popup-box>
      ` : ''}

      ${this.state.showErrorToast ? `
        <org-toast-notification 
            type="error" 
            message="Error al Procesar la<br>solicitud">
        </org-toast-notification>
      ` : ''}

    `;
  }
}

customElements.define('view-schedule-calendar', ViewScheduleCalendar);