import { CiStatus, GitHubApiResponses, PullRequest, RepositoryData } from "./GithubApiResponses";

interface RepositoryId {
	organization: string;
	name: string;
}

export class GitHubApiGitHubRepositoryRepository {
	private readonly endpoints = [
		"https://api.github.com/repos/$organization/$name",
		"https://api.github.com/repos/$organization/$name/pulls",
		"https://api.github.com/repos/$organization/$name/actions/runs?page=1&per_page=1",
	];

	constructor(private readonly personalAccessToken: string) {}

	async search(repositoryUrls: string[]): Promise<GitHubApiResponses[]> {
		const responsePromises = repositoryUrls
			.map((url) => this.urlToId(url))
			.map((id) => this.searchBy(id));

		return Promise.all(responsePromises);
	}

	private async searchBy(repositoryId: RepositoryId): Promise<GitHubApiResponses> {
		const repositoryRequest = this.endpoints
			.map((endpoint) => endpoint.replace("$organization", repositoryId.organization))
			.map((endpoint) => endpoint.replace("$name", repositoryId.name))
			.map((url) =>
				fetch(url, {
					headers: { Authorization: `Bearer ${this.personalAccessToken}` },
				})
			);

		return Promise.all(repositoryRequest)
			.then((responses) => Promise.all(responses.map((response) => response.json())))
			.then(([repositoryData, pullRequest, ciStatus]) => ({
				repositoryData: repositoryData as RepositoryData,
				pullRequests: pullRequest as PullRequest[],
				ciStatus: ciStatus as CiStatus,
			}));
	}

	private urlToId(url: string): RepositoryId {
		const splitUrl = url.split("/");

		return {
			name: splitUrl.pop() as string,
			organization: splitUrl.pop() as string,
		};
	}
}
