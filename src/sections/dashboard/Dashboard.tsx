import { useEffect, useState } from "react";

import { ReactComponent as Brand } from "../../assets/svg/brand.svg";
import { ReactComponent as Check } from "../../assets/svg/check.svg";
import { ReactComponent as Error } from "../../assets/svg/error.svg";
import { ReactComponent as PullRequests } from "../../assets/svg/git-pull-request.svg";
import { ReactComponent as IssueOpened } from "../../assets/svg/issue-opened.svg";
import { ReactComponent as Lock } from "../../assets/svg/lock.svg";
import { ReactComponent as Forks } from "../../assets/svg/repo-forked.svg";
import { ReactComponent as Start } from "../../assets/svg/star.svg";
import { ReactComponent as Unlock } from "../../assets/svg/unlock.svg";
import { ReactComponent as Watchers } from "../../assets/svg/watchers.svg";
import { config } from "../../devdash_config";
import { GitHubRepository } from "../../domain/GitHubRepository";
import { GitHubApiGitHubRepositoryRepository } from "../../infrastructure/GitHubApiGitHubRepositoryRepository";
import styles from "./Dashboard.module.scss";

const isoToReadableDate = (lastUpdate: Date): string => {
	const lastUpdateDate = new Date(lastUpdate);
	const currentDate = new Date();
	const diffTime = currentDate.getTime() - lastUpdateDate.getTime();
	const diffDays = Math.round(diffTime / (1000 * 3600 * 24));

	if (diffDays === 0) {
		return "today";
	}

	if (diffDays > 30) {
		return "more than a month ago";
	}

	return `${diffDays} days ago`;
};

export function Dashboard() {
	const repository = new GitHubApiGitHubRepositoryRepository(config.github_access_token);
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
						<article className={styles.widget} key={`${widget.id.organization}/${widget.id.name}`}>
							<header className={styles.widget__header}>
								<h2 className={styles.widget__title}>
									<a
										href={widget.url}
										target="_blank"
										title={`${widget.id.organization}/${widget.id.name}`}
										rel="noreferrer"
									>
										{widget.id.organization}/{widget.id.name}
									</a>
								</h2>
								{widget.private ? <Lock /> : <Unlock />}
							</header>
							<div className={styles.widget__body}>
								<div className={styles.widget__status}>
									<p>Last update {isoToReadableDate(widget.updatedAt)}</p>
									{widget.hasWorkflows && (
										<div>{widget.isLastWorkflowSuccess ? <Check /> : <Error />}</div>
									)}
								</div>
								<p className={styles.widget__description}>{widget.description}</p>
							</div>
							<footer className={styles.widget__footer}>
								<div className={styles.widget__stat}>
									<Start />
									<span>{widget.stars}</span>
								</div>
								<div className={styles.widget__stat}>
									<Watchers />
									<span>{widget.watchers}</span>
								</div>
								<div className={styles.widget__stat}>
									<Forks />
									<span>{widget.forks}</span>
								</div>
								<div className={styles.widget__stat}>
									<IssueOpened />
									<span>{widget.issues}</span>
								</div>
								<div className={styles.widget__stat}>
									<PullRequests />
									<span>{widget.pullRequests}</span>
								</div>
							</footer>
						</article>
					))}
				</section>
			)}
		</>
	);
}
