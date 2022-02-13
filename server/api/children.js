import { readdir } from 'fs/promises';
import config from '#config';
import { useQuery } from 'h3'
import simpleGit from "simple-git";

export default async (req, res) => {
    const reposFolder = config.GIT_REPO_FOLDER;
    const params = await useQuery(req);
    let childrenPath = reposFolder.trim('/');
    const path = params.path || '';

    if (path !== '') {
        childrenPath += '/' + path.trim('/');
    }

    try {

        const files = (await readdir(childrenPath,  { withFileTypes: true }))
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

                return { name: file.name, path: path.trim('/') + '/' + file.name, type }
            });

        return await Promise.all(files);
    } catch (err) {
        throw err;
    }
}