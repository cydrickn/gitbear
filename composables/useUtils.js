export const useUtils = () => {
    const normalizeUrl = (url) => {
        return url.replace(/\/+/g, '/');
    }

    const parseTree = (repoPath, child, type) => {
        repoPath = removeSlash(repoPath  + '/-/' + type);
        const childPath = removeSlash(child).substr(repoPath.length);

        return removeSlash(childPath).split('/');
    }

    const getRouteType = (repoPath, child) => {
        repoPath = removeSlash(repoPath) + '/-/';
        const childPath = removeSlash(child).substr(repoPath.length);
        const paths = removeSlash(childPath).split('/');

        return paths[0];
    }

    const removeSlash = (url) => {
        return normalizeUrl(url).replace(/^\/+|\/+$/gm,'');
    }

    const splitPath = (path) => {
        const currentPaths = [];
        return removeSlash(path).split('/').map((path) => {
            currentPaths.push(path);

            return {
                name: path,
                path: currentPaths.join('/')
            };
        });
    }

    return {
        normalizeUrl,
        parseTree,
        removeSlash,
        getRouteType,
        splitPath
    }
};