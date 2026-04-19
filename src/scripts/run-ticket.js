import 'dotenv/config';
import { LinearClient } from '@linear/sdk';
import { Octokit } from '@octokit/rest';
import { generateCodeSuggestions, generateCommitMessage, generatePullRequestDescription } from '../services/gemini.js';
import { createPullRequest, getOrCreateBranch } from '../services/github.js';
import { logger } from '../utils/logger.js';

const linearClient = new LinearClient({ apiKey: process.env.LINEAR_API_KEY });
const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

const OWNER = process.env.GITHUB_OWNER;
const REPO = process.env.GITHUB_REPO;

async function runTicket(ticketId) {
  try {
    logger.info(`Processing ticket: ${ticketId}`);

    // Fetch the Linear ticket
    const issue = await linearClient.issue(ticketId).then(issue => issue.get());
    const issueTitle = issue.title;
    const issueDescription = issue.description;

    logger.info(`Fetched ticket: ${issueTitle}`);

    // Generate branch name
    const branchName = `feature/${ticketId}-${issueTitle.toLowerCase().replace(/[^a-z0-9-]+/g, '-')}`;

    // Get or create the branch
    const baseBranch = 'main';
    const newBranch = await getOrCreateBranch(octokit, OWNER, REPO, baseBranch, branchName);

    if (!newBranch) {
      logger.error(`Failed to create or get branch ${branchName}`);
      return;
    }

    logger.info(`Branch ${branchName} created successfully`);

    // Generate code suggestions
    logger.info(`Generating code suggestions for ticket: ${issueTitle}`);
    const codeSuggestions = await generateCodeSuggestions(issueDescription);

    if (!codeSuggestions) {
      logger.error(`Failed to generate code suggestions for ticket: ${issueTitle}`);
      return;
    }

    logger.info(`Generated code suggestions: ${codeSuggestions}`);

    // Generate commit message
    logger.info(`Generating commit message for ticket: ${issueTitle}`);
    const commitMessage = await generateCommitMessage(issueTitle, codeSuggestions);

    if (!commitMessage) {
      logger.error(`Failed to generate commit message for ticket: ${issueTitle}`);
      return;
    }

    logger.info(`Generated commit message: ${commitMessage}`);

    // Generate pull request description
    logger.info(`Generating pull request description for ticket: ${issueTitle}`);
    const pullRequestDescription = await generatePullRequestDescription(issueDescription, codeSuggestions);

    if (!pullRequestDescription) {
      logger.error(`Failed to generate pull request description for ticket: ${issueTitle}`);
      return;
    }

    logger.info(`Generated pull request description: ${pullRequestDescription}`);

    // Create pull request
    logger.info(`Creating pull request for ticket: ${issueTitle}`);
    const pullRequest = await createPullRequest(octokit, OWNER, REPO, branchName, baseBranch, issueTitle, commitMessage, pullRequestDescription);

    if (!pullRequest) {
      logger.error(`Failed to create pull request for ticket: ${issueTitle}`);
      return;
    }

    logger.info(`Pull request created successfully: ${pullRequest.data.html_url}`);

  } catch (error) {
    logger.error(`Error processing ticket ${ticketId}: ${error}`);
  }
}

const ticketId = process.argv[2];

if (!ticketId) {
  logger.error('Please provide a ticket ID');
  process.exit(1);
}

runTicket(ticketId);
