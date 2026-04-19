# AI-Powered PR Pipeline Documentation

Welcome to the documentation for the AI-Powered PR Pipeline! This document provides a comprehensive guide to setting up, configuring, and using the pipeline.

## Overview

This pipeline automates the process of creating pull requests from Linear tickets using AI. It integrates with Linear, GitHub, and Google Cloud Run to provide a seamless workflow for development and deployment.

## Table of Contents

1.  [Setup](#setup)
2.  [Configuration](#configuration)
3.  [Commands](#commands)
4.  [Deployment](#deployment)
5.  [Troubleshooting](#troubleshooting)

## Setup

### Prerequisites

*   Node.js (>=20.0.0)
*   npm
*   Google Cloud SDK (gcloud)
*   Docker
*   Linear API Key
*   GitHub Personal Access Token
*   Google Cloud Project

### Installation

1.  Clone the repository:

    ```bash
    git clone <repository_url>
    cd ai-pr-pipeline
    ```

2.  Install dependencies:

    ```bash
    npm install
    ```

3.  Configure environment variables:

    *   Create a `.env` file based on `.env.example`.
    *   Set the following environment variables:
        *   `LINEAR_API_KEY`: Your Linear API key.
        *   `GITHUB_TOKEN`: Your GitHub Personal Access Token.
        *   `GITHUB_OWNER`: The owner of the GitHub repository.
        *   `GITHUB_REPO`: The name of the GitHub repository.
        *   `GEMINI_API_KEY`: Your Gemini API key.
        *   `GCP_PROJECT_ID`: Your Google Cloud Project ID.
        *   `CLOUD_RUN_REGION`: The Google Cloud Run region.

## Configuration

The pipeline is configured using environment variables. The following environment variables are available:

*   `LINEAR_API_KEY`: Your Linear API key.
*   `GITHUB_TOKEN`: Your GitHub Personal Access Token.
*   `GITHUB_OWNER`: The owner of the GitHub repository.
*   `GITHUB_REPO`: The name of the GitHub repository.
*   `GEMINI_API_KEY`: Your Gemini API key.
*   `GCP_PROJECT_ID`: Your Google Cloud Project ID.
*   `CLOUD_RUN_REGION`: The Google Cloud Run region.
*   `PORT`: The port the server listens on (default: 8080).
*   `LOG_LEVEL`: The log level (default: info).

## Commands

The following commands are available:

*   `npm start`: Starts the pipeline.
*   `npm dev`: Starts the pipeline in development mode with automatic restarts.
*   `npm run setup:repo`: Sets up the GitHub repository with the necessary webhooks.

## Deployment

### Google Cloud Run

1.  Build the Docker image:

    ```bash
    docker build -t ai-pr-pipeline .
    ```

2.  Tag the image:

    ```bash
    docker tag ai-pr-pipeline gcr.io/$GCP_PROJECT_ID/ai-pr-pipeline
    ```

3.  Push the image to Google Container Registry:

    ```bash
    docker push gcr.io/$GCP_PROJECT_ID/ai-pr-pipeline
    ```

4.  Deploy the image to Google Cloud Run:

    ```bash
    gcloud run deploy ai-pr-pipeline \
        --image gcr.io/$GCP_PROJECT_ID/ai-pr-pipeline \
        --platform managed \
        --region $CLOUD_RUN_REGION \
        --port 8080 \
        --allow-unauthenticated
    ```

### Local Development

1.  Start the pipeline:

    ```bash
    npm run dev
    ```

2.  Expose the local port using a tool like ngrok to receive webhooks from Linear and GitHub.

## Troubleshooting

*   **Issue:** Pipeline not processing Linear tickets.
    *   **Solution:** Verify that the Linear API key is correct and that the Linear webhook is configured correctly.
*   **Issue:** Pipeline not creating pull requests.
    *   **Solution:** Verify that the GitHub Personal Access Token is correct and that the GitHub webhook is configured correctly.
*   **Issue:** Cloud Run deployment failing.
    *   **Solution:** Verify that the Google Cloud Project ID and Cloud Run region are correct and that the necessary permissions are granted.
