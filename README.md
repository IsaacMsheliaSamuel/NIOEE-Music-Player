# Git & GitHub Setup Guide

**Community Repository**

https://github.com/BlockheaderWeb3-Community/frontend-cohort3

---

# 1. First-Time Git Configuration

If this is your first time using Git on your computer, configure your GitHub username and email.

```bash
git config --global user.name "YOUR_GITHUB_USERNAME"
git config --global user.email "YOUR_GITHUB_EMAIL"
```

> **Note:** Make sure you replace both values with the same username and email address you use on GitHub.

You can verify your configuration with:

```bash
git config --global --list
```

---

# 2. Push an Existing Project to GitHub

If you already have a project on your computer that has **not** been connected to GitHub yet, follow these steps.

### Step 1: Initialize Git

```bash
git init
```

### Step 2: Add all files

```bash
git add .
```

### Step 3: Commit your project

```bash
git commit -m "Initial commit"
```

### Step 4: Switch to the `main` branch

```bash
git branch -M main
```

### Step 5: Connect your project to the GitHub repository

```bash
git remote add origin https://github.com/BlockheaderWeb3-Community/frontend-cohort3.git
```

### Step 6: Push your code

```bash
git push -u origin main
```

If the push is successful, you'll see output similar to:

```text
Enumerating objects...
Counting objects...
Writing objects...
To https://github.com/BlockheaderWeb3-Community/frontend-cohort3.git
 * [new branch]      main -> main
```

---

# 3. Working on an Existing Repository

Before starting work, always download the latest changes from GitHub.

```bash
git pull origin main
```

Check the current status of your repository:

```bash
git status --short --branch
```

After making changes:

```bash
git add .
git commit -m "Describe your changes"
git push origin main
```

---

# 4. If Git Reports Unrelated Histories

Occasionally, Git may report that the local repository and the remote repository have unrelated histories.

In that case, run:

```bash
git pull origin main --allow-unrelated-histories
```

Resolve any merge conflicts if prompted, then commit and push again.

---

# 5. Create a Backup Branch (Optional)

Before performing large merges or risky operations, it's a good idea to create a backup branch.

```bash
git branch backup-before-merge
```

---

# Useful Commands

View repository status:

```bash
git status
```

View current branch:

```bash
git branch
```

View commit history:

```bash
git log --oneline
```

Fetch the latest changes from GitHub:

```bash
git fetch
```

Pull the latest changes:

```bash
git pull origin main
```

Push your commits:

```bash
git push origin main
```

---

# Frontend Mentor Challenges

Practice your frontend skills here:

https://www.frontendmentor.io/challenges
