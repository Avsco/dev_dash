import { useEffect, useState } from "react";

import { ReactComponent as Brand } from "../../assets/svg/brand.svg";
import { config } from "../../devdash_config";
import { GitHubRepository } from "../../domain/GitHubRepository";
import { GithubRepositoryRepository } from "../../domain/GitHubRepositoryRepository";
import styles from "./Dashboard.module.scss";
import { GitHubRepositoryWidget } from "./GitHubRepositoryWidget";

export function Dashboard({ repository }: { repository: GithubRepositoryRepository }) {
	const [repositoryData, setRepositoryData] = useState<GitHubRepository[]>([]);

	useEffect(() => {
		repository
			.search(config.widgets.map((widget) => widget.repository_url))
			.then((repositoryData) => {
				setRepositoryData(repositoryData);
			})
			.catch(console.error);
	}, []);

	return (
		<>
			<header className={styles.header}>
				<section className={styles.header__container}>
					<Brand />
					<h1 className={styles.app__brand}>DevDash_</h1>
				</section>
			</header>
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
