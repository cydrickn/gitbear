import { useState } from '#app'

export const useCrumbs = () => {
    const get = () => useState('crumbs', () => []);
    const set = (val) => {
        get().value = val || [];
    }

    return {
        get,
        set
    }
}