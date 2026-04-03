<script setup lang="ts">
import { ref, computed, nextTick, watch, onMounted, onBeforeUnmount } from "vue";
import { useI18n } from "vue-i18n";

const { t, tm } = useI18n();

type ProjectSortDirection = "asc" | "desc";
type ProjectSortMode = "chronology" | "difficulty";

type Project = {
    order: number;
    name: string;
    period: string;
    impact: string;
    impactScore: number;
    difficultyScore: number;
    description: string;
    tech: string[];
    url?: string;
    favicon?: string;
};

// On utilise 'computed' pour que la langue change dynamiquement
// Le 'as any' est nécessaire ici car tm() retourne un type générique
const contact = computed(() => tm("contact") as any);
const experiences = computed(() => tm("experiences") as any[]);
const projects = computed(() => tm("projects") as Project[]);
const education = computed(() => tm("education") as string[]);
const distinctions = computed(() => tm("distinctions") as any[]);

const openExp = ref<number>(0);
const projectsSection = ref<HTMLElement | null>(null);
const activeProjectPeriod = ref("");
const projectSortDirection = ref<ProjectSortDirection>("asc");
const projectSortMode = ref<ProjectSortMode>("chronology");

const toggleExp = (index: number) => {
    openExp.value = openExp.value === index ? -1 : index;
};

const toggleProjectOrder = () => {
    projectSortDirection.value =
        projectSortDirection.value === "asc" ? "desc" : "asc";
};

const toggleProjectSortMode = () => {
    if (projectSortMode.value === "chronology") {
        projectSortMode.value = "difficulty";
        projectSortDirection.value = "desc";
    } else {
        projectSortMode.value = "chronology";
        projectSortDirection.value = "asc";
    }
};

const shouldDisplayProjectPeriod = (_projectIndex: number) => {
    return false;
};

const sortedProjects = computed(() => {
    const direction = projectSortDirection.value === "asc" ? 1 : -1;

    return [...projects.value].sort((left, right) => {
        const baseSort =
            projectSortMode.value === "chronology"
                ? left.order - right.order
                : left.impactScore - right.impactScore;

        if (baseSort !== 0) {
            return baseSort * direction;
        }

        return (left.order - right.order) * direction;
    });
});

const syncActiveProjectPeriod = () => {
    if (projectSortMode.value !== "chronology") {
        return;
    }

    const projectCards = projectsSection.value?.querySelectorAll<HTMLElement>(
        "[data-project-period]",
    );

    if (!projectCards?.length) {
        return;
    }

    const firstProjectCard = projectCards.item(0);

    if (!firstProjectCard) {
        return;
    }

    const switchOffset = window.innerHeight * 0.25 + 24;
    let currentPeriod = firstProjectCard.dataset.projectPeriod || "";

    projectCards.forEach((projectCard) => {
        if (projectCard.getBoundingClientRect().top <= switchOffset) {
            currentPeriod = projectCard.dataset.projectPeriod || currentPeriod;
        }
    });

    activeProjectPeriod.value = currentPeriod;
};

const uniqueProjectPeriods = computed(() => {
    const periods = new Set(projects.value.map((p: Project) => p.period));
    return [...periods].sort();
});

const getProjectLinkAttrs = (project: Project) =>
    project.url
        ? { href: project.url, target: "_blank", rel: "noopener noreferrer" }
        : {};

const getProjectFavicon = (project: Project) => {
    if (project.favicon) {
        return project.favicon;
    }

    if (project.url) {
        return `https://www.google.com/s2/favicons?domain=${encodeURIComponent(project.url)}&sz=64`;
    }

    return "";
};

watch(
    sortedProjects,
    async (projectList) => {
        activeProjectPeriod.value = projectList[0]?.period ?? "";
        await nextTick();
        syncActiveProjectPeriod();
    },
    { immediate: true },
);

onMounted(() => {
    window.addEventListener("scroll", syncActiveProjectPeriod, {
        passive: true,
    });
    window.addEventListener("resize", syncActiveProjectPeriod);
    syncActiveProjectPeriod();
});

