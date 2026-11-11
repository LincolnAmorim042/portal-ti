const repository = require("../repositories/funRepository");
const cleaner = require("../utils/fileCleaner");

// =========================
// ITENS
// =========================

async function getItems() {

    const items = await repository.allItems();

    for (const item of items) {

        const entries =
            await repository.getEntries(item.id);

        item.entries = entries.length;

    }

    return items;

}

async function getItem(id) {

    const item =
        await repository.getItem(id);

    if (!item)
        return null;

    item.entries =
        await repository.getEntries(id);

    return item;

}

async function createItem(data) {

    return repository.createItem(data);

}

async function updateItem(id, data) {

    return repository.updateItem(id, data);

}

async function removeItem(id) {

    const entries = await repository.getEntries(id);

    for (const entry of entries) {

        if (entry.file) {

            cleaner.deleteUpload(

                entry.file

            );

        }

    }

    return repository.removeItem(id);

}

// =========================
// ENTRADAS
// =========================

async function getEntries(itemId) {

    return repository.getEntries(itemId);

}

async function createEntry(itemId, data) {

    return repository.createEntry(itemId, data);

}

async function updateEntry(id, data) {

    return repository.updateEntry(id, data);

}

async function removeEntry(id) {

    const entry = await repository.getEntry(id);

    if (entry?.file) {

        cleaner.deleteUpload(

            entry.file

        );

    }

    return repository.removeEntry(id);

}

// =========================
// EXECUTAR BOTÃO
// =========================

async function execute(itemId) {

    const item =
        await repository.getItem(itemId);

    if (!item)
        return null;

    const entries =
        await repository.getEntries(itemId);

    if (!entries.length)
        return null;

    const random = Math.floor(
        Math.random() * entries.length
    );

    return {

        ...item,

        entry: entries[random]

    };

}

module.exports = {

    getItems,
    getItem,
    createItem,
    updateItem,
    removeItem,

    getEntries,
    createEntry,
    updateEntry,
    removeEntry,

    execute

};