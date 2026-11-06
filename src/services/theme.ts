type ThemeMode = "dark" | "light";

const THEME_STORAGE_KEY = "portfolio-theme";

function applyTheme(theme: ThemeMode): void {
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

function persistTheme(theme: ThemeMode): void {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {}
}

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
    persistTheme(nextTheme);
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initThemeToggle);
} else {
  initThemeToggle();
}
