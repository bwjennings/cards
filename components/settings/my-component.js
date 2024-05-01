// Define the custom element my-component
customElements.define(
  "my-component",
  class extends HTMLElement {
    constructor() {
      super();

      const shadowRoot = this.attachShadow({ mode: "open" });
      shadowRoot.innerHTML = `
        <style>
        @import "style.css";
        :host {
            align-self:flex-end;
            justify-self:stretch;
            grid-row: 5 / 6;
            
        }

        button {
            width:100%;
        }
        </style>
        <button id="openBtn">Settings</button>
        <dialog id="dialog">
      <h2>Settings</h2>
        <form id="themeSelect" class="radio-buttons">
        <label for themeSelect">Color Mode</label>
        <label class="radio-button">
        <div class="icon">contrast</div>
        <span>Auto</span>
        <input type="radio" id="auto" name="drone" value="auto" checked />
       </label>

        <label class="radio-button">
        <div class="icon">light_mode</div>
        <span>Light</span>
        <input type="radio" id="light" name="drone" value="light" />
       </label>
      

        <label  class="radio-button">
        <div class="icon">dark_mode</div>
        <span>Dark</span>
      <input type="radio" id="dewey" name="drone" value="dark" />
      
      </label>
   
       
    </form>
    
    

          <button id="closeBtn">Close</button>
        </dialog>
      `;

      this.openBtn = shadowRoot.getElementById("openBtn");
      this.closeBtn = shadowRoot.getElementById("closeBtn");
      this.dialog = shadowRoot.getElementById("dialog");

      // Theme change handling within shadow DOM
      const themeSelectForm = shadowRoot.getElementById("themeSelect");
      themeSelectForm.addEventListener("change", (event) => {
        const selectedTheme = event.target.value;
        document.documentElement.setAttribute("data-theme", selectedTheme);
        localStorage.setItem("myCustomTheme", selectedTheme);
      });

      this.openBtn.addEventListener("click", () => this.dialog.showModal());
      this.closeBtn.addEventListener("click", () => this.dialog.close());
    }

    connectedCallback() {
      const storedTheme = localStorage.getItem("myCustomTheme");
      if (storedTheme) {
        document.documentElement.setAttribute("data-theme", storedTheme);
        this.shadowRoot.querySelector(
          `input[name="theme"][value="${storedTheme}"]`
        ).checked = true;
      }
     

    }
  }
);
