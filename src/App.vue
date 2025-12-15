<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useI18n } from "vue-i18n";
import { RouterLink, RouterView, useRoute } from "vue-router";
import SectionNav from "./components/SectionNav.vue";

const { t, locale } = useI18n();
const route = useRoute();

const showSectionNav = computed(() => route.name === "home");

const toggleLocale = () => {
    const newLocale = locale.value === "fr" ? "en" : "fr";
    locale.value = newLocale;
    localStorage.setItem("locale", newLocale);
};

const theme = ref("light");

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
});
</script>

<template>
    <div
        class="bg-white dark:bg-[#0a0a0a] text-slate-900 dark:text-slate-100 min-h-screen transition-colors duration-500 flex flex-col"
    >
        <header
            class="fixed top-0 left-0 right-0 z-40 backdrop-blur-md bg-white/80 dark:bg-[#0a0a0a]/80 border-b border-slate-100 dark:border-slate-900/50 transition-all duration-300"
        >
            <div class="max-w-6xl mx-auto px-6 lg:px-12 py-4 flex justify-between items-center w-full">
                <nav class="flex gap-8">
                    <RouterLink
                        to="/"
                        class="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors duration-200 relative group"
                        active-class="text-slate-900 dark:text-slate-100"
                    >
                        home
                        <span
                            class="absolute -bottom-1 left-0 w-0 h-0.5 bg-slate-900 dark:bg-slate-100 transition-all duration-300 group-hover:w-full"
                            :class="{ 'w-full': $route.name === 'home' }"
                        />
                    </RouterLink>
                    <RouterLink
                        to="/blog"
                        class="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors duration-200 relative group"
                        active-class="text-slate-900 dark:text-slate-100"
                    >
                        blog
                        <span
                            class="absolute -bottom-1 left-0 w-0 h-0.5 bg-slate-900 dark:bg-slate-100 transition-all duration-300 group-hover:w-full"
                            :class="{ 'w-full': $route.name === 'blog' || $route.name === 'post' }"
                        />
                    </RouterLink>
                </nav>

                <div class="flex items-center gap-3">
                    <button
                        @click="toggleLocale"
                        class="text-xs font-mono text-slate-500 dark:text-slate-500 hover:text-slate-900 dark:hover:text-slate-300 transition-colors duration-200 px-2 py-1 rounded"
                    >
                        {{ locale === "fr" ? "en" : "fr" }}
                    </button>

                    <button
                        @click="cycleTheme"
                        class="p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900 transition-all duration-200"
                        :title="t('theme_title') || 'Changer le thème'"
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

        <main class="pt-20 max-w-3xl mx-auto px-6 lg:px-12 py-16 w-full flex-grow relative pb-24">
            <SectionNav v-if="showSectionNav" />
            <router-view v-slot="{ Component }">
                <transition name="fade" mode="out-in">
                    <component :is="Component" />
                </transition>
            </router-view>
        </main>

        <footer
            class="mt-auto border-t border-slate-100 dark:border-slate-900/50 py-8 max-w-6xl mx-auto w-full px-6 lg:px-12"
        >
            <div class="text-center text-xs text-slate-400 dark:text-slate-600 font-mono">
                © {{ new Date().getFullYear() }}
                {{ t("copyright") || "Antoine Boudreau" }}
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
