import config from '#config';
import {useQuery} from 'h3'
import simpleGit from "simple-git";

export default async (req, res) => {
    const reposFolder = config.GIT_REPO_FOLDER.trim('/');
    const params = await useQuery(req);
    const branch = params.branch;
    const path = params.path.trim('/');
    const repoPath = [reposFolder, params.repoPath].join('/');
    const isRaw = params.isRaw || false;

    const git = simpleGit(repoPath);

    const raw = await git.raw(['show', branch + ':' + path]);

    if (isRaw) {
        return raw;
    }

    return {
        content: raw.replaceAll("\r\n", "\n").replaceAll("\r", "\n").split("\n")
    };
}