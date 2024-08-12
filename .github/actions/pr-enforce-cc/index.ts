// Extarcts the added commits and prints them
import * as core from "@actions/core";
import { context, getOctokit } from "@actions/github";

const VALID_EMOJI = "✅";
const INVALID_EMOJI = "❌";

const ALLOWED_COMMIT_TYPES = [
    "fix",
    "feat",
    "chore",
    "docs",
    "style",
    "refactor",
    "perf",
    "test",
    "build",
    "ci",
    "revert",
];

const ALLOWED_COMMITS_REGEX = new RegExp(
    `^(${ALLOWED_COMMIT_TYPES.join("|")})\\!?(\\(.+\\))?:\\s*.+`
);

const run = async () => {
    if (context.eventName !== "pull_request") {
        core.setFailed("This action is only supported for pull requests");
        return;
    }

    const prNumber = context.payload.pull_request!.number;

    const [validCommits, invalidCommits]: [string[], string[]] =
        await getOctokit(core.getInput("token"))
            .rest.pulls.listCommits({
                owner: context.repo.owner,
                repo: context.repo.repo,
                pull_number: prNumber,
            })
            .then(({ data }) => {
                return data.reduce(
                    (acc, { commit }) => {
                        const message = commit.message;
                        const valid = isCommitValid(message);

                        core.info(
                            `${valid ? VALID_EMOJI : INVALID_EMOJI} ${message}`
                        );
                        acc[valid ? 0 : 1].push(message);

                        return acc;
                    },
                    [[], []] as [string[], string[]]
                );
            });

    core.info(`Valid commits: ${validCommits.length}`);
    core.info(`Invalid commits: ${invalidCommits.length}`);

    const isValid = invalidCommits.length === 0;

    core.setOutput("valid", isValid);
    core.setOutput("valid_commits", validCommits);
    core.setOutput("invalid_commits", invalidCommits);

    if (isValid) core.info(`${VALID_EMOJI} All commits are valid`);
    else
        core.setFailed(
            `${INVALID_EMOJI} ${invalidCommits.length} invalid commits found`
        );
};

const isCommitValid = (commit: string) => {
    return ALLOWED_COMMITS_REGEX.test(commit.trim());
};

run().catch((error) => core.setFailed(error.message));
