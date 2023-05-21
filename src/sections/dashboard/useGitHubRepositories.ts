import { useEffect, useState } from "react";

import { GitHubRepository } from "../../domain/GitHubRepository";
import { GitHubRepositoryRepository } from "../../domain/GitHubRepositoryRepository";

export const useGitHubRepositories = (
	repository: GitHubRepositoryRepository,
	repositoryUrls: string[]
): { repositoryData: GitHubRepository[] } => {
	const [repositoryData, setRepositoryData] = useState<GitHubRepository[]>([]);

	useEffect(() => {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
		repository.search(repositoryUrls).then((repositoryData: GitHubRepository[]) => {
			setRepositoryData(repositoryData);
		});
	}, [repository, repositoryUrls]);

	return { repositoryData };
};
