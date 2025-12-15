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
    <div v-if="post">
        <router-link
            to="/blog"
            class="text-xs font-mono text-slate-500 dark:text-slate-500 hover:text-slate-900 dark:hover:text-slate-300 mb-12 block transition-colors duration-200 inline-flex items-center gap-2 group"
        >
            <span class="transition-transform duration-200 group-hover:-translate-x-1">←</span>
            <span>retour</span>
        </router-link>

        <header class="mb-12 pb-8 border-b border-slate-100 dark:border-slate-900/50">
            <h1
                class="text-4xl font-light mb-4 text-slate-900 dark:text-slate-100 tracking-tight"
            >
                {{ post.title }}
            </h1>
            <time class="text-xs font-mono text-slate-400 dark:text-slate-600">{{
                post.date
            }}</time>
        </header>

        <article
            class="prose prose-slate dark:prose-invert max-w-none prose-headings:font-light prose-headings:text-slate-900 dark:prose-headings:text-slate-100 prose-headings:tracking-tight prose-p:text-slate-600 dark:prose-p:text-slate-400 prose-p:leading-relaxed prose-a:text-slate-900 dark:prose-a:text-slate-100 prose-a:no-underline prose-a:border-b prose-a:border-slate-300 dark:prose-a:border-slate-700 hover:prose-a:border-slate-900 dark:hover:prose-a:border-slate-100 prose-a:transition-colors prose-img:rounded-lg prose-img:shadow-lg prose-strong:text-slate-900 dark:prose-strong:text-slate-100 prose-strong:font-medium prose-code:text-slate-900 dark:prose-code:text-slate-100 prose-code:bg-slate-100 dark:prose-code:bg-slate-900 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-pre:bg-slate-50 dark:prose-pre:bg-slate-950 prose-pre:border prose-pre:border-slate-200 dark:prose-pre:border-slate-800"
            v-html="contentHtml"
        ></article>
    </div>

    <div v-else class="text-center py-20">
        <p class="text-slate-600 dark:text-slate-400 mb-4">Article introuvable.</p>
        <router-link to="/blog" class="text-sm text-slate-500 dark:text-slate-500 hover:text-slate-900 dark:hover:text-slate-300 transition-colors duration-200 relative group"
        >
            Retour au blog
            <span class="absolute -bottom-0.5 left-0 w-0 h-px bg-slate-900 dark:bg-slate-300 transition-all duration-300 group-hover:w-full" />
        </router-link>
    </div>
</template>
