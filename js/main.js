const toggle = document.getElementById("darkModeToggle");
const html = document.documentElement;

if (toggle) {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    html.setAttribute("data-bs-theme", savedTheme);
    toggle.checked = savedTheme === "dark";
  }

  toggle.addEventListener("change", () => {
    const newTheme = toggle.checked ? "dark" : "light";
    html.setAttribute("data-bs-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  });
}
