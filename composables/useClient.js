import { useNuxtApp } from '#app'

export const useClient = () => {
    const nuxt = useNuxtApp();

    return async (url, options) => {
        let headers = {};
        options= options || {};
        
        try {
            return await $fetch(url, {
                retry: 0,
                ...options,
                headers: {
                    ...headers,
                    ...(options.headers || {})
                }
            });
        } catch (err) {
            nuxt.hooks.callHook('error', err.data);
            throw err
        }
    };
}