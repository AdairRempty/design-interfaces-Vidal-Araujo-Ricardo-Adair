import { globalStyles } from '../styles.js';
import '../Atoms/Buttons/ato-button.js';
import '../Atoms/Buttons/ato-day-button.js';

export class OrgCalendarModal extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    const today = new Date();
    this.state = {
      currentDate: today,
      selectedDay: today.getDate()
    };
  }

  connectedCallback() {
    this.render();
  }

  getDaysInMonth(date) {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month + 1, 0).getDate();
  }

  getMonthName(date) {
    return date.toLocaleString('es-ES', { month: 'long' });
  }

  getFirstDayOfMonth(date) {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month, 1).getDay();
  }

  handleDayClick(day) {
    this.state.selectedDay = day;
    this.render();
  }

  render() {
    const { currentDate, selectedDay } = this.state;
    const daysInMonth = this.getDaysInMonth(currentDate);
    const monthName = this.getMonthName(currentDate);
    const firstDayIndex = this.getFirstDayOfMonth(currentDate);

    const adjustedFirstDay = firstDayIndex === 0 ? 6 : firstDayIndex - 1;

    this.shadowRoot.innerHTML = `
      <style>
        /*Parametros del organismo*/
        ${globalStyles}
        :host {
          display: block;
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 1000;
          background-color: var(--color-secondary);
          display: flex;
          align-items: center;
          justify-content: center;
          backdrop-filter: blur(2px);
        }
        
        .modal {
          background: var(--color-bg);
          border-radius: 16px;
          padding: 24px;
          width: 90%;
          max-width: 340px;
          box-shadow: 0 10px 25px var(--color-secondary);
          text-align: center;
        }

        h2 {
          font-size: 18px;
          font-weight: 700;
          margin: 0 0 4px 0;
          color: var(--color-text-main);
        }

        .month {
          font-size: 14px;
          color: var(--color-secondary);
          margin-bottom: 20px;
          text-transform: capitalize;
        }

        .calendar-grid {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: 4px;
          margin-bottom: 24px;
        }

        .day-header {
          font-size: 12px;
          font-weight: 700;
          color: var(--color-secondary);
        }

        .day.empty {
          width: 40px;
          height: 40px;
        }

        .actions {
          display: flex;
          gap: 12px;
          justify-content: center;
        }
        
        app-button {
           flex: 1;
        }
      </style>

      <div class="modal">
        <h2>Calendario</h2>
        <div class="month">${monthName}</div>
        
        <div class="calendar-grid">

          <div class="day-header">Lun</div>
          <div class="day-header">Mar</div>
          <div class="day-header">Mie</div>
          <div class="day-header">Jue</div>
          <div class="day-header">Vie</div>
          <div class="day-header">Sab</div>
          <div class="day-header">Do</div>
          

          ${Array.from({ length: adjustedFirstDay }, () => `<div class="day empty"></div>`).join('')}

          ${Array.from({ length: daysInMonth }, (_, i) => {
      const day = i + 1;
      const today = new Date();
      const isToday = day === today.getDate() &&
        currentDate.getMonth() === today.getMonth() &&
        currentDate.getFullYear() === today.getFullYear();
      const isPast = new Date(currentDate.getFullYear(), currentDate.getMonth(), day) < new Date(today.getFullYear(), today.getMonth(), today.getDate());
      const isSelected = day === selectedDay;

      let state = 'available';
      if (isSelected) state = 'selected';
      else if (isPast) state = 'disabled';
      else if (isToday) state = 'today';

      return `<ato-day-button day="${day}" state="${state}"></ato-day-button>`;
    }).join('')}
        </div>

        <div class="actions">
          <ato-button variant="secondary" label="Cancel" id="cancel-btn"></ato-button>
          <ato-button variant="primary" label="Acepta" id="accept-btn"></ato-button>
        </div>
      </div>
    `;


    this.shadowRoot.querySelectorAll('ato-day-button').forEach(dayBtn => {
      dayBtn.addEventListener('day-click', (e) => {
        this.handleDayClick(parseInt(e.detail.day));
      });
    });

    this.shadowRoot.querySelector('#cancel-btn').addEventListener('click', () => {
      this.dispatchEvent(new CustomEvent('cancel', { bubbles: true, composed: true }));
    });

    this.shadowRoot.querySelector('#accept-btn').addEventListener('click', () => {
      this.dispatchEvent(new CustomEvent('accept', {
        bubbles: true,
        composed: true,
        detail: { date: new Date(currentDate.getFullYear(), currentDate.getMonth(), selectedDay) }
      }));
    });
  }
}

customElements.define('org-calendar-modal', OrgCalendarModal);

