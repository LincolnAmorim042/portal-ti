import { defineStore } from "pinia";

import service from "../services/funService";

export const useFunStore = defineStore("fun", {

    state: () => ({

        items: [],
        entries: [],

        selected: null,
        selectedEntry: null,

        loading: false,
        saving: false,

        modal: false,
        deleteModal: false,

        entryModal: false,
        deleteEntryModal: false

    }),

    actions: {

        // =========================
        // ITENS
        // =========================

        async load() {

            this.loading = true;

            try {

                const response =
                    await service.getItems();

                this.items =
                    response.data;

            }

            finally {

                this.loading = false;

            }

        },

        openCreate() {

            this.selected = null;

            this.entries = [];

            this.modal = true;

        },

        async openEdit(item) {

            const response =
                await service.getItem(item.id);

            this.selected =
                response.data;

            await this.loadEntries(item.id);

            this.modal = true;

        },

        close() {

            this.modal = false;

        },

        async save(data) {

            this.saving = true;

            try {

                if (data.id) {

                    await service.updateItem(
                        data.id,
                        data
                    );

                    this.selected = {
                        ...this.selected,
                        ...data
                    };

                }

                else {

                    const response =
                        await service.createItem(data);

                    data.id = response.data.id;

                    this.selected = {
                        ...data
                    };

                }

                await this.load();

                await this.loadEntries(
                    this.selected.id
                );

                this.modal = false;

            }

            finally {

                this.saving = false;

            }

        },

        openDelete(item) {

            this.selected = item;

            this.deleteModal = true;

        },

        closeDelete() {

            this.deleteModal = false;

        },

        async confirmDelete() {

            if (!this.selected)
                return;

            this.saving = true;

            try {

                await service.removeItem(
                    this.selected.id
                );

                this.closeDelete();

                this.entries = [];

                this.selected = null;

                await this.load();

            }

            finally {

                this.saving = false;

            }

        },

        // =========================
        // ENTRADAS
        // =========================

        async loadEntries(itemId) {

            const response =
                await service.getEntries(itemId);

            this.entries =
                response.data || [];

        },

        openCreateEntry() {

            this.selectedEntry = null;

            this.entryModal = true;

        },

        openEditEntry(entry) {

            this.selectedEntry = entry;

            this.entryModal = true;

        },

        closeEntry() {

            this.entryModal = false;

            this.selectedEntry = null;

        },

        async saveEntry(data) {
            if(!this.selected)
                return;

            this.saving = true;

            try {

                if (data.id) {

                    await service.updateEntry(

                        this.selected.id,

                        data.id,

                        data

                    );

                }

                else {

                    await service.createEntry(

                        this.selected.id,

                        data

                    );

                }

                this.closeEntry();

                await this.loadEntries(

                    this.selected.id

                );

            }

            finally {

                this.saving = false;

            }

        },

        openDeleteEntry(entry) {

            this.selectedEntry = entry;

            this.deleteEntryModal = true;

        },

        closeDeleteEntry() {

            this.deleteEntryModal = false;

            this.selectedEntry = null;

        },

        async confirmDeleteEntry() {
            if(!this.selectedEntry)
                return;

            if(!this.selected)
                return;

            this.saving = true;

            try {

                await service.removeEntry(

                    this.selected.id,

                    this.selectedEntry.id

                );

                this.closeDeleteEntry();

                await this.loadEntries(

                    this.selected.id

                );

            }

            finally {

                this.saving = false;

            }

        },

        async upload(file){

            return await service.upload(file);

        },

        select(item){

            this.selected = item;

            return this.loadEntries(item.id);

        },

        // =========================
        // EXECUTAR
        // =========================

        async execute(item) {

            const response =
                await service.execute(item.id);

            return response.data;

        }

    }

});