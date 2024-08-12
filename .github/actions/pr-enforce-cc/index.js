"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
// Extarcts the added commits and prints them
var core = require("@actions/core");
var github_1 = require("@actions/github");
var VALID_EMOJI = "✅";
var INVALID_EMOJI = "❌";
var ALLOWED_COMMIT_TYPES = [
    "fix",
    "feat",
    "chore",
    "docs",
    "style",
    "refactor",
    "perf",
    "test",
    "build",
    "ci",
    "revert",
];
var ALLOWED_COMMITS_REGEX = new RegExp("^(".concat(ALLOWED_COMMIT_TYPES.join("|"), ")\\!?(\\(.+\\))?:\\s*.+"));
var run = function () { return __awaiter(void 0, void 0, void 0, function () {
    var prNumber, _a, validCommits, invalidCommits, isValid;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                if (github_1.context.eventName !== "pull_request") {
                    core.setFailed("This action is only supported for pull requests");
                    return [2 /*return*/];
                }
                prNumber = github_1.context.payload.pull_request.number;
                return [4 /*yield*/, (0, github_1.getOctokit)(core.getInput("token"))
                        .rest.pulls.listCommits({
                        owner: github_1.context.repo.owner,
                        repo: github_1.context.repo.repo,
                        pull_number: prNumber,
                    })
                        .then(function (_a) {
                        var data = _a.data;
                        return data.reduce(function (acc, _a) {
                            var commit = _a.commit;
                            var message = commit.message;
                            var valid = isCommitValid(message);
                            core.info("".concat(valid ? VALID_EMOJI : INVALID_EMOJI, " ").concat(message));
                            acc[valid ? 0 : 1].push(message);
                            return acc;
                        }, [[], []]);
                    })];
            case 1:
                _a = _b.sent(), validCommits = _a[0], invalidCommits = _a[1];
                core.info("Valid commits: ".concat(validCommits.length));
                core.info("Invalid commits: ".concat(invalidCommits.length));
                isValid = invalidCommits.length === 0;
                core.setOutput("valid", isValid);
                core.setOutput("valid_commits", validCommits);
                core.setOutput("invalid_commits", invalidCommits);
                if (isValid)
                    core.info("".concat(VALID_EMOJI, " All commits are valid"));
                else
                    core.setFailed("".concat(INVALID_EMOJI, " ").concat(invalidCommits.length, " invalid commits found"));
                return [2 /*return*/];
        }
    });
}); };
var isCommitValid = function (commit) {
    return ALLOWED_COMMITS_REGEX.test(commit.trim());
};
run().catch(function (error) { return core.setFailed(error.message); });
