// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
const workspace = vscode.workspace;

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "example123" is now active!');

  const watcher = vscode.workspace.createFileSystemWatcher(
    "**/*.js",
    false,
    false,
    false
  );
  watcher.onDidChange(async (e) => {
    // 文件发生更新
    const jsFile = e.fsPath.split(vscode.workspace.name)[1];
    const s = await import(jsFile);
    console.log(s);
    console.log(jsFile);
  });
  watcher.onDidCreate((e) => {
    // 新建了js文件
    console.log("js created," + e.fsPath);
  });
  watcher.onDidDelete((e) => {
    // 删除了js文件
    console.log("js deleted," + e.fsPath);
  });

  context.subscriptions.push(watcher);
}

function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
