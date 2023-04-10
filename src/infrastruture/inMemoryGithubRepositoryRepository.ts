import { githubApiResponses } from "../github_api_responses";

export class inMemoryGithubRepositoryRepository {
	search(): typeof githubApiResponses {
		return githubApiResponses;
	}
}
