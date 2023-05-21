import { useEffect, useState } from "react";

import { GitHubRepository } from "../../domain/GitHubRepository";
import { GitHubRepositoryRepository } from "../../domain/GitHubRepositoryRepository";

export const useGitHubRepositories = (
	repository: GitHubRepositoryRepository,
	repositoryUrls: string[]
): { repositoryData: GitHubRepository[] } => {
	const [repositoryData, setRepositoryData] = useState<GitHubRepository[]>([]);

	useEffect(() => {
		repository
			.search(repositoryUrls)
			.then((repositoryData: GitHubRepository[]) => {
				setRepositoryData(repositoryData);
			})
			.catch(console.error);
	}, [repository, repositoryUrls]);

	return { repositoryData };
};
