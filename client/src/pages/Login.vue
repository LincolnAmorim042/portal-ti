<template>

<div class="login-page">

    <BaseCard class="login-card">

        <div class="login-header">

            <img

                src="../assets/marcaifms.png"

                alt="Logo"

                class="login-logo"

            >

            <h2>

                Portal TI

            </h2>

        </div>

        <div class="login-form">

            <BaseInput

                label="Usuário"

                v-model="username"

            />

            <BaseInput

                label="Senha"

                type="password"

                v-model="password"

                @keyup.enter="login"

            />

            <BaseButton

                :disabled="auth.loading"

                @click="login">

                Entrar

            </BaseButton>

            <div

                v-if="error"

                class="base-error">

                {{ error }}

            </div>

        </div>

    </BaseCard>

</div>

</template>

<script setup>

import { ref } from "vue";
import { useRouter } from "vue-router";

import { useAuthStore } from "../stores/authStore";

import BaseCard from "../components/base/BaseCard.vue";
import BaseButton from "../components/base/BaseButton.vue";
import BaseInput from "../components/base/BaseInput.vue";

const router = useRouter();

const auth = useAuthStore();

const username = ref("");

const password = ref("");

const error = ref("");

async function login() {

    error.value = "";

    try {

        await auth.login(

            username.value,

            password.value

        );

        router.replace("/");

    }

    catch {

        error.value = "Usuário ou senha inválidos.";

    }

}

</script>

