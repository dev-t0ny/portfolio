<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const sections = computed(() => [
    { id: "intro", label: "intro" },
    { id: "experience", label: t("headings.experience") },
    { id: "projects", label: t("headings.projects") },
    { id: "education", label: t("headings.education") },
    { id: "distinctions", label: t("headings.distinctions") },
]);

const activeSection = ref<string>("intro");
const isVisible = ref(false);

const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
        const offset = 100;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;

        window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
        });
    }
};

const handleScroll = () => {
    const scrollY = window.scrollY;
    isVisible.value = scrollY > 200;

    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollBottom = scrollY + windowHeight;
    const isNearBottom = documentHeight - scrollBottom < 300; // 300px du bas

    // Position du centre du viewport
    const viewportCenter = scrollY + windowHeight / 2;

    // Détecter la section active
    let bestMatch: { id: string; distance: number } | null = null;

    for (let i = 0; i < sections.value.length; i++) {
        const sectionData = sections.value[i];
        if (!sectionData) continue;
        
        const section = document.getElementById(sectionData.id);
        if (section) {
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;
            const sectionRect = section.getBoundingClientRect();
            
            // Vérifier si la section est visible dans le viewport
            const isSectionVisible = sectionRect.top < windowHeight && sectionRect.bottom > 0;
            
            // Vérifier si le centre du viewport est dans la section
            const isInSection = viewportCenter >= sectionTop && viewportCenter <= sectionBottom;
            
            // Pour la dernière section, aussi l'activer si on est proche du bas
            const isLastSection = i === sections.value.length - 1;
            const shouldActivate = isLastSection && isNearBottom;
            
            if (isInSection || (isSectionVisible && scrollY + 100 >= sectionTop)) {
                // Calculer la distance du centre du viewport au centre de la section
                const sectionCenter = sectionTop + section.offsetHeight / 2;
                const distance = Math.abs(viewportCenter - sectionCenter);
                
                if (!bestMatch || distance < bestMatch.distance) {
                    bestMatch = { id: sectionData.id, distance };
                }
            }
            
            // Activer la dernière section si on est proche du bas
            if (shouldActivate) {
                bestMatch = { id: sectionData.id, distance: 0 };
            }
        }
    }

    if (bestMatch) {
        activeSection.value = bestMatch.id;
    } else if (isNearBottom && sections.value.length > 0) {
        // Fallback: si on est proche du bas, activer la dernière section
        const lastSection = sections.value[sections.value.length - 1];
        if (lastSection) {
            activeSection.value = lastSection.id;
        }
    }
};

onMounted(() => {
    window.addEventListener("scroll", handleScroll);
    handleScroll();
});

onUnmounted(() => {
    window.removeEventListener("scroll", handleScroll);
});
</script>

<template>
    <nav
        :class="[
            'hidden lg:block fixed right-6 xl:right-12 top-1/2 -translate-y-1/2 z-50 transition-all duration-500',
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4 pointer-events-none',
        ]"
    >
        <div class="flex flex-col gap-3 items-end">
            <div
                v-for="section in sections"
                :key="section.id"
                class="flex items-center gap-3 group cursor-pointer"
                @click="scrollToSection(section.id)"
            >
                <span
                    :class="[
                        'text-xs font-mono text-slate-500 dark:text-slate-500 transition-all duration-300',
                        activeSection === section.id
                            ? 'text-slate-800 dark:text-slate-200 scale-110'
                            : 'group-hover:text-slate-700 dark:group-hover:text-slate-400',
                    ]"
                >
                    {{ section.label }}
                </span>
                <div
                    :class="[
                        'w-1.5 h-1.5 rounded-full transition-all duration-300',
                        activeSection === section.id
                            ? 'bg-slate-700 dark:bg-slate-200 w-2 h-2'
                            : 'bg-slate-300 dark:bg-slate-600 group-hover:bg-slate-400 dark:group-hover:bg-slate-500',
                    ]"
                />
            </div>
        </div>
    </nav>
</template>
