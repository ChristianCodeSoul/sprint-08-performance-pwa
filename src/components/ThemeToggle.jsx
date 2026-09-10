import { useTheme } from "../context/useTheme";

function ThemeToggle() {
    const { theme, toggleTheme } = useTheme();

    return (
        <button className="theme-toggle"
        type="button"
        onClick={toggleTheme}
        aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
        title={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
        >
            <span className="theme-toggle__icon">
                {theme === "light" ? "⏾" : "𖤓"}
            </span>
        </button>
    );
}
export default ThemeToggle;