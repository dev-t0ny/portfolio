<script setup lang="ts">
import { useBlog } from "../composables/useBlog";
// TypeScript infère automatiquement le type de 'posts' grâce à notre interface Post
const { posts } = useBlog();
</script>

<template>
    <div class="max-w-2xl mx-auto">
        <h1 class="text-3xl font-bold mb-8 text-stone-700 dark:text-amber-200">
            Journal
        </h1>
        <ul class="space-y-6">
            <li v-for="post in posts" :key="post.slug">
                <router-link
                    :to="{ name: 'post', params: { slug: post.slug } }"
                    class="group block hover:bg-stone-100 dark:hover:bg-white/5 p-4 rounded-lg -mx-4 transition-colors"
                >
                    <div class="flex justify-between items-baseline mb-1">
                        <h2
                            class="text-xl font-bold group-hover:text-amber-600 transition-colors"
                        >
                            {{ post.title }}
                        </h2>
                        <span
                            class="text-xs text-slate-400 font-mono shrink-0 ml-4"
                            >{{ post.date }}</span
                        >
                    </div>
                    <p class="text-sm text-slate-600 dark:text-slate-400 mt-2">
                        {{ post.description }}
                    </p>
                </router-link>
            </li>
        </ul>
    </div>
</template>
