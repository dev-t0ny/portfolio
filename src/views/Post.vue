<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import { useBlog, type Post } from "../composables/useBlog";
import MarkdownIt from "markdown-it";

const route = useRoute();
const { posts } = useBlog();
const md = new MarkdownIt({ html: true });

// On cherche l'article. TypeScript sait que 'post' peut être 'undefined' si non trouvé.
const post = computed<Post | undefined>(() => {
    // On s'assure que slug est bien une string
    const slug = route.params.slug as string;
    return posts.find((p) => p.slug === slug);
});

const contentHtml = computed(() =>
    post.value ? md.render(post.value.content) : "",
);
</script>

<template>
    <div v-if="post" class="max-w-2xl mx-auto">
        <router-link
            to="/blog"
            class="text-xs font-mono text-slate-500 hover:text-amber-600 mb-8 block"
            >← retour</router-link
        >

        <header
            class="mb-10 border-b border-stone-200 dark:border-slate-800 pb-6"
        >
            <h1
                class="text-3xl font-bold mb-2 text-stone-800 dark:text-stone-100"
            >
                {{ post.title }}
            </h1>
            <time class="text-xs font-mono text-slate-400">{{
                post.date
            }}</time>
        </header>

        <article
            class="prose prose-slate dark:prose-invert max-w-none prose-headings:font-mono prose-headings:lowercase prose-a:text-amber-600 prose-img:rounded-lg"
            v-html="contentHtml"
        ></article>
    </div>

    <div v-else class="text-center py-20">
        <p>Article introuvable.</p>
        <router-link to="/blog" class="text-amber-600 hover:underline"
            >Retour au blog</router-link
        >
    </div>
</template>
