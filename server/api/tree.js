import { readdir } from 'fs/promises';
import config from '#config';
import { useQuery } from 'h3'
import simpleGit from "simple-git";

export default async (req, res) => {
    const reposFolder = config.GIT_REPO_FOLDER.trim('/');
    const params = await useQuery(req);
    const branch = params.branch;
    const path = params.path.trim('/');
    const repoPath = [reposFolder, params.repoPath].join('/');

    const git = simpleGit(repoPath);

    const rawFiles = await git.raw(['ls-tree', branch, './' + path]);

    return await Promise.all(rawFiles.trim("\n").split("\n").map(async (file) => {
        const [ rawInfo, name ] = file.split("\t");
        const [ mode, type, hash ] = rawInfo.split(' ');


        const log = await git.raw('log', '--pretty=format:%H\n%aN\n%aE\n%at\n%s', '-n', '1', '--', branch, name);
        const [ commit, authorName, authorEmail, timestamp, subject] = log.split("\n", 5);
        return {
            name: name.split('/').reverse()[0],
            mode,
            type,
            hash,
            commit,
            author: {
                name: authorName,
                email: authorEmail,
            },
            timestamp,
            subject,
            path: name.replace(/\/+/g, '/'),
        };
    })).then(res => {
        return res.sort((a, b) => a.type > b.type ? -1 : (a.type < b.type ? 1 : 0))
    });
}