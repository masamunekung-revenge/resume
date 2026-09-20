document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const toggleButton = document.getElementById("themeToggle");
  const themePanel = document.getElementById("themePanel");
  const themeOptions = document.querySelectorAll(".theme-option");

  const validThemes = ["blue", "cream"];
  const savedTheme = localStorage.getItem("theme");
  const initialTheme = validThemes.includes(savedTheme)
    ? savedTheme
    : "blue";

  function setTheme(theme) {
    if (!validThemes.includes(theme)) return;

    body.dataset.theme = theme;
    localStorage.setItem("theme", theme);

    themeOptions.forEach((option) => {
      const isActive = option.dataset.theme === theme;
      option.classList.toggle("active", isActive);
      option.setAttribute("aria-pressed", String(isActive));
    });
  }

  setTheme(initialTheme);

  toggleButton.addEventListener("click", (event) => {
    event.stopPropagation();

    const isOpen = themePanel.classList.toggle("open");
    toggleButton.setAttribute("aria-expanded", String(isOpen));
  });

  themeOptions.forEach((option) => {
    option.addEventListener("click", () => {
      setTheme(option.dataset.theme);
      themePanel.classList.remove("open");
      toggleButton.setAttribute("aria-expanded", "false");
    });
  });

  document.addEventListener("click", (event) => {
    if (!event.target.closest(".theme-switcher")) {
      themePanel.classList.remove("open");
      toggleButton.setAttribute("aria-expanded", "false");
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      themePanel.classList.remove("open");
      toggleButton.setAttribute("aria-expanded", "false");
    }
  });
});

