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
import { GithubApiGithubRepositoryRepository } from "../../infrastruture/GithubApiGithubRepositoryRepository";
import { GitHubApiResponses } from "../../infrastruture/GithubApiResponses";
import styles from "./Dashboard.module.scss";

const isoToReadableDate = (lastUpdate: string): string => {
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

const repository = new GithubApiGithubRepositoryRepository(config.github_access_token);

export function Dashboard() {
	const [githubApiResponse, setGitHubApiResponse] = useState<GitHubApiResponses[]>([]);

	useEffect(() => {
		repository
			.search(config.widgets.map((widgets) => widgets.repository_url))
			.then((responses) => setGitHubApiResponse(responses))
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
			<section className={styles.container}>
				{githubApiResponse.map((widget) => (
					<article className={styles.widget} key={widget.repositoryData.id}>
						<header className={styles.widget__header}>
							<a
								className={styles.widget__title}
								href={widget.repositoryData.html_url}
								target="_blank"
								title={`${widget.repositoryData.organization.login}/${widget.repositoryData.name}`}
								rel="noreferrer"
							>
								{widget.repositoryData.organization.login}/{widget.repositoryData.name}
							</a>
							{widget.repositoryData.private ? <Lock /> : <Unlock />}
						</header>
						<div className={styles.widget__body}>
							<div className={styles.widget__status}>
								<p>Last update {isoToReadableDate(widget.repositoryData.updated_at)}</p>
								{widget.ciStatus.workflow_runs.length > 0 && (
									<div>
										{widget.ciStatus.workflow_runs[0].status === "completed" ? (
											<Check />
										) : (
											<Error />
										)}
									</div>
								)}
							</div>
							<p className={styles.widget__description}>{widget.repositoryData.description}</p>
						</div>
						<footer className={styles.widget__footer}>
							<div className={styles.widget__stat}>
								<Start />
								<span>{widget.repositoryData.stargazers_count}</span>
							</div>
							<div className={styles.widget__stat}>
								<Watchers />
								<span>{widget.repositoryData.watchers_count}</span>
							</div>
							<div className={styles.widget__stat}>
								<Forks />
								<span>{widget.repositoryData.forks_count}</span>
							</div>
							<div className={styles.widget__stat}>
								<IssueOpened />
								<span>{widget.repositoryData.open_issues_count}</span>
							</div>
							<div className={styles.widget__stat}>
								<PullRequests />
								<span>{widget.pullRequests.length}</span>
							</div>
						</footer>
					</article>
				))}
			</section>
		</>
	);
}
