import {useInfo} from "~/composables/useInfo";

export const usePathInfo = async (info, path) => {
    path = path || useRoute().path
    if (!info) {
        info = await useInfo(path);
    }
    const utils = useUtils();

    return {
        repo: info,
        parsedTree: utils.parseTree(info.path, path),
        type: utils.getRouteType(info.path, path),
    }
}