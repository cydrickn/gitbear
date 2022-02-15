import { useState } from '#app'
import {useInfo} from "~/composables/useInfo";
import {useUtils} from "~/composables/useUtils";
import {useCrumbsItems} from "~/composables/useCrumbsItems";

export const useCrumbs = () => {
    const crumbs = useCrumbsItems();

    const set = async () => {
        const params = useRoute().params;
        if (params.child) {
            const path = params.child.join('/');
            const info = await useInfo(path);
            crumbs.value = useUtils().splitPath(info.path);
        } else {
            crumbs.value = [];
        }
    }

    return {
        set
    }
}