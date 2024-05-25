<template>
    <div class="about">
        <h1>About Us</h1>
        <p>This is the about page of our application.</p>
        <div class="icons">
            <HeroIcons name="home" class="h-6 w-6 text-gray-500"/>
            <HeroIcons name="user" class="h-6 w-6 text-gray-500"/>
            <HeroIcons name="mail" class="h-6 w-6 text-gray-500"/>
        </div>
        <p>
            Icons made by <a href="https://heroicons.com/" target="_blank">Heroicons</a>.
            Licensed under the <a href="https://opensource.org/licenses/MIT" target="_blank">MIT License</a>.
        </p>
    </div>
</template>

<script lang="ts">
import HeroIcons from '@heroicons/vue/outline'

export default {
    components: {
        HeroIcons
    }
}
</script>

<style scoped>
.about {
    text-align: center;
}

.icons {
    display: flex;
    justify-content: center;
    gap: 1rem;
}
</style>
