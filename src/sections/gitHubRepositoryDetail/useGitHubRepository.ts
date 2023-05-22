import { useEffect, useState } from "react";

import { GitHubRepository, RepositoryId } from "../../domain/GitHubRepository";
import { GitHubRepositoryRepository } from "../../domain/GitHubRepositoryRepository";

export const useGitHubRepository = (
	repository: GitHubRepositoryRepository,
	repositoryId: RepositoryId
): { repositoryData: GitHubRepository | undefined } => {
	const [repositoryData, setRepositoryData] = useState<GitHubRepository>();

	useEffect(() => {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
		repository.byId(repositoryId).then((repositoryData: GitHubRepository | undefined) => {
			setRepositoryData(repositoryData);
		});
	}, [repository, repositoryId]);

	return { repositoryData };
};
