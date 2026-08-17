// entry point

import "dotenv/config";

import {
    getAuthenticatedUser,
    getRepository,
    createIssue,
    findIssueByTitle
} from "./github.js";

try {
    const user = await getAuthenticatedUser();

    console.log("GitHub user:", user.login);

    const repository = await getRepository(
        user.login,
        "github-automation",
    );

    console.log("\nRepository:");
    console.log("Name:", repository.name);
    console.log("Default branch:", repository.default_branch);

    const issueTitle = "Test GitHub Automation Bot";

    const existingIssue = await findIssueByTitle(
        user.login,
        repository.name,
        issueTitle,
    );

    if (existingIssue) {
        console.log("\nIssue already exists!");
        console.log("Issue number:", existingIssue.number);
        console.log("URL:", existingIssue.html_url);
    } else {
        const issue = await createIssue(
            user.login,
            repository.name,
            issueTitle,
            "This issue was created automatically by my Node.js GitHub automation bot.",
        );

        console.log("\nIssue created!");
        console.log("Issue number:", issue.number);
        console.log("URL:", issue.html_url);
    }
} catch (error) {
    console.error("Error:", error.message);
}