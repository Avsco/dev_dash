import { config } from "../../devdash_config";
import { GithubRepositoryRepository } from "../../domain/GitHubRepositoryRepository";
import styles from "./Dashboard.module.scss";
import { GitHubRepositoryWidget } from "./GitHubRepositoryWidget";
import { useGitHubRepositories } from "./useGitHubRepositories";

const gitHubRepositoryUrls = config.widgets.map((widget) => widget.repository_url);

export function Dashboard({ repository }: { repository: GithubRepositoryRepository }) {
	const { repositoryData } = useGitHubRepositories(repository, gitHubRepositoryUrls);

	return (
		<>
			{repositoryData.length === 0 ? (
				<div className={styles.empty}>
					<span>No hay widgets configurados.</span>
				</div>
			) : (
				<section className={styles.container}>
					{repositoryData.map((widget) => (
						<GitHubRepositoryWidget key={widget.id.name} widget={widget} />
					))}
				</section>
			)}
		</>
	);
}
