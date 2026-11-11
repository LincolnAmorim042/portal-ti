<template>

<BasePage

    title="Usuários"

    description="Gerenciamento de usuários do Portal TI"

    icon="bi bi-people"

    :loading="store.loading"

    :empty="store.filteredItems.length === 0"

>

    <template #filters>

        <BaseInput

            label="Pesquisar"

            placeholder="Pesquisar usuário..."

            v-model="store.search"

        />

    </template>

    <template #actions>

        <BaseButton

            icon="bi bi-plus"

            @click="store.openCreate()"

        >

            Novo usuário

        </BaseButton>

    </template>

    <BaseTable

        :columns="columns"

        :rows="store.filteredItems"

        :sort="store.sortState"

        @sort="store.sort"

    >

        <template #actions="{ row }">

            <BaseButton

                icon="bi bi-pencil"

                variant="secondary"

                @click="store.openEdit(row)"

            />

            <BaseButton

                icon="bi bi-trash"

                variant="danger"

                @click="store.openDelete(row)"

            />

        </template>

    </BaseTable>

    <UserModal />

    <DeleteUserModal />

</BasePage>

</template>

<script setup>

import { onMounted } from "vue";

import BasePage from "../components/base/BasePage.vue";
import BaseInput from "../components/base/BaseInput.vue";
import BaseButton from "../components/base/BaseButton.vue";
import BaseTable from "../components/base/BaseTable.vue";

import UserModal from "../components/users/UserModal.vue";
import DeleteUserModal from "../components/users/DeleteUserModal.vue";

import { useUserStore } from "../stores/userStore";

const store = useUserStore();

const columns = [

    {
        field: "username",
        label: "Usuário",
        sortable: true,
        width: "260px"
    },

    {
        field: "active",
        label: "Status",
        type: "badge",
        sortable: true,
        width: "140px",
        align: "center",
        formatter: value => value ? "Ativo" : "Inativo",
        badge: value => value ? "success" : "danger"
    },

    {
        field: "last_login",
        label: "Último acesso",
        type: "datetime",
        sortable: true
    },

    {
        field: "created_at",
        label: "Criado",
        type: "date",
        sortable: true
    }

];

onMounted(() => {

    store.load();

});

</script>