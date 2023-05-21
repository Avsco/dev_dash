import { useEffect, useState } from "react";

import { GitHubRepository, RepositoryId } from "../../domain/GitHubRepository";
import { GitHubRepositoryRepository } from "../../domain/GitHubRepositoryRepository";

export const useGitHubRepository = (
	repository: GitHubRepositoryRepository,
	repositoryId: RepositoryId
): { repositoryData: GitHubRepository | undefined } => {
	const [repositoryData, setRepositoryData] = useState<GitHubRepository>();

	useEffect(() => {
		repository
			.byId(repositoryId)
			.then((repositoryData: GitHubRepository | undefined) => {
				setRepositoryData(repositoryData);
			})
			.catch(console.error);
	}, [repository, repositoryId]);

	return { repositoryData };
};
