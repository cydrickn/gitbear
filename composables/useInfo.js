import {useState} from '#app'
import {useClient} from "~/composables/useClient";
import {useUtils} from "~/composables/useUtils";

export const useInfo = async (path) => {
    if (!path) {
        const params = useRoute().params;
        path = params.child.join('/');
    }

    const client = useClient();
    const utils = useUtils();
    let infos = useState('info');

    if (!infos.value) {
        infos.value = {};
    }

    if (!infos.value[utils.removeSlash(path)]) {
        const data = await client('/api/info', {params: {path}});
        infos.value[path] = data;
    }

    return infos.value[path];
}