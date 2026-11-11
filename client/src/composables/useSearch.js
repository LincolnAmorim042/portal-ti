import { computed, ref } from "vue";

export function useSearch(items, field) {

    const search = ref("");

    const filtered = computed(() => {

        if (!search.value) {

            return items.value;

        }

        const text = search.value.toLowerCase();

        return items.value.filter(item =>
            String(item[field])
                .toLowerCase()
                .includes(text)
        );

    });

    return {

        search,

        filtered

    };

}