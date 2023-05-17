import { render, screen } from "@testing-library/react";
import { mock } from "jest-mock-extended";

import { GitHubRepository } from "../src/domain/GitHubRepository";
import { Dashboard } from "../src/sections/dashboard/Dashboard";
import { GitHubARepositoryMother } from "./GitHubRepositoryMother";
import { GithubRepositoryRepository } from "../src/domain/GitHubRepositoryRepository";

const mockRepository = mock<GithubRepositoryRepository>();

describe("Dashboard section", () => {
	it("show all widgets", async () => {
		const gitHubRepository: GitHubRepository = GitHubARepositoryMother.create();

		mockRepository.search.mockResolvedValue([gitHubRepository]);

		render(<Dashboard repository={mockRepository} />);

		const title = await screen.findByRole("heading", {
			name: new RegExp("DevDash_", "i"),
		});

		const firstWidgetTitle = `${gitHubRepository.id.organization}/${gitHubRepository.id.name}`;
		const firstWidgetHeader = await screen.findByRole("heading", {
			name: new RegExp(firstWidgetTitle, "i"),
		});

		expect(title).toBeInTheDocument();
		expect(firstWidgetHeader).toBeInTheDocument();
	});

	it("show not results message when there are no widgets", async () => {
		mockRepository.search.mockResolvedValue([]);

		render(<Dashboard repository={mockRepository} />);
		const noResults = await screen.findByText(new RegExp("No hay widgets configurados", "i"));

		expect(noResults).toBeInTheDocument();
	});

	it("show last modified date in human readable format", async () => {
		const gitHubRepository: GitHubRepository = GitHubARepositoryMother.create();

		mockRepository.search.mockResolvedValue([gitHubRepository]);

		render(<Dashboard repository={mockRepository} />);

		const modificationDate = await screen.findByText(new RegExp("today", "i"));

		expect(modificationDate).toBeInTheDocument();
	});
});
