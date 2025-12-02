<script setup>
import { ref, onMounted, computed, watch } from "vue";
import { useI18n } from "vue-i18n";

const { t, locale, tm } = useI18n();

const toggleLocale = () => {
    const newLocale = locale.value === "fr" ? "en" : "fr";
    locale.value = newLocale;
    localStorage.setItem("locale", newLocale);
};

const theme = ref("light");

const applyTheme = (themeToApply) => {
    if (themeToApply === "dark") {
        localStorage.theme = "dark";
        document.documentElement.classList.add("dark");
    } else {
        localStorage.theme = "light";
        document.documentElement.classList.remove("dark");
    }
};

const cycleTheme = () => {
    const newTheme = theme.value === "light" ? "dark" : "light";
    theme.value = newTheme;
    applyTheme(newTheme);
};

let titleTimeout = null;
let taskIndex = 0;
let charIndex = 0;
let currentTitle = "";
const typingSpeed = 120;
const deletingSpeed = 80;
const pauseDelay = 1500;
const cursor = "█";

const animationTasks = computed(() => [
    { type: "type", text: t("copyright") },
    { type: "pause", ms: pauseDelay },
    { type: "delete", length: t("copyright").length },
    { type: "type", text: t("title.dev") },
    { type: "pause", ms: pauseDelay },
    { type: "type", text: t("title.web") },
    { type: "pause", ms: pauseDelay },
    { type: "delete", length: t("title.web").length },
    { type: "type", text: t("title.software") },
    { type: "pause", ms: pauseDelay },
    { type: "delete", length: (t("title.dev") + t("title.software")).length },
    { type: "pause", ms: 500 },
]);

const runAnimationStep = () => {
    if (titleTimeout) clearTimeout(titleTimeout);

    const task = animationTasks.value[taskIndex];
    let nextTimeout = 0;

    if (task.type === "type") {
        if (charIndex < task.text.length) {
            currentTitle += task.text[charIndex];
            charIndex++;
            nextTimeout = typingSpeed;
        } else {
            taskIndex++;
            charIndex = 0;
            nextTimeout = 50;
        }
    } else if (task.type === "delete") {
        if (charIndex < task.length) {
            currentTitle = currentTitle.substring(0, currentTitle.length - 1);
            charIndex++;
            nextTimeout = deletingSpeed;
        } else {
            taskIndex++;
            charIndex = 0;
            nextTimeout = 50;
        }
    } else if (task.type === "pause") {
        taskIndex++;
        nextTimeout = task.ms;
    }

    if (taskIndex >= animationTasks.value.length) {
        taskIndex = 0;
        charIndex = 0;
        currentTitle = "";
    }

    document.title = currentTitle + cursor;
    titleTimeout = setTimeout(runAnimationStep, nextTimeout);
};

const startTitleAnimation = () => {
    if (titleTimeout) clearTimeout(titleTimeout);
    runAnimationStep();
};

const stopTitleAnimation = () => {
    if (titleTimeout) clearTimeout(titleTimeout);
    document.title = t("copyright");
};

onMounted(() => {
    const savedTheme =
        localStorage.getItem("theme") ||
        (window.matchMedia("(prefers-color-scheme: dark)").matches
            ? "dark"
            : "light");
    theme.value = savedTheme;
    applyTheme(savedTheme);

    const savedLocale = localStorage.getItem("locale") || "fr";
    locale.value = savedLocale;

    startTitleAnimation();

    document.addEventListener("visibilitychange", () => {
        if (document.hidden) {
            stopTitleAnimation();
        } else {
            startTitleAnimation();
        }
    });
});

watch(locale, () => {
    if (titleTimeout) clearTimeout(titleTimeout);
    taskIndex = 0;
    charIndex = 0;
    currentTitle = "";
    startTitleAnimation();
});

const contact = computed(() => tm("contact"));
const experiences = computed(() => tm("experiences"));
const projects = computed(() => tm("projects"));
const education = computed(() => tm("education"));
const distinctions = computed(() => tm("distinctions"));
</script>

