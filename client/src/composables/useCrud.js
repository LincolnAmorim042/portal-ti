import { ref, computed, watch } from "vue";

export function useCrud({
    service,
    searchableFields = [],
    sortableFields = [],
    defaultSort = null
}) {

    // =========================
    // STATE
    // =========================

    const items = ref([]);

    const loading = ref(false);

    const saving = ref(false);

    const search = ref("");

    const selected = ref(null);

    const mode = ref("create");

    const modal = ref(false);

    const deleteModal = ref(false);

    const sortField = ref(defaultSort?.field ?? null);

    const sortDirection = ref(
        defaultSort?.direction ?? "asc"
    );

    // =========================
    // FILTRO
    // =========================

    const filteredItems = computed(() => {

        let list = [...items.value];

        if (search.value && searchableFields.length) {

            const text = search.value.toLowerCase();

            list = list.filter(item =>

                searchableFields.some(field =>

                    String(item[field] ?? "")
                        .toLowerCase()
                        .includes(text)

                )

            );

        }

        if (

            sortField.value &&
            sortableFields.includes(sortField.value)

        ) {

            list.sort((a, b) => {

                let A = a[sortField.value];
                let B = b[sortField.value];

                if (A == null) A = "";
                if (B == null) B = "";

                if (typeof A === "string") {

                    A = A.toLowerCase();
                    B = String(B).toLowerCase();

                }

                if (A > B)
                    return sortDirection.value === "asc" ? 1 : -1;

                if (A < B)
                    return sortDirection.value === "asc" ? -1 : 1;

                return 0;

            });

        }

        return list;

    });

    // =========================
    // ORDENAÇÃO
    // =========================

    const sortState = computed(() => ({

        field: sortField.value,

        direction: sortDirection.value

    }));

    function sort(field) {

        if (!sortableFields.includes(field))
            return;

        if (sortField.value === field) {

            sortDirection.value =

                sortDirection.value === "asc"
                    ? "desc"
                    : "asc";

        }

        else {

            sortField.value = field;

            sortDirection.value = "asc";

        }

    }

    // =========================
    // CRUD
    // =========================

    async function load() {

        loading.value = true;

        try {

            items.value = await service.getAll();

        }

        finally {

            loading.value = false;

        }

    }

    async function create(data) {

        saving.value = true;

        try {

            await service.create(data);

            modal.value = false;

            await load();

        }

        finally {

            saving.value = false;

        }

    }

    async function update(id, data) {

        saving.value = true;

        try {

            await service.update(id, data);

            modal.value = false;

            await load();

        }

        finally {

            saving.value = false;

        }

    }

    async function remove(id) {

        saving.value = true;

        try {

            await service.remove(id);

            deleteModal.value = false;

            await load();

        }

        finally {

            saving.value = false;

        }

    }

    // =========================
    // MODAIS
    // =========================

    function openCreate() {

        selected.value = null;

        mode.value = "create";

        modal.value = true;

    }

    function openEdit(item) {

        selected.value = { ...item };

        mode.value = "edit";

        modal.value = true;

    }

    function closeModal() {

        modal.value = false;

    }

    function openDelete(item) {

        selected.value = { ...item };

        deleteModal.value = true;

    }

    function closeDelete() {

        deleteModal.value = false;

    }

    async function confirmDelete() {

        if (!selected.value)
            return;

        await remove(selected.value.id);

    }

    // =========================
    // EXPORT
    // =========================

    return {

        // estado
        items,
        loading,
        saving,

        search,
        
        selected,
        mode,

        modal,
        deleteModal,

        // computados
        filteredItems,
        sortState,

        // CRUD
        load,
        create,
        update,
        remove,

        // modais
        openCreate,
        openEdit,
        closeModal,

        openDelete,
        closeDelete,
        confirmDelete,

        // ordenação
        sort
    };

}