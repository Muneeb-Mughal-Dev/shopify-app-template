const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const logInfo = (message) => console.log(`[ info ] ${message}`);
const logSuccess = (message) => console.log(`[ success ] ${message}`);
const logError = (message) => console.error(`[ error ] ${message}`);

// Define Paths
const rootPath = __dirname;
const buildPath = path.resolve(rootPath, "build");
const serverBuildPath = path.resolve(rootPath, "web/build");
const frontendPath = path.resolve(rootPath, "web/frontend");
const frontendDistPath = path.resolve(buildPath, "frontend");

// Clean Up Old Build Directory
if (fs.existsSync(buildPath)) {
  logInfo("Cleaning up old output directory (build)");
  fs.rmSync(buildPath, { recursive: true, force: true });
}
fs.mkdirSync(buildPath, { recursive: true });
logInfo("Created new output directory (build)");

// Clean Up Server Build Directory
if (fs.existsSync(serverBuildPath)) {
  logInfo("Cleaning up old server output directory (web/build)");
  fs.rmSync(serverBuildPath, { recursive: true, force: true });
}

// Detect Package Manager
let packageManager = "npm";
if (fs.existsSync(path.join(rootPath, "yarn.lock"))) {
  packageManager = "yarn";
} else if (fs.existsSync(path.join(rootPath, "pnpm-lock.yaml"))) {
  packageManager = "pnpm";
}
logInfo(`Using package manager: ${packageManager}`);

// Function to Copy Directory Excluding Files
const copyDirectory = (source, destination, exclude = []) => {
  fs.mkdirSync(destination, { recursive: true });

  const items = fs.readdirSync(source, { withFileTypes: true });
  for (const item of items) {
    const srcPath = path.join(source, item.name);
    const destPath = path.join(destination, item.name);

    // Skip excluded items
    if (exclude.some((pattern) => new RegExp(pattern).test(item.name))) {
      logInfo(`Skipping: ${srcPath}`);
      continue;
    }

    if (item.isDirectory()) {
      copyDirectory(srcPath, destPath, exclude);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
};

// Build Process
try {
  logInfo("Starting app build process...");

  execSync(
    `
      cd web &&
      npx swc . -s -d build --copy-files --log-watch-compilation --include-dotfiles --ignore node_modules,frontend,inject-json-assertion.cjs,.eslintignore,.eslintrc,.prettierignore,prettier.config.js,nodemon.json,shopify.web.toml,tsconfig.json,yarn.lock,.env.example,server/logs &&
      node inject-json-assertion.cjs
    `,
    { stdio: "inherit" }
  );

  logSuccess("App build completed");

  if (fs.existsSync(frontendPath)) {
    logInfo("Copying frontend directory...");
    copyDirectory(frontendPath, frontendDistPath, [
      "node_modules",
      "yarn.lock",
      "package-lock.json",
      "pnpm-lock.yaml",
    ]);
    logSuccess("Frontend directory copied successfully");
  } else {
    logError("Error: 'web/frontend' directory not found.");
    process.exit(1);
  }

  if (fs.existsSync(serverBuildPath)) {
    execSync(`mv ${serverBuildPath}/* ${buildPath}`);
    const envFilePath = path.join(serverBuildPath, ".env");
    if (fs.existsSync(envFilePath)) {
      logInfo("Copying .env file to build folder");
      execSync(`cp ${envFilePath} ${buildPath}`);
    }
    execSync(`rm -rf ${serverBuildPath}`);
    logInfo("Cleaned up server build folder");
  } else {
    logError("Error: 'web/build' directory not found.");
    process.exit(1);
  }

  logSuccess("Build process completed");

  console.log(`
    ╭────────────────────────────────────────────────────────────────────────╮
    │    Run the following commands to start the server in production        │
    │────────────────────────────────────────────────────────────────────────│
    │                                                                        │
    │    ❯ cd build                                                          │
    │    ❯ ${packageManager} install --production                                         │
    │    ❯ ${packageManager} start                                                        │
    │    or                                                                  │
    │    ❯ cross-env NODE_ENV=production node server/server.js               │
    │                                                                        │
    ╰────────────────────────────────────────────────────────────────────────╯
  `);
} catch (error) {
  logError("Error during the build process:");
  logError(error.message);
  process.exit(1);
}
