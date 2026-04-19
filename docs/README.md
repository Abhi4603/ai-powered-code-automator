# AI PR Pipeline Documentation

## Overview

The AI PR Pipeline automates the process of creating GitHub Pull Requests from Linear tickets using AI. It leverages Google's Gemini model to generate code changes, commit messages, and PR descriptions based on the ticket description. It also supports preview deployments to Google Cloud Run.

## Prerequisites

*   Node.js (>=20.0.0)
*   npm
*   Google Cloud project
*   GitHub repository
*   Linear account

## Setup

1.  **Clone the repository:**

    ```bash
    git clone <repository_url>
    cd ai-pr-pipeline
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Configure environment variables:**

    Create a `.env` file based on `.env.example` and set the following variables:

    *   `LINEAR_API_KEY`: Your Linear API key.
    *   `GITHUB_TOKEN`: Your GitHub personal access token with `repo` scope.
    *   `GEMINI_API_KEY`: Your Google Gemini API key.
    *   `GITHUB_OWNER`: The owner of the GitHub repository.
    *   `GITHUB_REPO`: The name of the GitHub repository.
    *   `PORT`: The port the application will listen on (default: 8080).
    *   `CLOUDRUN_PROJECT_ID`: Your Google Cloud project ID (required for Cloud Run deployments).
    *   `CLOUDRUN_REGION`: The Google Cloud region for Cloud Run deployments (e.g., `us-central1`).
    *   `CLOUDRUN_SERVICE_NAME`: The name of the Cloud Run service (optional, defaults to a generated name).

4.  **Set up the repository (optional):**

    This script creates the necessary GitHub Actions workflow and Linear webhook.

    ```bash
    npm run setup:repo
    ```

    Alternatively, you can manually configure the following:

    *   **GitHub Actions workflow:** Create a workflow file (e.g., `.github/workflows/deploy.yml`) to deploy the application to Cloud Run on each push to the `main` branch.  See the example workflow in the repository.
    *   **Linear webhook:** Create a webhook in Linear that sends events to the `/linear` endpoint of the application.  The webhook should be triggered on `Issue` events.

## Usage

1.  **Create a Linear ticket:**

    Create a new Linear ticket with a clear and concise description of the desired code changes.

2.  **Run the pipeline:**

    Use the `src/scripts/run-ticket.js` script to process the ticket and create a PR.

    ```bash
    node src/scripts/run-ticket.js <ticket_id>
    ```

    Replace `<ticket_id>` with the ID of the Linear ticket.

3.  **Review the Pull Request:**

    The script will create a new Pull Request in your GitHub repository. Review the changes and merge the PR.

## Commands

*   `npm start`: Starts the application.
*   `npm run dev`: Starts the application in development mode with automatic restarts on file changes.
*   `npm run setup:repo`: Sets up the GitHub Actions workflow and Linear webhook.
*   `node src/scripts/run-ticket.js <ticket_id>`: Processes a Linear ticket and creates a PR.

## Configuration

The application can be configured using environment variables. See the `.env.example` file for a list of available variables.

## Troubleshooting

*   **API key errors:** Ensure that your API keys are valid and have the necessary permissions.
*   **GitHub Actions errors:** Check the GitHub Actions workflow logs for errors.
*   **Cloud Run deployment errors:** Check the Cloud Run logs for errors.

## Contributing

Contributions are welcome! Please submit a Pull Request with your changes.
