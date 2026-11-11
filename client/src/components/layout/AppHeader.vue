<template>

<header class="header">

    <div class="navbar">

      <div class="navbar-left">

        <img
          src="../../assets/marcaifms.png"
          alt="Portal TI"
        />

        <h1>Portal TI</h1>

      </div>

      <button class="user-button">

        <i class="bi bi-person-circle"></i>

        {{ username }}

      </button>

    </div>

    <button

      class="secret-button"

      @click="openFun"

      aria-hidden="true"

      tabindex="-1"

    ></button>

</header>

</template>

<script setup>

import { computed } from "vue";

import { useRouter } from "vue-router";

import { useAuthStore } from "../../stores/authStore";

const auth = useAuthStore();

const router = useRouter();

const username = computed(() => auth.user?.username ?? "Usuário");

function openFun(){

  router.push("/fun");

}

</script>