import { FabricState } from './FabricState';
import { FabricScene } from './FabricScene';
import { FabricMaterials } from './FabricMaterials';
import { FabricLoader } from './FabricLoader';
import { FabricUI } from './FabricUI';

export class FabricApp {
    state: FabricState;
    sceneManager: FabricScene;
    materialManager: FabricMaterials;
    loader: FabricLoader;
    ui: FabricUI;

    constructor(containerId: string) {
        const container = document.getElementById(containerId);
        if (!container) throw new Error(`Container #${containerId} not found`);

        if (container.hasChildNodes()) {
            container.innerHTML = '';
        }

        this.state = new FabricState();
        this.sceneManager = new FabricScene(container, this.state);
        this.materialManager = new FabricMaterials(this.state);
        this.loader = new FabricLoader(this.state, this.sceneManager, this.materialManager);
        this.ui = new FabricUI(this.state, this.sceneManager, this.materialManager, this.loader);

        // Initial camera reset and load initial model
        this.sceneManager.resetCamera();
        this.loader.loadModel(this.state.currentModel);
    }

    dispose() {
        this.sceneManager.dispose();
    }
}
