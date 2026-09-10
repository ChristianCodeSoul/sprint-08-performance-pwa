import { submitOrder } from "./api";

import { 
    addToQueue, 
    getQueuedActions, 
    removeQueuedAction 
} from "../utils/indexedDB";

let isSyncing = false;

export async function queueOrder(order) {
    await addToQueue({
        type: "CREATE_ORDER",
        payload: order,
    });
}
export async function syncQueuedActions() {
    if (isSyncing || !navigator.onLine) {
        return { synced: 0, failed: 0};
    }
    isSyncing = true;
    let synced = 0;
    let failed = 0;

    try {
        const actions = await getQueuedActions();

        for (const action of actions) {
            if (!navigator.onLine) {
                break;
            }
            try {
                if (action.type === "CREATE_ORDER") {
                    await submitOrder(action.payload);
                }
                await removeQueuedAction(action.id);
                synced++;
            } catch (err) {
                console.error(`Failed to process queued action ID ${action.id}:`, err);
                failed++;
            }
        }
    } catch (err) {
        console.error("Error reading queued actions from IndexedDB:", err);
    } finally {
        isSyncing = false;
    }
    return { synced, failed };
}
if (typeof window !== "undefined") {
    window.addEventListener("online", () => {
        syncQueuedActions();
    });
    if (navigator.onLine) {
        syncQueuedActions();
    }
}
