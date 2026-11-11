import { ref } from "vue";

export function useModal() {

    const visible = ref(false);

    const selected = ref(null);

    const mode = ref("create");

    function openCreate() {

        selected.value = null;

        mode.value = "create";

        visible.value = true;

    }

    function openEdit(item) {

        selected.value = { ...item };

        mode.value = "edit";

        visible.value = true;

    }

    function close() {

        visible.value = false;

        selected.value = null;

    }

    return {

        visible,

        selected,

        mode,

        openCreate,

        openEdit,

        close

    };

}