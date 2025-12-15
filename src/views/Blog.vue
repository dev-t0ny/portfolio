<script setup lang="ts">
import { useBlog } from "../composables/useBlog";
// TypeScript infère automatiquement le type de 'posts' grâce à notre interface Post
const { posts } = useBlog();
</script>

<template>
    <div>
        <h1 class="text-5xl font-light mb-16 text-slate-900 dark:text-slate-100 tracking-tight">
            Journal
        </h1>
        <ul class="space-y-12">
            <li v-for="post in posts" :key="post.slug">
                <router-link
                    :to="{ name: 'post', params: { slug: post.slug } }"
                    class="group block transition-all duration-200"
                >
                    <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-3">
                        <h2
                            class="text-2xl font-light text-slate-900 dark:text-slate-100 group-hover:text-slate-600 dark:group-hover:text-slate-400 transition-colors duration-200"
                        >
                            {{ post.title }}
                        </h2>
                        <span
                            class="text-xs text-slate-400 dark:text-slate-600 font-mono shrink-0"
                            >{{ post.date }}</span
                        >
                    </div>
                    <p class="text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl">
                        {{ post.description }}
                    </p>
                    <div class="mt-3 h-px w-0 bg-slate-900 dark:bg-slate-100 transition-all duration-300 group-hover:w-16" />
                </router-link>
            </li>
        </ul>
    </div>
</template>
