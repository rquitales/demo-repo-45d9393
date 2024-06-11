import * as github from "@pulumi/github";

const repo = new github.Repository("demo-repo", {
    description: "Demo Repository for GitHub",
});

export const clusterName = repo.name

const bp = new github.BranchProtection("demo-branch-protection", {
    repositoryId: repo.id,
    pattern: "main",
    enforceAdmins: true,
    requiredStatusChecks: [{
        contexts: ["ci"],
        strict: true,
    }],
    requiredPullRequestReviews: [{
        dismissStaleReviews: true,
        requireCodeOwnerReviews: true,
        requiredApprovingReviewCount: 1,
    }],
}, {replaceOnChanges: ["*"], deleteBeforeReplace: true});

export const branchProtectionId = bp.id;

// BPR_kwDOMIJ9n84DDXZk