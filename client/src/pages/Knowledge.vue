<template>

<BasePage

    title="Central de Conhecimento"

    description="Tutoriais e soluções para problemas recorrentes"

    icon="bi bi-book"

    :loading="store.loading"

    :empty="filtered.length===0"

    empty-message="Nenhum tutorial encontrado."

>

    <template #filters>

        <BaseInput

            placeholder="Pesquisar tutorial..."

            v-model="search"

        />

    </template>

    <div class="knowledge-categories">

        <BaseButton

            v-for="item in categories"

            :key="item"

            :variant="category===item?'primary':'secondary'"

            @click="category=item"

        >

            {{ item }}

        </BaseButton>

    </div>

    <div class="knowledge-grid">

        <div

            v-for="tutorial in filtered"

            :key="tutorial.id"

            class="tutorial-card"

            @click="open(tutorial)"

        >

            <div

                class="tutorial-cover"

                v-if="tutorial.type==='video'"

            >

                <img

                    :src="thumbnail(tutorial.content)"

                >

            </div>

            <div

                v-else

                class="tutorial-icon"

            >

                <i :class="icon(tutorial.type)"></i>

            </div>

            <div class="tutorial-body">

                <span

                    class="badge"

                    :class="tutorial.type"

                >

                    {{ label(tutorial.type) }}

                </span>

                <h3>

                    {{ tutorial.title }}

                </h3>

                <p>

                    {{ tutorial.category }}

                </p>

                <small>

                    {{ tutorial.description }}

                </small>

            </div>

        </div>

    </div>

</BasePage>

<BaseModal

    v-model="modal"

    :title="selected?.title"

>

    <template v-if="selected">

        <iframe

            v-if="selected.type==='video'"

            class="video"

            :src="youtube(selected.content)"

            allowfullscreen

        />

        <img

            v-else-if="selected.type==='image'"

            class="image"

            :src="selected.content"

        >

        <div

            v-else

            class="markdown-body"
            v-html="markdown(selected.content)"

        />

    </template>

</BaseModal>

</template>

<script setup>

import {computed,ref,onMounted} from "vue";
import { marked } from "marked";

import BasePage from "../components/base/BasePage.vue";
import BaseInput from "../components/base/BaseInput.vue";
import BaseButton from "../components/base/BaseButton.vue";
import BaseModal from "../components/base/BaseModal.vue";

import {useTutorialStore} from "../stores/tutorialStore";

const store=useTutorialStore();

const modal=ref(false);

const selected=ref(null);

const search=ref("");

const category=ref("Todas");

onMounted(()=>{

    store.load();

});

const categories=computed(()=>{

    return [

        "Todas",

        ...new Set(

            store.items.map(

                x=>x.category

            )

        )

    ];

});

const filtered=computed(()=>{

    return store.items.filter(t=>{

        const okCategory=

            category.value==="Todas"

            ||

            t.category===category.value;

        const okSearch=

            t.title.toLowerCase()

            .includes(

                search.value.toLowerCase()

            )

            ||

            t.description

            ?.toLowerCase()

            .includes(

                search.value.toLowerCase()

            );

        return okCategory&&okSearch;

    });

});

function open(item){

    selected.value=item;

    modal.value=true;

}

function icon(type){

    return{

        video:"bi bi-play-circle",

        text:"bi bi-file-earmark-text",

        image:"bi bi-image"

    }[type];

}

function label(type){

    return{

        video:"Vídeo",

        text:"Texto",

        image:"Imagem"

    }[type];

}

function youtube(url){

    const id=

        url.split("v=")[1]?.split("&")[0]

        ||

        url.split("/").pop();

    return `https://www.youtube.com/embed/${id}`;

}

function thumbnail(url){

    const id=

        url.split("v=")[1]?.split("&")[0]

        ||

        url.split("/").pop();

    return `https://img.youtube.com/vi/${id}/hqdefault.jpg`;

}

function markdown(text){

    return marked.parse(text ?? "");

}

</script>