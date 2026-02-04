export function ThemeToggle({ theme, onToggle }) {
  const nextTheme = theme === "dark" ? "light" : "dark";

  return (
    <button type="button" className="theme-toggle" onClick={() => onToggle(nextTheme)}>
      <span>{theme === "dark" ? "Dark" : "Light"} mode</span>
      <strong>{nextTheme}</strong>
    </button>
  );
}
