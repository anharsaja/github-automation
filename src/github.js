// github API communication
const token = process.env.GITHUB_TOKEN;

const headers = {
    Accept: "application/vnd.github+json",
    Authorization: `Bearer ${token}`,
    "X-GitHub-Api-Version": "2026-03-10",
};

export async function getAuthenticatedUser() {
    const response = await fetch("https://api.github.com/user", {
        headers,
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "GitHub API request failed");
    }

    return data;
}

export async function getRepositories() {
    const response = await fetch(
        "https://api.github.com/user/repos?per_page=100",
        {
            headers,
        },
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "GitHub API request failed");
    }

    return data;
}

export async function getRepository(owner, repo) {
    const response = await fetch(
        `https://api.github.com/repos/${owner}/${repo}`,
        {
            headers,
        },
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "GitHub API request failed");
    }

    return data;
}

export async function createIssue(owner, repo, title, body) {
    const response = await fetch(
        `https://api.github.com/repos/${owner}/${repo}/issues`,
        {
            method: "POST",
            headers: {
                ...headers,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title,
                body,
            }),
        },
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Failed to create issue");
    }

    return data;
}

export async function getIssues(owner, repo) {
    const response = await fetch(
        `https://api.github.com/repos/${owner}/${repo}/issues?state=open&per_page=100`,
        {
            headers,
        },
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Failed to get issues");
    }

    return data;
}

export async function findIssueByTitle(owner, repo, title) {
    const issues = await getIssues(owner, repo);

    return issues.find((issue) => issue.title === title);
}