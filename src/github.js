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