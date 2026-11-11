<template>

<BasePage

    title="Laboratório"

    description="Conteúdo altamente científico."

    icon="bi bi-flask"

    :loading="store.loading"

    :empty="store.items.length===0"

    empty-message="Nenhum botão cadastrado."

>

    <template #actions>

        <BaseButton

            icon="bi bi-gear"

            @click="router.push('/fun-admin')"

        >

            Administrar

        </BaseButton>

    </template>

    <!-- TEXTOS -->

    <section
        v-if="textItems.length"
        class="fun-section"
    >

        <h2>

            <i class="bi bi-card-text"></i>

            Textos

        </h2>

        <div class="fun-grid">

            <button

                v-for="item in textItems"

                :key="item.id"

                class="fun-button"

                @click="execute(item)"

            >

                <i :class="item.icon"></i>

                <span>

                    {{ item.title }}

                </span>

            </button>

        </div>

    </section>

    <!-- IMAGENS -->

    <section
        v-if="imageItems.length"
        class="fun-section"
    >

        <h2>

            <i class="bi bi-image"></i>

            Imagens

        </h2>

        <div class="fun-grid">

            <button

                v-for="item in imageItems"

                :key="item.id"

                class="fun-button"

                @click="execute(item)"

            >

                <i :class="item.icon"></i>

                <span>

                    {{ item.title }}

                </span>

            </button>

        </div>

    </section>

    <!-- ÁUDIOS -->

    <section
        v-if="audioItems.length"
        class="fun-section"
    >

        <h2>

            <i class="bi bi-volume-up"></i>

            Áudios

        </h2>

        <div class="fun-grid">

            <button

                v-for="item in audioItems"

                :key="item.id"

                class="fun-button"

                @click="execute(item)"

            >

                <i :class="item.icon"></i>

                <span>

                    {{ item.title }}

                </span>

            </button>

        </div>

    </section>

</BasePage>

<BaseModal

    v-model="modal"

    :title="current?.title"

    @close="result=null"

>

    <template v-if="result">

        <div

            v-if="current?.type==='text'"

            class="fun-text"

            v-html="result.content"

        />

        <img

            v-else-if="current?.type==='image'"

            class="fun-image"

            :src="result.content"

        >

    </template>

</BaseModal>

</template>

<script setup>

import {

    ref,

    computed,

    onMounted

} from "vue";

import { useRouter } from "vue-router";

import BasePage from "../components/base/BasePage.vue";
import BaseModal from "../components/base/BaseModal.vue";
import BaseButton from "../components/base/BaseButton.vue";

import { useFunStore } from "../stores/funStore";

const router = useRouter();

const store = useFunStore();

const modal = ref(false);

const current = ref(null);

const result = ref(null);

const textItems = computed(() =>
    store.items.filter(i => i.type === "text")
);

const imageItems = computed(() =>
    store.items.filter(i => i.type === "image")
);

const audioItems = computed(() =>
    store.items.filter(i => i.type === "audio")
);

onMounted(() => {

    store.load();

});

async function execute(item){

    current.value = item;

    const response = await store.execute(item);

    if(!response)
        return;

    response.content =
        item.type === "text"
            ? response.entry.text
            : response.entry.file;

    result.value = response;

    if(item.type==="audio"){

        new Audio(response.content).play();

        return;

    }

    modal.value = true;

}

</script>
