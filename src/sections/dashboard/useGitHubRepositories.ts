import { useEffect, useState } from "react";

import { GitHubRepository } from "../../domain/GitHubRepository";
import { GithubRepositoryRepository } from "../../domain/GitHubRepositoryRepository";

export const useGitHubRepositories = (
	repository: GithubRepositoryRepository,
	repositoryUrls: string[]
): { repositoryData: GitHubRepository[] } => {
	const [repositoryData, setRepositoryData] = useState<GitHubRepository[]>([]);

	useEffect(() => {
		repository
			.search(repositoryUrls)
			.then((repositoryData) => {
				setRepositoryData(repositoryData);
			})
			.catch(console.error);
	}, [repository, repositoryUrls]);

	return { repositoryData };
};
