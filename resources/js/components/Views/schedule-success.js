import { globalStyles } from '../styles.js';
import '../Organisms/cards/org-tutor-card.js';
import '../Organisms/org-bottom-bar.js';

export class ViewScheduleSuccess extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }
  /* Para esta vista nos permite mostrar los casos de exito o error al agendar la tutoria */
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
          opacity: 0.4;
          pointer-events: none;
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

          <org-tutor-card></org-tutor-card>
        </main>

        <org-bottom-bar></org-bottom-bar>
      </div>


      <org-toast-notification></org-toast-notification>
      <org-confirm-dialog></org-confirm-dialog>
    `;
  }
}

customElements.define('view-schedule-success', ViewScheduleSuccess);
