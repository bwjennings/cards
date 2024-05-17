// Define the custom element
customElements.define(
  "site-settings",
  class extends HTMLElement {
    constructor() {
      super();

      const shadowRoot = this.attachShadow({ mode: "open" });
      shadowRoot.innerHTML = `
        <style>
          @import "/style.css";
          @import "/components/settings/settings.css";
          
          .icon {
            font-family: var(--icon-font-family);
          }
        </style>
        <button id="openBtn"><div class="icon">settings</div> Settings</button>
        <dialog id="dialog">
          <h2 class="dialog-header">Settings</h2>
          <form id="themeSelect">
            <label id="colorMode">Color Mode
              <fieldset class="radio-buttons">
                <label class="radio-button">
                  <input type="radio" name="theme" value="light"> 
                  <span class="icon">light_mode</span> 
                  <span>Light</span>
                </label>
                <label class="radio-button">
                  <input type="radio" name="theme" value="" checked> 
                  <span class="icon">routine</span> 
                  <span>Auto</span>
                </label>
                <label class="radio-button">
                  <input type="radio" name="theme" value="dark">
                  <span class="icon">dark_mode</span> 
                  <span>Dark</span>
                </label>
              </fieldset>
            </label>
            <label for="hueSlider">Theme Color:
              <input type="range" id="hueSlider" name="hue" min="0" max="360" step="10">
            </label>
          </form>
          <footer>
            <button id="cancelBtn">Cancel</button>
            <button variant="brand" id="closeBtn">Save</button>
          </footer>
        </dialog>
      `;

      this.dialog = shadowRoot.getElementById("dialog");
      this.hueSlider = shadowRoot.getElementById("hueSlider");
      this.themeSelectForm = shadowRoot.getElementById("themeSelect");

      shadowRoot.getElementById("openBtn").addEventListener("click", () => this.dialog.showModal());
      shadowRoot.getElementById("closeBtn").addEventListener("click", () => this.saveChanges());
      shadowRoot.getElementById("cancelBtn").addEventListener("click", () => this.cancelChanges());

      this.hueSlider.addEventListener("input", () => this.updateHue(this.hueSlider.value));
      this.themeSelectForm.addEventListener("change", event => {
        if (event.target.name === "theme") {
          this.updateTheme(event.target.value);
        }
      });
    }

    connectedCallback() {
      this.applyStoredSettings();
    }

    applyStoredSettings() {
      const storedTheme = localStorage.getItem("myCustomTheme") || "";
      const storedHue = localStorage.getItem("selectedColorHue") || "230"; // Default hue if not stored

      if (storedTheme) {
        this.updateTheme(storedTheme);
        const themeRadio = this.shadowRoot.querySelector(`input[name="theme"][value="${storedTheme}"]`);
        if (themeRadio) {
          themeRadio.checked = true;
        }
      }

      this.hueSlider.value = storedHue;
      this.updateHue(storedHue);
    }

    updateTheme(theme) {
      
      if (theme === "light") {
        document.documentElement.style.setProperty("color-scheme", "light");
      } else if (theme === "dark") {
        document.documentElement.style.setProperty("color-scheme", "dark");
      } else {
        document.documentElement.style.setProperty("color-scheme", "light dark");
      }
    }

    updateHue(hue) {
      document.documentElement.style.setProperty('--brand-hue', hue);
    }

    saveChanges() {
      const selectedTheme = this.themeSelectForm.querySelector('input[name="theme"]:checked').value;
      const selectedHue = this.hueSlider.value;

      localStorage.setItem("myCustomTheme", selectedTheme);
      localStorage.setItem("selectedColorHue", selectedHue);

      this.dialog.close();
    }

    cancelChanges() {
      this.dialog.close();
      this.applyStoredSettings(); // Reapply the initial settings when cancelling
    }
  }
);
