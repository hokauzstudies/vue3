<template>
    <div class="page">
        <nav class="nav flex-column">
            <a class="nav-link active" href="#">Create</a>
            <a class="nav-link" href="#">Update</a>
            <a class="nav-link" href="#">Delete</a>
            <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Read</a>
        </nav>
        <main>
            <router-view></router-view>
        </main>
    </div>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component'

export default class Sample extends Vue {
}
</script>

<style scoped>
    .page {
        display: flex;
        flex-direction: row;
        height: 100%;
    }

    .page {
        display: flex;
        flex-direction: row;
        height: 100%;
    }

    nav {
        background: #cecece;
        display: flex;
        flex-direction: column;
        width: 250px;
        height: 100%;
    }

    main {
        width: calc(100% - 250px);
        height: 100%;
    }
</style>
