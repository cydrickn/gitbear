import {useAsyncData, useState} from '#app'
import {useClient} from "~/composables/useClient";

export const useInfo = async (path) => {
    const client = useClient();
    const repo = useState('info-' + path);

    if (!repo.value) {
        const { data } = await useAsyncData('info-' + path, () => client('/api/info', {params: {path}}));
        repo.value = data;
    }

    return repo;
}