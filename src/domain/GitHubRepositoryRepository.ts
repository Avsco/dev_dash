import { GitHubRepository } from "./GitHubRepository";

export interface GithubRepositoryRepository {
	search(repositoryUrls: string[]): Promise<GitHubRepository[]>;
}
