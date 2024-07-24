import { createInertiaApp } from "@inertiajs/react";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { createRoot } from "react-dom/client";
import "../css/app.css";
import { InertiaProgress } from "@inertiajs/progress";
createInertiaApp({
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.jsx`,
            import.meta.glob("./Pages/**/*.jsx")
        ),
    setup({ el, App, props }) {
        createRoot(el).render(<App {...props} />);
    },
});

InertiaProgress.init({
    color: "#29d", // Color of the progress bar
    showSpinner: true, // Show spinner while loading
    includeCSS: true, // Include default CSS
    delay: 250,
});
