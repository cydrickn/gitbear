import { readdir } from 'fs/promises';
import config from '#config';
import { useQuery } from 'h3'
import simpleGit from "simple-git";

export default async (req, res) => {
    const reposFolder = config.GIT_REPO_FOLDER;
    const params = await useQuery(req);
    let childrenPath = reposFolder.trim('/');
    const path = params.path || '';
    const pathNames = path.split('/');

    if (path !== '') {
        childrenPath += '/' + path.trim('/');
    }

    try {
        const info = { name: pathNames[pathNames.length - 1] };
        const git = simpleGit(childrenPath);
        info.type = (await git.checkIsRepo('bare')) ? 'project' : 'group';

        if (info.type === 'group') {
            const files = (await readdir(childrenPath, {withFileTypes: true}))
                .filter(file => {
                    return file.isDirectory();
                })
                .map(async file => {
                    let type = 'group';
                    const git = simpleGit(childrenPath + '/' + file.name);
                    const isRepo = await git.checkIsRepo('bare');

                    if (isRepo) {
                        type = 'project';
                    }

                    return {name: file.name, path: '/' + path.trim('/') + '/' + file.name, type}
                });

            info.children = await Promise.all(files);
        }

        return info;
    } catch (err) {
        throw err;
    }
}