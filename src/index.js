// entry point
import "dotenv/config";

import {
    getAuthenticatedUser,
    getRepository,
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
    console.log("Full name:", repository.full_name);
    console.log("Description:", repository.description);
    console.log("Private:", repository.private);
    console.log("Default branch:", repository.default_branch);
    console.log("URL:", repository.html_url);
} catch (error) {
    console.error("Error:", error.message);
}