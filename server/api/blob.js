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
    const isRaw = params.isRaw || false;

    const git = simpleGit(repoPath);

    const raw = await git.raw(['show', branch + ':' + path]);

    if (isRaw) {
        return raw;
    }

    const lastCommit = await git.raw('log', '--date=iso8601', '--pretty=format:%H\n%aN\n%aE\n%cd\n%s', '-n', '1', branch,  '--', path);
    const [ commit, authorName, authorEmail, timestamp, subject ] = lastCommit.split("\n", 5);

    return {
        commit: {
            hash: commit,
            author: {
                name: authorName,
                email: authorEmail,
            },
            lastUpdate: useUtils().getDuration(timestamp),
            timestamp: timestamp,
            subject,
        },
        content: raw.replaceAll("\r\n", "\n").replaceAll("\r", "\n").split("\n")
    };
}