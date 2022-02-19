import config from '#config';
import {useQuery} from 'h3'
import simpleGit from "simple-git";
import {useUtils} from "~/composables/useUtils";

export default async (req, res) => {
    const reposFolder = config.GIT_REPO_FOLDER.trim('/');
    const params = await useQuery(req);
    const branch = params.branch;
    const path = params.path.trim('/');
    const repoPath = [reposFolder, params.repoPath].join('/');

    const git = simpleGit(repoPath);
    let totalCommits = await git.raw(['rev-list', '--count', branch, '--', useUtils().normalizeUrl('./' + path)]);
    totalCommits = parseInt(totalCommits.trim("\n"));
    const commits = await git.log({maxCount: 20, file: useUtils().normalizeUrl('./' + path), from: branch, strictDate: true});
    commits.all.forEach((commit) => {
        commit.lastUpdate = useUtils().getDuration(commit.date);
    });

    commits.latest.lastUpdate = useUtils().getDuration(commits.latest.date);

    return {
        commits: commits.all,
        latest: commits.latest,
        total: totalCommits,
    };
}