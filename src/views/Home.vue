<script setup lang="ts">
import { computed } from "vue";
import { useI18n } from "vue-i18n";

const { t, tm } = useI18n();

// On utilise 'computed' pour que la langue change dynamiquement
// Le 'as any' est nécessaire ici car tm() retourne un type générique
const contact = computed(() => tm("contact") as any);
const experiences = computed(() => tm("experiences") as any[]);
const projects = computed(() => tm("projects") as any[]);
const education = computed(() => tm("education") as string[]);
const distinctions = computed(() => tm("distinctions") as string[]);
</script>

<template>
    <div>
        <section id="intro" class="mb-24 scroll-mt-24">
            <h1
                class="text-5xl font-light text-slate-900 dark:text-slate-100 mb-4 tracking-tight"
            >
                antoine boudreau
            </h1>
            <div class="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-500 mb-8 font-mono">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    class="w-3.5 h-3.5"
                >
                    <path
                        fill-rule="evenodd"
                        d="M8 1.5c-3.04 0-5.5 2.46-5.5 5.5S8 14.5 8 14.5s5.5-4.46 5.5-7.5S11.04 1.5 8 1.5ZM8 9a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"
                        clip-rule="evenodd"
                    />
                </svg>
                <span>{{ t("location") }}</span>
            </div>
            <p
                class="text-lg text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed mb-10 font-light"
            >
                {{ t("intro") }}
            </p>

            <nav class="flex flex-wrap gap-6">
                <a
                    :href="`mailto:${contact.email}`"
                    class="text-sm text-slate-500 dark:text-slate-500 hover:text-slate-900 dark:hover:text-slate-300 transition-colors duration-200 relative group"
                >
                    {{ t("links.email") }}
                    <span class="absolute -bottom-0.5 left-0 w-0 h-px bg-slate-900 dark:bg-slate-300 transition-all duration-300 group-hover:w-full" />
                </a>
                <a
                    :href="contact.github"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="text-sm text-slate-500 dark:text-slate-500 hover:text-slate-900 dark:hover:text-slate-300 transition-colors duration-200 relative group"
                >
                    {{ t("links.github") }}
                    <span class="absolute -bottom-0.5 left-0 w-0 h-px bg-slate-900 dark:bg-slate-300 transition-all duration-300 group-hover:w-full" />
                </a>
                <a
                    :href="contact.linkedin"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="text-sm text-slate-500 dark:text-slate-500 hover:text-slate-900 dark:hover:text-slate-300 transition-colors duration-200 relative group"
                >
                    {{ t("links.linkedin") }}
                    <span class="absolute -bottom-0.5 left-0 w-0 h-px bg-slate-900 dark:bg-slate-300 transition-all duration-300 group-hover:w-full" />
                </a>
                <a
                    :href="contact.resume_url"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="text-sm text-slate-500 dark:text-slate-500 hover:text-slate-900 dark:hover:text-slate-300 transition-colors duration-200 relative group inline-flex items-center gap-1.5"
                >
                    {{ t("links.resume") }}
                    <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    <span class="absolute -bottom-0.5 left-0 w-0 h-px bg-slate-900 dark:bg-slate-300 transition-all duration-300 group-hover:w-full" />
                </a>
            </nav>
        </section>

        <div class="h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-800 to-transparent my-20" />

        <section id="experience" class="mb-24 scroll-mt-24">
            <h2
                class="text-2xl font-light mb-12 text-slate-900 dark:text-slate-100 tracking-tight"
            >
                {{ t("headings.experience") }}
            </h2>
            <div class="space-y-16">
                <div v-for="exp in experiences" :key="exp.title" class="group">
                    <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                        <h3
                            class="text-xl font-normal text-slate-900 dark:text-slate-100"
                        >
                            {{ exp.title }}
                        </h3>
                        <span class="text-xs text-slate-400 dark:text-slate-600 font-mono">{{ exp.period }}</span>
                    </div>
                    <p
                        class="text-slate-600 dark:text-slate-400 mb-4 font-medium text-sm"
                    >
                        {{ exp.company }}
                    </p>
                    <ul
                        class="space-y-2.5 text-slate-600 dark:text-slate-400 text-sm leading-relaxed"
                    >
                        <li v-for="duty in exp.duties" :key="duty" class="flex items-start gap-3">
                            <span class="text-slate-300 dark:text-slate-700 mt-1.5">—</span>
                            <span>{{ duty }}</span>
                        </li>
                    </ul>
                    <div v-if="exp.recommendation" class="mt-6 pt-6 border-t border-slate-100 dark:border-slate-900/50">
                        <a
                            :href="exp.recommendation.url"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="inline-flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 transition-colors duration-200 group"
                        >
                            <span class="font-medium">{{ t("recommendation.title") }}</span>
                            <span class="text-slate-400 dark:text-slate-600">—</span>
                            <span>{{ exp.recommendation.author }}</span>
                            <svg class="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </section>

        <div class="h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-800 to-transparent my-20" />

        <section id="projects" class="mb-24 scroll-mt-24">
            <h2
                class="text-2xl font-light mb-12 text-slate-900 dark:text-slate-100 tracking-tight"
            >
                {{ t("headings.projects") }}
            </h2>
            <ul class="space-y-16">
                <li v-for="project in projects" :key="project.name" class="group">
                    <h3
                        class="text-xl font-normal text-slate-900 dark:text-slate-100 mb-3"
                    >
                        <a
                            :href="project.url"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="hover:text-slate-600 dark:hover:text-slate-400 transition-colors duration-200 relative"
                        >
                            {{ project.name }}
                            <span class="absolute -bottom-0.5 left-0 w-0 h-px bg-slate-900 dark:bg-slate-100 transition-all duration-300 group-hover:w-full" />
                        </a>
                    </h3>
                    <p
                        class="text-slate-600 dark:text-slate-400 mb-5 text-sm leading-relaxed"
                    >
                        {{ project.description }}
                    </p>
                    <div class="flex flex-wrap gap-2">
                        <span
                            v-for="tech in project.tech"
                            :key="tech"
                            class="text-xs bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 px-2.5 py-1 rounded font-mono"
                        >
                            {{ tech }}
                        </span>
                    </div>
                </li>
            </ul>
        </section>

        <div class="h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-800 to-transparent my-20" />

        <section id="education" class="mb-24 scroll-mt-24">
            <h2
                class="text-2xl font-light mb-12 text-slate-900 dark:text-slate-100 tracking-tight"
            >
                {{ t("headings.education") }}
            </h2>
            <ul
                class="space-y-3 text-slate-600 dark:text-slate-400"
            >
                <li v-for="edu in education" :key="edu" class="flex items-start gap-3">
                    <span class="text-slate-300 dark:text-slate-700 mt-1.5">—</span>
                    <span>{{ edu }}</span>
                </li>
            </ul>
        </section>

        <div class="h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-800 to-transparent my-20" />

        <section id="distinctions" class="mb-24 scroll-mt-24">
            <h2
                class="text-2xl font-light mb-12 text-slate-900 dark:text-slate-100 tracking-tight"
            >
                {{ t("headings.distinctions") }}
            </h2>
            <ul
                class="space-y-3 text-slate-600 dark:text-slate-400"
            >
                <li v-for="distinction in distinctions" :key="distinction" class="flex items-start gap-3">
                    <span class="text-slate-300 dark:text-slate-700 mt-1.5">—</span>
                    <span>{{ distinction }}</span>
                </li>
            </ul>
        </section>
    </div>
</template>
