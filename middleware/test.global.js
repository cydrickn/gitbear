import {useInfo} from "~/composables/useInfo";

export default defineNuxtRouteMiddleware(async (to, from) => {
    const router = useRouter();

    return useInfo(to.path).then((info) => {
        if (to.matched.length === 0) {
            const route = router.getRoutes().find((record) => {
                return record.name === 'project'
            });

            route.aliasOf = [info.path];

            return navigateTo(to.path);
        }
    });
})