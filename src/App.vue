<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import { RouterLink, RouterView } from "vue-router";

const { t, locale } = useI18n();

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
        class="bg-amber-50 dark:bg-[#181A1B] text-slate-900 dark:text-slate-100 font-mono lowercase min-h-screen transition-colors duration-300 flex flex-col"
    >
        <header
            class="max-w-2xl mx-auto px-6 pt-12 w-full flex justify-between items-end"
        >
            <nav class="flex gap-6">
                <RouterLink
                    to="/"
                    class="text-sm text-slate-500 dark:text-slate-400 hover:text-amber-600 dark:hover:text-amber-400 hover:underline transition-colors"
                    active-class="!text-amber-600 dark:!text-amber-400 underline decoration-2 underline-offset-4"
                >
                    home
                </RouterLink>
                <RouterLink
                    to="/blog"
                    class="text-sm text-slate-500 dark:text-slate-400 hover:text-amber-600 dark:hover:text-amber-400 hover:underline transition-colors"
                    active-class="!text-amber-600 dark:!text-amber-400 underline decoration-2 underline-offset-4"
                >
                    blog
                </RouterLink>
            </nav>

            <div class="flex items-center gap-4">
                <button
                    @click="toggleLocale"
                    class="text-sm text-slate-500 dark:text-slate-400 hover:underline transition-colors"
                >
                    {{ locale === "fr" ? "en" : "fr" }}
                </button>

                <button
                    @click="cycleTheme"
                    class="p-2 rounded-full text-slate-500 dark:text-slate-400 hover:bg-stone-200 dark:hover:bg-slate-800 transition-colors"
                    :title="t('theme_title') || 'Changer le thème'"
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

        <main class="max-w-2xl mx-auto px-6 py-12 w-full flex-grow">
            <router-view v-slot="{ Component }">
                <transition name="fade" mode="out-in">
                    <component :is="Component" />
                </transition>
            </router-view>
        </main>

        <footer
            class="mt-auto border-t border-stone-300 dark:border-slate-700 py-8 max-w-2xl mx-auto w-full"
        >
            <div class="text-center text-sm text-slate-500">
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
    transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
