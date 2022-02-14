import { useAsyncData } from '#app'
import {useClient} from "~/composables/useClient";

export const useInfo = async (path) => {
    const client = useClient();

    return useAsyncData('info-' + path, () => client('/api/info', { params: { path } }))
}