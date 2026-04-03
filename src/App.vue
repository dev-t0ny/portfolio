<script setup lang="ts">
import { ref, watch, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import { RouterLink, RouterView } from "vue-router";

const { t, locale } = useI18n();

const toggleLocale = () => {
    const newLocale = locale.value === "fr" ? "en" : "fr";
    locale.value = newLocale;
    localStorage.setItem("locale", newLocale);
};

const theme = ref("dark");

const applyTheme = (themeToApply: string) => {
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
    document.documentElement.lang = savedLocale;
});

watch(locale, (lang) => {
    document.documentElement.lang = lang;
});
</script>

<template>
    <div
        class="bg-[#f8f6f2] text-slate-700 dark:bg-[#111312] dark:text-slate-200 min-h-screen transition-colors duration-500 flex flex-col"
    >
        <header
            class="w-full transition-all duration-300"
        >
            <div class="max-w-3xl mx-auto px-6 lg:px-12 py-6 flex justify-end items-center w-full">
                <div class="flex items-center gap-3">
                    <button
                        @click="toggleLocale"
                        :aria-label="locale === 'fr' ? 'Switch to English' : 'Passer en français'"
                        class="text-xs font-mono text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-colors duration-200 px-2 py-1 rounded"
                    >
                        {{ locale === "fr" ? "en" : "fr" }}
                    </button>
                    <button
                        @click="cycleTheme"
                        class="p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900/70 transition-all duration-200"
                        :title="t('theme_title') || 'Changer le thème'"
                        :aria-label="t('theme_title') || 'Changer le thème'"
                    >
                        <span v-if="theme === 'light'" class="block">
                            <svg
                                class="w-4 h-4"
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
                        <span v-else class="block">
                            <svg
                                class="w-4 h-4"
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
                    </button>
                </div>
            </div>
        </header>

        <main class="max-w-3xl mx-auto px-6 lg:px-12 py-14 w-full flex-grow relative pb-20">
            <router-view v-slot="{ Component }">
                <transition name="fade" mode="out-in">
                    <component :is="Component" />
                </transition>
            </router-view>
        </main>

        <footer
            class="mt-auto border-t border-slate-200 dark:border-slate-800/60 py-8 max-w-3xl mx-auto w-full px-6 lg:px-12"
        >
            <div
                class="grid grid-cols-[1fr_auto_1fr] items-center text-xs text-slate-500 dark:text-slate-400 font-mono"
            >
                <div aria-hidden="true" />
                <div class="text-center">
                    © {{ new Date().getFullYear() }}
                    {{ t("copyright") || "Antoine Boudreau" }}
                </div>
                <a
                    href="https://cellar.antoineboudreau.dev"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="justify-self-end transition-colors duration-200 hover:text-slate-700 dark:hover:text-slate-200"
                >
                    enter my cellar
                </a>
            </div>
        </footer>
    </div>
</template>

<style>
/* Transition douce entre les pages */
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-enter-from {
    opacity: 0;
    transform: translateY(10px);
}

.fade-leave-to {
    opacity: 0;
    transform: translateY(-10px);
}
</style>
