import { defineNuxtConfig } from 'nuxt3'

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
    privateRuntimeConfig: {
        GIT_REPO_FOLDER: process.env.GIT_REPO_FOLDER
    },
    css: [
        "@fortawesome/fontawesome-free/css/all.min.css",
    ],
    buildModules: ['@nuxtjs/tailwindcss'],
    tailwindcss: {
        cssPath: '~/assets/tailwind.scss',
    }
    // build: {
    //     postcss: {
    //         postcssOptions: {
    //             plugins: {
    //                 'postcss-import': {},
    //                 'tailwindcss/nesting': {},
    //                 tailwindcss: {},
    //                 autoprefixer: {},
    //             },
    //         },
    //     },
    // },
})
