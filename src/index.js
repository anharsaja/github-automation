// entry point

import "dotenv/config";
import { getAuthenticatedUser } from "./github.js";

try {
    const user = await getAuthenticatedUser();

    console.log("GitHub user:", user.login);
    console.log("User ID:", user.id);
    console.log("Profile:", user.html_url);
} catch (error) {
    console.error("Error:", error.message);
}