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
    const { labelToLight = "", labelToDark = "" } = toggle.dataset;
    toggle.setAttribute("aria-label", isDark ? labelToLight : labelToDark);
  }
}

function persistTheme(theme: ThemeMode) {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // Almacenamiento no disponible (modo privado, etc.): el tema solo dura la sesión.
  }
}

// El script del <head> ya dejó en <html> el tema guardado o el del sistema.
function getInitialTheme(): ThemeMode {
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

function initThemeToggle() {
  const toggle = document.getElementById("themeToggle") as HTMLButtonElement | null;
  if (!toggle) return;

  applyTheme(getInitialTheme());

  toggle.addEventListener("click", () => {
    const nextTheme: ThemeMode = document.documentElement.classList.contains("dark") ? "light" : "dark";
    applyTheme(nextTheme);
    persistTheme(nextTheme); // solo se guarda cuando el usuario elige
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initThemeToggle);
} else {
  initThemeToggle();
}
