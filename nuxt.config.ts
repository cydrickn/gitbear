import { defineNuxtConfig } from 'nuxt3'

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
    privateRuntimeConfig: {
        GIT_REPO_FOLDER: 'D:\\git-repos'
    },
    // css: ["@/assets/css/styles.css"],
    build: {
        postcss: {
            postcssOptions: {
                plugins: {
                    'tailwindcss/nesting': {},
                    tailwindcss: {},
                    autoprefixer: {},
                },
            },
        },
    },
})
