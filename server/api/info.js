import {readdir} from 'fs/promises';
import fs from 'fs';
import config from '#config';
import {useQuery} from 'h3'
import simpleGit from "simple-git";
import {useUtils} from "~/composables/useUtils";

export default async (req, res) => {
    const utils = useUtils();
    const reposFolder = config.GIT_REPO_FOLDER;
    const params = await useQuery(req);
    let childrenPath = reposFolder.trim('/');
    let path = params.path || '';
    let pathNames = path.split('/');

    while (!fs.existsSync(childrenPath + '/' + path) && pathNames.length > 0) {
        pathNames.pop();
        path = pathNames.join('/');
    }

    if (path !== '') {
        childrenPath += '/' + path.trim('/');
    }

    const info = { name: pathNames[pathNames.length - 1] };
    const git = simpleGit(childrenPath);
    info.type = ((await git.checkIsRepo('bare')) || (await git.checkIsRepo())) ? 'project' : 'group';
    info.path =utils.normalizeUrl('/' + path);

    if (info.type === 'group') {
        const files = (await readdir(childrenPath, {withFileTypes: true}))
            .filter(file => {
                return file.isDirectory();
            })
            .map(async file => {
                let type = 'group';
                const git = simpleGit(childrenPath + '/' + file.name);
                const isRepo = (await git.checkIsRepo('bare')) || (await git.checkIsRepo())

                if (isRepo) {
                    type = 'project';
                }

                return {name: file.name, path: utils.normalizeUrl('/' + path.trim('/') + '/' + file.name), type}
            });

        info.children = await Promise.all(files);
    } else {
        const branchResult = await git.branchLocal();
        info.branches = branchResult.all;
        info.defaultBranch = branchResult.current;
    }

    return info;
}