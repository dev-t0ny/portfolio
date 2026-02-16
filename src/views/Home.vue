<script setup lang="ts">
import { ref, computed } from "vue";
import { useI18n } from "vue-i18n";

const { t, tm } = useI18n();

// On utilise 'computed' pour que la langue change dynamiquement
// Le 'as any' est nécessaire ici car tm() retourne un type générique
const contact = computed(() => tm("contact") as any);
const experiences = computed(() => tm("experiences") as any[]);
const projects = computed(() => tm("projects") as any[]);
const education = computed(() => tm("education") as string[]);
const distinctions = computed(() => tm("distinctions") as (string | { title: string; description: string })[]);

const openExp = ref<number>(0);
const toggleExp = (index: number) => {
    openExp.value = openExp.value === index ? -1 : index;
};
</script>

<template>
    <div class="space-y-20">
        <section id="intro" class="scroll-mt-24">
            <h1
                class="text-5xl font-light text-slate-800 dark:text-slate-100 mb-4 tracking-tight"
            >
                antoine boudreau
            </h1>
            <div class="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-8 font-mono">
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
                class="text-lg text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed mb-10 font-light"
            >
                {{ t("intro") }}
            </p>

            <nav class="flex flex-wrap gap-6">
                <a
                    :href="`mailto:${contact.email}`"
                    class="text-sm text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-colors duration-200 relative group"
                >
                    {{ t("links.email") }}
                    <span class="absolute -bottom-0.5 left-0 w-0 h-px bg-slate-700 dark:bg-slate-300 transition-all duration-300 group-hover:w-full" />
                </a>
                <a
                    :href="contact.github"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="text-sm text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-colors duration-200 relative group"
                >
                    {{ t("links.github") }}
                    <span class="absolute -bottom-0.5 left-0 w-0 h-px bg-slate-700 dark:bg-slate-300 transition-all duration-300 group-hover:w-full" />
                </a>
                <a
                    :href="contact.linkedin"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="text-sm text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-colors duration-200 relative group"
                >
                    {{ t("links.linkedin") }}
                    <span class="absolute -bottom-0.5 left-0 w-0 h-px bg-slate-700 dark:bg-slate-300 transition-all duration-300 group-hover:w-full" />
                </a>
                <a
                    :href="contact.resume_url"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="text-sm text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-colors duration-200 relative group inline-flex items-center gap-1.5"
                >
                    {{ t("links.resume") }}
                    <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    <span class="absolute -bottom-0.5 left-0 w-0 h-px bg-slate-700 dark:bg-slate-300 transition-all duration-300 group-hover:w-full" />
                </a>
            </nav>
        </section>

        <section id="experience" class="scroll-mt-24">
            <h2
                class="text-2xl font-light mb-10 text-slate-800 dark:text-slate-100 tracking-tight"
            >
                {{ t("headings.experience") }}
            </h2>
            <div class="border-t border-slate-200 dark:border-slate-800/60">
                <div
                    v-for="(exp, index) in experiences"
                    :key="exp.title"
                    class="border-b border-slate-200 dark:border-slate-800/60"
                >
                    <!-- Row header — always visible -->
                    <button
                        @click="toggleExp(index)"
                        :aria-expanded="openExp === index"
                        :aria-controls="`exp-panel-${index}`"
                        class="w-full text-left py-5 flex items-start gap-5 group cursor-pointer"
                    >
                        <span
                            class="font-mono text-xs tabular-nums mt-1 transition-colors duration-300 shrink-0"
                            :class="openExp === index
                                ? 'text-slate-800 dark:text-slate-100'
                                : 'text-slate-300 dark:text-slate-700 group-hover:text-slate-400 dark:group-hover:text-slate-500'"
                        >{{ String(index + 1).padStart(2, '0') }}</span>
                        <div class="flex-1 min-w-0">
                            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-4">
                                <div class="flex items-center gap-2.5">
                                    <img
                                        v-if="exp.website"
                                        :src="`https://www.google.com/s2/favicons?domain=${encodeURIComponent(exp.website)}&sz=64`"
                                        :alt="`${exp.company} logo`"
                                        class="h-4 w-4 shrink-0 [filter:drop-shadow(0_0_1px_rgba(0,0,0,0.45))_drop-shadow(0_0_1px_rgba(255,255,255,0.35))]"
                                        loading="lazy"
                                    />
                                    <h3
                                        class="text-lg font-normal tracking-tight transition-colors duration-300"
                                        :class="openExp === index
                                            ? 'text-slate-800 dark:text-slate-100'
                                            : 'text-slate-500 dark:text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-200'"
                                    >{{ exp.company }}</h3>
                                </div>
                                <span class="text-xs text-slate-400 dark:text-slate-500 font-mono shrink-0">{{ exp.period }}</span>
                            </div>
                            <p
                                class="text-sm mt-0.5 transition-colors duration-300"
                                :class="openExp === index
                                    ? 'text-slate-500 dark:text-slate-400'
                                    : 'text-slate-400 dark:text-slate-600'"
                            >{{ exp.title }}</p>
                        </div>
                        <span
                            class="text-slate-300 dark:text-slate-600 text-xs mt-1.5 shrink-0 transition-transform duration-300"
                            :class="openExp === index ? 'rotate-45' : 'group-hover:text-slate-400 dark:group-hover:text-slate-500'"
                        >+</span>
                    </button>

                    <!-- Expandable detail panel -->
                    <div
                        :id="`exp-panel-${index}`"
                        role="region"
                        class="exp-panel overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
                        :class="openExp === index ? 'exp-panel-open' : 'exp-panel-closed'"
                    >
                        <div class="pl-10 pb-6">
                            <ul class="space-y-2.5 text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                                <li v-for="duty in exp.duties" :key="duty" class="flex items-start gap-3">
                                    <span class="text-slate-300 dark:text-slate-600 mt-1.5">—</span>
                                    <span>{{ duty }}</span>
                                </li>
                            </ul>
                            <div v-if="exp.recommendation" class="mt-5 pt-5 border-t border-slate-100 dark:border-slate-800/60">
                                <a
                                    :href="exp.recommendation.url"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    class="inline-flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300 hover:text-slate-800 dark:hover:text-slate-200 transition-colors duration-200 group"
                                >
                                    <span class="font-medium">{{ t("recommendation.title") }}</span>
                                    <span class="text-slate-400 dark:text-slate-500">—</span>
                                    <span>{{ exp.recommendation.author }}</span>
                                    <svg class="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section id="projects" class="scroll-mt-24">
            <h2
                class="text-2xl font-light mb-10 text-slate-800 dark:text-slate-100 tracking-tight"
            >
                {{ t("headings.projects") }}
            </h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-px bg-slate-200 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800/60">
                <a
                    v-for="project in projects"
                    :key="project.name"
                    :href="project.url"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="project-card group bg-white dark:bg-slate-950 p-6 flex flex-col justify-between transition-colors duration-300 hover:bg-slate-50 dark:hover:bg-slate-900/50"
                >
                    <div>
                        <div class="flex items-center justify-between mb-4">
                            <div class="flex items-center gap-2.5">
                                <img
                                    :src="project.favicon || `https://www.google.com/s2/favicons?domain=${encodeURIComponent(project.url)}&sz=64`"
                                    :alt="`${project.name} favicon`"
                                    class="h-5 w-5 [filter:drop-shadow(0_0_1px_rgba(0,0,0,0.45))_drop-shadow(0_0_1px_rgba(255,255,255,0.35))]"
                                    loading="lazy"
                                />
                                <h3 class="text-lg font-normal text-slate-800 dark:text-slate-100 tracking-tight">
                                    {{ project.name }}
                                </h3>
                            </div>
                            <svg
                                class="w-3.5 h-3.5 text-slate-300 dark:text-slate-700 transition-all duration-300 group-hover:text-slate-500 dark:group-hover:text-slate-400 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                                fill="none" viewBox="0 0 24 24" stroke="currentColor"
                            >
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                        </div>
                        <p class="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                            {{ project.description }}
                        </p>
                    </div>
                    <div class="mt-5 flex flex-wrap gap-1.5">
                        <span
                            v-for="tech in project.tech"
                            :key="tech"
                            class="text-[11px] bg-slate-100 dark:bg-slate-900/70 text-slate-500 dark:text-slate-400 px-2 py-0.5 rounded font-mono"
                        >
                            {{ tech }}
                        </span>
                    </div>
                </a>
            </div>
        </section>

        <section id="education" class="scroll-mt-24">
            <h2
                class="text-2xl font-light mb-10 text-slate-800 dark:text-slate-100 tracking-tight"
            >
                {{ t("headings.education") }}
            </h2>
            <ul
                class="space-y-3 text-slate-600 dark:text-slate-300"
            >
                <li v-for="edu in education" :key="edu" class="flex items-start gap-3">
                    <span class="text-slate-300 dark:text-slate-600 mt-1.5">—</span>
                    <span>{{ edu }}</span>
                </li>
            </ul>
        </section>

        <section id="distinctions" class="scroll-mt-24">
            <h2
                class="text-2xl font-light mb-10 text-slate-800 dark:text-slate-100 tracking-tight"
            >
                {{ t("headings.distinctions") }}
            </h2>
            <ul
                class="space-y-3 text-slate-600 dark:text-slate-300"
            >
                <li v-for="(distinction, index) in distinctions" :key="index" class="flex items-start gap-3">
                    <span class="text-slate-300 dark:text-slate-600 mt-1.5">—</span>
                    <div v-if="typeof distinction === 'object'">
                        <span>{{ distinction.title }}</span>
                        <p class="text-sm text-slate-500 dark:text-slate-400 mt-1 ml-4">{{ distinction.description }}</p>
                    </div>
                    <span v-else>{{ distinction }}</span>
                </li>
            </ul>
        </section>
    </div>
</template>

<style scoped>
.exp-panel {
    display: grid;
    grid-template-rows: 0fr;
    opacity: 0;
}

.exp-panel > div {
    overflow: hidden;
}

.exp-panel-open {
    grid-template-rows: 1fr;
    opacity: 1;
}

.exp-panel-closed {
    grid-template-rows: 0fr;
    opacity: 0;
}
</style>