onBeforeUnmount(() => {
    window.removeEventListener("scroll", syncActiveProjectPeriod);
    window.removeEventListener("resize", syncActiveProjectPeriod);
});
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

        <section id="projects" ref="projectsSection" class="scroll-mt-24">
            <div class="mb-10">
                <h2
                    class="text-2xl font-light text-slate-800 dark:text-slate-100 tracking-tight"
                >
                    {{ t("headings.projects") }}
                </h2>

                <div class="mt-3 flex items-start justify-between gap-4">
                    <p
                        class="max-w-xl text-sm text-slate-500 dark:text-slate-400 leading-relaxed"
                    >
                        {{ t("projects_intro") }}
                    </p>

                    <div class="flex shrink-0 items-center gap-2">
                        <button
                            type="button"
                            @click="toggleProjectSortMode"
                            :aria-label="t('project_sort.toggle_mode')"
                            :title="t('project_sort.toggle_mode')"
                            class="font-mono text-[11px] uppercase tracking-[0.14em] text-slate-400 dark:text-slate-500 transition-colors duration-200 hover:text-slate-700 dark:hover:text-slate-300"
                        >
                            {{ projectSortMode === "chronology"
                                ? t("project_sort.chronology")
                                : t("project_sort.difficulty") }}
                        </button>

                        <button
                            type="button"
                            @click="toggleProjectOrder"
                            :aria-label="projectSortDirection === 'asc'
                                ? t('project_sort.ascending')
                                : t('project_sort.descending')"
                            :title="projectSortDirection === 'asc'
                                ? t('project_sort.ascending')
                                : t('project_sort.descending')"
                            class="p-0.5 text-slate-500 dark:text-slate-400 transition-colors duration-200 hover:text-slate-800 dark:hover:text-slate-200"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="1.8"
                                stroke="currentColor"
                                :class="[
                                    'h-4 w-4 transition-transform duration-300',
                                    projectSortDirection === 'desc' ? 'rotate-180' : '',
                                ]"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M12 19V5m0 0-4 4m4-4 4 4"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            <div
                v-if="projectSortMode === 'chronology'"
                class="sticky top-[25vh] z-10 bg-[#f8f6f2]/95 py-3 backdrop-blur-sm dark:bg-[#111312]/95"
            >
                <div class="flex items-center gap-4">
                    <button
                        v-for="period in uniqueProjectPeriods"
                        :key="period"
                        type="button"
                        @click="activeProjectPeriod = period"
                        :class="[
                            'font-mono text-xs uppercase tracking-[0.24em] transition-all duration-300 relative pb-1',
                            activeProjectPeriod === period
                                ? 'text-slate-800 dark:text-slate-100'
                                : 'text-slate-300 dark:text-slate-700 hover:text-slate-400 dark:hover:text-slate-500',
                        ]"
                    >
                        {{ period }}
                        <span
                            :class="[
                                'absolute bottom-0 left-0 h-px transition-all duration-300',
                                activeProjectPeriod === period
                                    ? 'w-full bg-slate-800 dark:bg-slate-100'
                                    : 'w-0 bg-slate-400 dark:bg-slate-500',
                            ]"
                        />
                    </button>
                </div>
            </div>

            <TransitionGroup
                tag="div"
                move-class="project-card-move"
                class="grid grid-cols-1 md:grid-cols-2 md:gap-x-10"
            >
                <component
                    v-for="(project, projectIndex) in sortedProjects"
                    :is="project.url ? 'a' : 'article'"
                    :key="project.name"
                    :data-project-period="project.period"
                    v-bind="getProjectLinkAttrs(project)"
                    :class="[
                        'block border-b border-slate-200 dark:border-slate-800/60 py-5',
                        project.url ? 'group cursor-pointer' : 'cursor-default',
                    ]"
                >
                    <div class="min-w-0">
                        <p
                            v-if="shouldDisplayProjectPeriod(projectIndex)"
                            class="mb-3 font-mono text-xs uppercase tracking-[0.24em] text-slate-400 dark:text-slate-500"
                        >
                            {{ project.period }}
                        </p>

                            <div class="flex items-start justify-between gap-4">
                                <div class="flex items-center gap-2.5">
                                    <img
                                        v-if="getProjectFavicon(project)"
                                        :src="getProjectFavicon(project)"
                                        :alt="`${project.name} favicon`"
                                        class="h-4 w-4 shrink-0 [filter:drop-shadow(0_0_1px_rgba(0,0,0,0.45))_drop-shadow(0_0_1px_rgba(255,255,255,0.35))]"
                                        loading="lazy"
                                    />
                                    <h3
                                        :class="[
                                            'text-lg font-normal tracking-tight transition-colors duration-300 text-slate-500 dark:text-slate-400',
                                            project.url ? 'group-hover:text-slate-800 dark:group-hover:text-slate-100' : '',
                                        ]"
                                    >{{ project.name }}</h3>
                                </div>
                                <svg
                                    v-if="project.url"
                                    class="mt-1 w-3.5 h-3.5 shrink-0 text-slate-300 dark:text-slate-600 transition-colors duration-300 group-hover:text-slate-400 dark:group-hover:text-slate-500"
                                    fill="none" viewBox="0 0 24 24" stroke="currentColor"
                                >
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                </svg>
                            </div>

                            <div class="mt-1 flex flex-wrap items-center gap-x-3 gap-y-2 text-[11px] font-mono text-slate-400 dark:text-slate-500">
                                <span v-if="projectSortMode === 'difficulty'">
                                    {{ project.period }}
                                </span>
                                <div class="flex items-center gap-1.5">
                                    <div class="flex items-center gap-0.5" aria-hidden="true">
                                        <span
                                            v-for="impactLevel in 5"
                                            :key="impactLevel"
                                            :class="[
                                                'h-1.5 w-1.5 rounded-full',
                                                impactLevel <= project.impactScore
                                                    ? 'bg-slate-500 dark:bg-slate-400'
                                                    : 'bg-slate-200 dark:bg-slate-800',
                                            ]"
                                        />
                                    </div>
                                    <span>{{ project.impact }}</span>
                                </div>
                            </div>

                            <p
                                :class="[
                                    'text-sm mt-2 text-slate-400 dark:text-slate-600 transition-colors duration-300 leading-relaxed',
                                    project.url ? 'group-hover:text-slate-500 dark:group-hover:text-slate-400' : '',
                                ]"
                            >
                                {{ project.description }}
                            </p>

                            <div class="mt-3 flex flex-wrap gap-1.5">
                                <span
                                    v-for="tech in project.tech"
                                    :key="tech"
                                    class="text-[11px] bg-slate-100 dark:bg-slate-900/70 text-slate-500 dark:text-slate-400 px-2 py-0.5 rounded font-mono"
                                >
                                    {{ tech }}
                                </span>
                            </div>
                    </div>
                </component>
            </TransitionGroup>
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
                    <div v-if="typeof distinction === 'object' && distinction.linkLabel">
                        <span>{{ distinction.text.split('{0}')[0] }}</span><a
                            :href="distinction.url"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="text-slate-800 dark:text-slate-200 underline underline-offset-3 decoration-slate-400 dark:decoration-slate-500 hover:decoration-slate-600 dark:hover:decoration-slate-300 transition-colors duration-200"
                        >{{ distinction.linkLabel }}</a><span>{{ distinction.text.split('{0}')[1] }}</span>
                        <a v-if="distinction.secondaryUrl" :href="distinction.secondaryUrl" target="_blank" rel="noopener noreferrer" class="ml-2 inline-flex items-center gap-1 text-sm text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 transition-colors duration-200"><svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>{{ distinction.secondaryLinkLabel }}</a>
                        <p v-if="distinction.description" class="text-sm text-slate-500 dark:text-slate-400 mt-1 ml-4">{{ distinction.description }}</p>
                    </div>
                    <div v-else-if="typeof distinction === 'object'">
                        <span>{{ distinction.title }}</span>
                        <p v-if="distinction.description" class="text-sm text-slate-500 dark:text-slate-400 mt-1 ml-4">{{ distinction.description }}</p>
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

.project-card-move {
    transition: transform 650ms cubic-bezier(0.16, 1, 0.3, 1);
}

</style>
