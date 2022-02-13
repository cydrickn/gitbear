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

    const rawFiles = await git.raw(['ls-tree', '--name-only', branch, './' + path]);

    return rawFiles.trim("\n").split("\n");
}