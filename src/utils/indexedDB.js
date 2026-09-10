const DB_NAME = "sprint8-db";
const DB_VERSION = 1;
const STORE_NAME = "mutationQueue";

function openDatabase() {
    return new Promise((resolve, reject) =>  {
        const request = indexedDB.open(DB_NAME, DB_VERSION);

        request.onupgradeneeded = () => {
            const database = request.result;

            if (!database.objectStoreNames.contains(STORE_NAME)) {
                database.createObjectStore(STORE_NAME, {
                    keyPath: "id",
                    autoIncrement: true,
                });
            }
        };
        request.onsuccess = () => {
            resolve(request.result);
        };
        request.onerror = () => {
            reject(request.error);
        };
    });
}

export async function addToQueue(action) {
    const database = await openDatabase();

    return new Promise((resolve, reject) => {
        const transaction = database.transaction(
            STORE_NAME,
            "readwrite",
        );
        transaction.objectStore(STORE_NAME).add({
            ...action,
            createdAt: Date.now(),
        });

        transaction.oncomplete = () => {
            resolve();

        };
        transaction.onerror = () => {
            reject(transaction.error);
        };
    });
}
export async function getQueuedActions() {
    const database = await openDatabase();
    return new Promise((resolve, reject) => {
        const transaction = database.transaction(
            STORE_NAME,
            "readonly",
        );
        const request = transaction 
        .objectStore(STORE_NAME)
        .getAll();

        request.onsuccess = () => {
            resolve(request.result);
        };
        request.onerror = () => {
            reject(request.error);
        };
    });
}
export async function removeQueuedAction(id) {
    const database = await openDatabase();

    return new Promise((resolve, reject) => {
        const transaction = database.transaction(
            STORE_NAME,
            "readwrite",
        );
        transaction.objectStore(STORE_NAME).delete(id);
        transaction.oncomplete = () => {
            resolve();
        };
        transaction.onerror = () => {
            reject(transaction.error);
        };
    });

}