<template>
    <div
        class="bg-amber-50 dark:bg-[#181A1B] text-slate-900 dark:text-slate-100 font-mono lowercase min-h-screen transition-colors duration-300"
    >
        <header class="max-w-2xl mx-auto px-6 pt-12">
            <div class="flex justify-end items-center gap-4">
                <button
                    @click="toggleLocale"
                    class="text-sm text-slate-500 dark:text-slate-400 hover:underline transition-colors"
                >
                    {{ locale === "fr" ? "en" : "fr" }}
                </button>

                <button
                    @click="cycleTheme"
                    class="p-2 rounded-full text-slate-500 dark:text-slate-400 hover:bg-stone-200 dark:hover:bg-slate-800 transition-colors"
                    :title="t('theme_title')"
                >
                    <span v-if="theme === 'light'">
                        <svg
                            class="w-5 h-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                            />
                        </svg>
                    </span>
                    <span v-else>
                        <svg
                            class="w-5 h-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                            />
                        </svg>
                    </span>
                </button>
            </div>
        </header>

        <main class="max-w-2xl mx-auto px-6 py-12">
            <section class="mb-16">
                <h1
                    class="text-3xl font-bold text-stone-700 dark:text-amber-200 mb-2"
                >
                    antoine boudreau
                </h1>
                <div
                    class="flex items-center gap-1.5 text-sm text-slate-500 mb-6"
                >
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
                <p class="text-lg text-slate-700 dark:text-slate-300">
                    {{ t("intro") }}
                </p>

                <nav class="flex gap-6 mt-8">
                    <a
                        :href="`mailto:${contact.email}`"
                        class="text-sm text-slate-500 dark:text-slate-400 hover:underline transition-colors"
                        >{{ t("links.email") }}</a
                    >
                    <a
                        :href="contact.github"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="text-sm text-slate-500 dark:text-slate-400 hover:underline transition-colors"
                        >{{ t("links.github") }}</a
                    >
                    <a
                        :href="contact.linkedin"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="text-sm text-slate-500 dark:text-slate-400 hover:underline transition-colors"
                        >{{ t("links.linkedin") }}</a
                    >
                    <a
                        :href="contact.resume_url"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="text-sm text-slate-500 dark:text-slate-400 hover:cursor-pointer hover:underline transition-colors"
                        >{{ t("links.resume") }}</a
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
                <div class="space-y-12">
                    <div
                        v-for="exp in experiences"
                        :key="exp.title"
                        class="group"
                    >
                        <div class="flex justify-between items-baseline mb-1">
                            <h3
                                class="text-lg font-semibold text-stone-700 dark:text-amber-200"
                            >
                                {{ exp.title }}
                            </h3>
                            <span class="text-sm text-slate-500 font-mono">{{
                                exp.period
                            }}</span>
                        </div>

                        <p
                            class="text-slate-700 dark:text-slate-400 mb-3 text-sm italic"
                        >
                            {{ exp.company }}
                        </p>

                        <ul
                            class="list-disc list-outside ml-5 space-y-1 text-slate-700 dark:text-slate-400 mb-4"
                        >
                            <li v-for="duty in exp.duties" :key="duty">
                                {{ duty }}
                            </li>
                        </ul>

                        <div
                            v-if="exp.recommendation"
                            class="mt-4 pl-4 border-l-2 border-stone-300 dark:border-slate-700 text-sm"
                        >
                            <p
                                class="text-slate-500 dark:text-slate-500 font-mono mb-1"
                            >
                                {{ exp.recommendation.text }}
                            </p>
                            <div
                                class="flex gap-3 text-xs font-mono text-slate-400 dark:text-slate-600"
                            >
                                <span>— {{ exp.recommendation.author }}</span>
                                <a
                                    :href="exp.recommendation.url"
                                    target="_blank"
                                    class="underline hover:text-stone-600 dark:hover:text-amber-200 transition-colors"
                                >
                                    [{{ exp.recommendation.file }}]
                                </a>
                            </div>
                        </div>
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
                <ul class="space-y-8">
                    <li v-for="project in projects" :key="project.name">
                        <h3
                            class="text-lg font-semibold text-stone-700 dark:text-amber-200 mb-2"
                        >
                            <a
                                :href="project.url"
                                target="_blank"
                                rel="noopener noreferrer"
                                class="hover:underline"
                            >
                                {{ project.name }}
                            </a>
                        </h3>
                        <p class="text-slate-700 dark:text-slate-400 mb-4">
                            {{ project.description }}
                        </p>
                        <div class="flex flex-wrap gap-2">
                            <span
                                v-for="tech in project.tech"
                                :key="tech"
                                class="text-xs bg-stone-200 text-stone-700 dark:bg-slate-800 dark:text-amber-200 px-2 py-1 rounded-full"
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

            <footer
                class="mt-20 border-t border-stone-300 dark:border-slate-700 pt-8"
            >
                <div class="text-center text-sm text-slate-500">
                    © {{ new Date().getFullYear() }} {{ t("copyright") }}
                </div>
            </footer>
        </main>
    </div>
</template>
