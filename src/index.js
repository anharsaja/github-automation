// entry point

import "dotenv/config";

import {
    getAuthenticatedUser,
    getRepositories,
} from "./github.js";

try {
    const user = await getAuthenticatedUser();

    console.log("GitHub user:", user.login);
    console.log("User ID:", user.id);
    console.log("Profile:", user.html_url);

    const repositories = await getRepositories();

    console.log("\nRepositories:");

    for (const repository of repositories) {
        console.log(`- ${repository.full_name}`);
    }
} catch (error) {
    console.error("Error:", error.message);
}