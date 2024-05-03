class CustomSidebar extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' }); // Use shadow DOM to encapsulate styles.
      const linkElem = document.createElement('link');
      linkElem.setAttribute('rel', 'stylesheet');
      linkElem.setAttribute('href', 'components/navigation/navigation.css'); // Ensure the path is correct based on your folder structure
  
      this.shadowRoot.appendChild(linkElem);
  
      this.shadowRoot.innerHTML += `
        <nav class="sidebar">
          <h2 class="site-title">ben.cards</h2>
          <div class="nav-card item1" data-target="designs.html">
            <div class="icon">design_services</div>
            <div class="title-group">
              <div class="title">Designs</div>
              <div class="description">Some of my work</div>
            </div>
          </div>
          <div class="nav-card item2" data-target="experiments.html">
            <div class="icon">experiment</div>
            <div class="title-group">
              <div class="title">Experiments</div>
              <div class="description">Extra Things</div>
            </div>
          </div>
          <div class="nav-card item3" data-target="resources.html">
            <div class="icon">category</div>
            <div class="title-group">
              <div class="title">Resources</div>
              <div class="description">Files and more</div>
            </div>
          </div>
          <site-settings></site-settings>
        </nav>
      `;
    }
  
    static get observedAttributes() {
      return ['active-item'];
    }
  
    attributeChangedCallback(name, oldValue, newValue) {
      if (name === 'active-item') {
        this.updateActiveItem(newValue);
      }
    }
  
    connectedCallback() {
      this.shadowRoot.querySelectorAll('.nav-card').forEach(card => {
        card.addEventListener('click', () => {
          window.location.href = card.dataset.target;
        });
      });
    }
  
    updateActiveItem(index) {
      const cards = this.shadowRoot.querySelectorAll('.nav-card');
      cards.forEach(card => card.classList.remove('active'));
      if (cards[index]) {
        cards[index].classList.add('active');
      }
    }
  }
  
  customElements.define('custom-sidebar', CustomSidebar);
  