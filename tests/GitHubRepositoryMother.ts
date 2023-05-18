import { faker } from "@faker-js/faker";

import { GitHubRepository } from "../src/domain/GitHubRepository";

export class GitHubARepositoryMother {
	static create(params?: Partial<GitHubRepository>): GitHubRepository {
		const defaultParams: GitHubRepository = {
			id: {
				organization: faker.company.name(),
				name: faker.string.alpha(),
			},
			description: faker.string.alpha(10),
			url: faker.internet.url(),
			private: faker.datatype.boolean(),
			forks: faker.number.int(),
			hasWorkflows: faker.datatype.boolean(),
			isLastWorkflowSuccess: faker.datatype.boolean(),
			stars: faker.number.int({ min: 1, max: 5 }),
			issues: faker.number.int(),
			pullRequests: faker.number.int(),
			updatedAt: faker.date.anytime(),
			watchers: faker.number.int(),
			...params,
		};

		return defaultParams;
	}
}
