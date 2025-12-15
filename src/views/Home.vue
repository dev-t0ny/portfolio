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
        <section class="mb-16">
            <h1
                class="text-3xl font-bold text-stone-700 dark:text-amber-200 mb-2"
            >
                antoine boudreau
            </h1>
            <div class="flex items-center gap-1.5 text-sm text-slate-500 mb-6">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    class="w-4 h-4"
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
                class="text-lg text-slate-700 dark:text-slate-300 max-w-3xl leading-relaxed"
            >
                {{ t("intro") }}
            </p>

            <nav class="flex gap-6 mt-8">
                <a
                    :href="`mailto:${contact.email}`"
                    class="text-sm text-slate-500 dark:text-slate-400 hover:text-amber-600 dark:hover:text-amber-400 hover:underline transition-colors"
                    >{{ t("links.email") }}</a
                >
                <a
                    :href="contact.github"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="text-sm text-slate-500 dark:text-slate-400 hover:text-amber-600 dark:hover:text-amber-400 hover:underline transition-colors"
                    >{{ t("links.github") }}</a
                >
                <a
                    :href="contact.linkedin"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="text-sm text-slate-500 dark:text-slate-400 hover:text-amber-600 dark:hover:text-amber-400 hover:underline transition-colors"
                    >{{ t("links.linkedin") }}</a
                >
            </nav>
        </section>

        <hr class="border-stone-300 dark:border-slate-700" />

        <section class="my-12">
            <h2
                class="text-2xl font-bold mb-8 text-slate-900 dark:text-slate-100"
            >
                {{ t("headings.experience") }}
            </h2>
            <div class="space-y-10">
                <div v-for="exp in experiences" :key="exp.title">
                    <h3
                        class="text-lg font-semibold text-stone-700 dark:text-amber-200"
                    >
                        {{ exp.title }}
                    </h3>
                    <span class="text-sm text-slate-500 font-mono">{{
                        exp.period
                    }}</span>
                    <p
                        class="text-slate-700 dark:text-slate-400 mb-3 mt-1 font-medium"
                    >
                        {{ exp.company }}
                    </p>
                    <ul
                        class="list-disc list-outside ml-5 space-y-1 text-slate-700 dark:text-slate-400 text-sm leading-relaxed"
                    >
                        <li v-for="duty in exp.duties" :key="duty">
                            {{ duty }}
                        </li>
                    </ul>
                </div>
            </div>
        </section>

        <hr class="border-stone-300 dark:border-slate-700" />

        <section class="my-12">
            <h2
                class="text-2xl font-bold mb-8 text-slate-900 dark:text-slate-100"
            >
                {{ t("headings.projects") }}
            </h2>
            <ul class="space-y-10">
                <li v-for="project in projects" :key="project.name">
                    <h3
                        class="text-lg font-semibold text-stone-700 dark:text-amber-200 mb-2"
                    >
                        <a
                            :href="project.url"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="hover:underline decoration-2 underline-offset-4"
                        >
                            {{ project.name }}
                        </a>
                    </h3>
                    <p
                        class="text-slate-700 dark:text-slate-400 mb-4 text-sm leading-relaxed"
                    >
                        {{ project.description }}
                    </p>
                    <div class="flex flex-wrap gap-2">
                        <span
                            v-for="tech in project.tech"
                            :key="tech"
                            class="text-xs bg-stone-200 text-stone-700 dark:bg-slate-800 dark:text-amber-200 px-2 py-1 rounded-md font-mono"
                        >
                            {{ tech }}
                        </span>
                    </div>
                </li>
            </ul>
        </section>

        <hr class="border-stone-300 dark:border-slate-700" />

        <section class="my-12">
            <h2
                class="text-2xl font-bold mb-8 text-slate-900 dark:text-slate-100"
            >
                {{ t("headings.education") }}
            </h2>
            <ul
                class="list-disc list-outside ml-5 space-y-3 text-slate-700 dark:text-slate-400"
            >
                <li v-for="edu in education" :key="edu">
                    {{ edu }}
                </li>
            </ul>
        </section>

        <hr class="border-stone-300 dark:border-slate-700" />

        <section class="my-12">
            <h2
                class="text-2xl font-bold mb-8 text-slate-900 dark:text-slate-100"
            >
                {{ t("headings.distinctions") }}
            </h2>
            <ul
                class="list-disc list-outside ml-5 space-y-3 text-slate-700 dark:text-slate-400"
            >
                <li v-for="distinction in distinctions" :key="distinction">
                    <span>{{ distinction }}</span>
                </li>
            </ul>
        </section>
    </div>
</template>
