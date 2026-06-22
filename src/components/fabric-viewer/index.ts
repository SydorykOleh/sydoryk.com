import { FabricApp } from './FabricApp';

export function initFabricViewer() {
    try {
        const app = new FabricApp('three-container');
        return () => {
            app.dispose();
        };
    } catch (e) {
        console.error("Failed to initialize Fabric Viewer:", e);
        return () => {};
    }
}
