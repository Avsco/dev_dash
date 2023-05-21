import { ReactComponent as Check } from "../../assets/svg/check.svg";
import { ReactComponent as Error } from "../../assets/svg/error.svg";
import { ReactComponent as PullRequests } from "../../assets/svg/git-pull-request.svg";
import { ReactComponent as IssueOpened } from "../../assets/svg/issue-opened.svg";
import { ReactComponent as Lock } from "../../assets/svg/lock.svg";
import { ReactComponent as Forks } from "../../assets/svg/repo-forked.svg";
import { ReactComponent as Start } from "../../assets/svg/star.svg";
import { ReactComponent as Unlock } from "../../assets/svg/unlock.svg";
import { ReactComponent as Watchers } from "../../assets/svg/watchers.svg";
import { GitHubRepository } from "../../domain/GitHubRepository";
import styles from "./GitHubRepositoryWidget.module.scss";

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

export const GitHubRepositoryWidget = ({ widget }: { widget: GitHubRepository }) => {
	return (
		<article className={styles.widget} key={`${widget.id.organization}/${widget.id.name}`}>
			<header className={styles.widget__header}>
				<h2 className={styles.widget__title}>
					<a
						href={`/repository/${widget.id.organization}/${widget.id.name}`}
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
					{widget.hasWorkflows && <div>{widget.isLastWorkflowSuccess ? <Check /> : <Error />}</div>}
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
	);
};
