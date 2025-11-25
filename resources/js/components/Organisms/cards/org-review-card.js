import { globalStyles } from '../../styles.js';
import '../../Atoms/ato-star-rating.js';
import '../../Atoms/ato-icon.js';
import '../../Atoms/ato-profile-icon.js';

export class OrgReviewCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        ${globalStyles}
        :host {
          display: block;
          width: 100%;
          max-width: 380px;
          margin-bottom: 12px;
          margin-top: 20px;
        }

        /*Parametros del organismo*/
        
        .card {
          background: var(--color-bg-alt);
          border-radius: 12px;
          padding: 12px;
          box-shadow: 0 1px 4px var(--color-secondary);
          border: 1px solid var(--color-border);
          display: flex;
          gap: 12px;
          align-items: flex-start;
          height: 125px;
          box-sizing: border-box;
        }

        .content {
          flex: 1;
        }

        /*Componentes del organismo*/

        .name {
          font-size: 14px;
          font-weight: 700;
          color: var(--color-text-main);
          margin: 0 0 4px 0;
          display: block;
        }

        .review-text {
          font-size: 12px;
          color: var(--color-secondary);
          margin: 0;
        }

        .rating {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-top: 8px;
        }
        
        .rating-number {
           font-size: 12px;
           color: var(--color-text-main);
           font-weight: 500;
        }
      </style>
      
      <div class="card">
        <ato-profile-icon></ato-profile-icon>
        <div class="content">
          <span class="name">Juan Flores</span>
          <p class="review-text">Reseña</p>
          <div class="rating">
            <ato-star-rating value="4" readonly size="14px"></ato-star-rating>
            <span class="rating-number">4</span>
          </div>
        </div>
      </div>
    `;
    /*Reutilizacion de codigo de atomos*/
  }
}

customElements.define('org-review-card', OrgReviewCard);


