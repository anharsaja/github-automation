// github API communication
const token = process.env.GITHUB_TOKEN;

export async function getAuthenticatedUser() {
    const response = await fetch("https://api.github.com/user", {
        headers: {
            Accept: "application/vnd.github+json",
            Authorization: `Bearer ${token}`,
            "X-GitHub-Api-Version": "2026-03-10",
        },
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "GitHub API request failed");
    }

    return data;
}