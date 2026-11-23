<script setup lang="ts">
import type { Project } from "../types/project";

defineProps<{
    project: Project;
    showPeriodHeading?: boolean;
    showPeriod?: boolean;
}>();

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
</script>

<template>
    <component
        :is="project.url ? 'a' : 'article'"
        :data-project-period="project.period"
        v-bind="getProjectLinkAttrs(project)"
        :class="[
            'block border-b border-slate-200 dark:border-slate-800/60 py-5',
            project.url ? 'group cursor-pointer' : 'cursor-default',
        ]"
    >
        <div class="min-w-0">
            <p
                v-if="showPeriodHeading"
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
                <span v-if="showPeriod">
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
</template>
