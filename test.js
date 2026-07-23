#!/usr/bin/env node
"use strict";

// Simple test script for xyzai CLI
const { execSync } = require("child_process");
const path = require("path");

const xyzaiPath = path.join(__dirname, "bin", "xyzai");

console.log("🧪 Testing XYZAI CLI...\n");

// Test 1: Version
console.log("Test 1: Version check");
try {
  const version = execSync(`node "${xyzaiPath}" --version`, { encoding: "utf-8", cwd: __dirname }).trim();
  console.log(`  ✅ Version: ${version}\n`);
} catch (err) {
  console.log(`  ❌ Failed: ${err.message}\n`);
  process.exit(1);
}

// Test 2: Help
console.log("Test 2: Help command");
try {
  const help = execSync(`node "${xyzaiPath}" --help`, { encoding: "utf-8", cwd: __dirname });
  if (help.includes("XYZAI")) {
    console.log("  ✅ Help output contains XYZAI\n");
  } else {
    console.log("  ❌ Help output missing XYZAI\n");
    process.exit(1);
  }
} catch (err) {
  console.log(`  ❌ Failed: ${err.message}\n`);
  process.exit(1);
}

// Test 3: Models
console.log("Test 3: List models");
try {
  const models = execSync(`node "${xyzaiPath}" models`, { encoding: "utf-8", cwd: __dirname });
  if (models.includes("MiMo Auto")) {
    console.log("  ✅ Models list contains MiMo Auto\n");
  } else {
    console.log("  ❌ Models list missing MiMo Auto\n");
    process.exit(1);
  }
} catch (err) {
  console.log(`  ❌ Failed: ${err.message}\n`);
  process.exit(1);
}

// Test 4: Config
console.log("Test 4: Config list");
try {
  const config = execSync(`node "${xyzaiPath}" config --list`, { encoding: "utf-8", cwd: __dirname });
  if (config.includes("model")) {
    console.log("  ✅ Config list works\n");
  } else {
    console.log("  ❌ Config list missing model\n");
    process.exit(1);
  }
} catch (err) {
  console.log(`  ❌ Failed: ${err.message}\n`);
  process.exit(1);
}

console.log("✅ All tests passed!");
