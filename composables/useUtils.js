import moment from 'moment-timezone';

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
                path: normalizeUrl('/' + currentPaths.join('/'))
            };
        });
    }

    const getDuration = (date) => {
        const now = moment([]);
        const lastUpdate = moment(date);

        const pluralized = (count, string) => {
            return count > 1 ? string + 's' : string;
        }

        const diff = {
            year: now.diff(lastUpdate, 'years'),
            month: now.diff(lastUpdate, 'months'),
            week: now.diff(lastUpdate, 'weeks'),
            day: now.diff(lastUpdate, 'days'),
            hour: now.diff(lastUpdate, 'hours'),
            minute: now.diff(lastUpdate, 'minutes'),
            second: now.diff(lastUpdate, 'seconds'),
        }

        let diffString = '';

        for (let i in diff) {
            if (diff[i] >= 1) {
                if (i === 'second') {
                    diffString = 'a few seconds';
                } else {
                    diffString = diff[i] + ' ' + pluralized(diff[i], i);
                }
                break;
            }
        }

        return diffString + ' ago';
    }

    const formatDate = (date, format) => {
        format = format || 'MMM D, YYYY h:mm A Z';

        return moment(date).format(format);
    }

    return {
        normalizeUrl,
        parseTree,
        removeSlash,
        getRouteType,
        splitPath,
        formatDate,
        getDuration,
    }
};