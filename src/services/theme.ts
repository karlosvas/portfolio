type ThemeMode = "dark" | "light";

const THEME_STORAGE_KEY = "portfolio-theme";

function applyTheme(theme: ThemeMode) {
  const root = document.documentElement;
  const toggle = document.getElementById("themeToggle") as HTMLButtonElement | null;
  const darkIcon = document.getElementById("themeIconDark");
  const lightIcon = document.getElementById("themeIconLight");

  const isDark = theme === "dark";
  root.classList.toggle("dark", isDark);
  root.classList.toggle("light", !isDark);

  darkIcon?.classList.toggle("hidden", !isDark);
  lightIcon?.classList.toggle("hidden", isDark);

  if (toggle) {
    toggle.setAttribute("aria-pressed", String(isDark));
    toggle.setAttribute("aria-label", isDark ? "Cambiar a tema claro" : "Cambiar a tema oscuro");
  }

  localStorage.setItem(THEME_STORAGE_KEY, theme);
}

function getInitialTheme(): ThemeMode {
  const persisted = localStorage.getItem(THEME_STORAGE_KEY);
  if (persisted === "dark" || persisted === "light") return persisted;

  if (document.documentElement.classList.contains("light")) return "light";
  return "dark";
}

function initThemeToggle() {
  const toggle = document.getElementById("themeToggle") as HTMLButtonElement | null;
  if (!toggle) return;

  applyTheme(getInitialTheme());

  toggle.addEventListener("click", () => {
    const nextTheme: ThemeMode = document.documentElement.classList.contains("dark") ? "light" : "dark";
    applyTheme(nextTheme);
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initThemeToggle);
} else {
  initThemeToggle();
}
