# Ts-Plugin

This is a Language Service Plugin for Typescript.

# Installation
You need `yarn` for this because the plugin and the sample project are setup as ["yarn workspace"](https://yarnpkg.com/lang/en/docs/workspaces/).

From root-workspace:
```sh
yarn
```

# Suggestion & Log
If you need to, you can redefine in VSCode the key shortcut for tsserver restarting. Just add in you shortcut config:
```json
    {
        "key": "shift+cmd+r",
        "command": "typescript.restartTsServer"
    }
```

Obviously, you can remap the keys.

If you want to see a better output from `tsserver` when tweaking with the plugin, follow those steps:

1. Close every instance of VSCode
2. Run `./code` from the project folder. (it will set an env var, TSS_LOG, for `tsserver`)
3. Run `yarn watch` from `./src/` folder
4. Anytime you make a change on the plugin, it will be re compiled. Then you can start using it in `./example/index.ts` by reloading the `tsserver` manualy as many as needed with the previously set shortcut.

To see the log, you can either `tail -f ./log/tsserver.log` or use the extension [Log Viewer](https://marketplace.visualstudio.com/items?itemName=berublan.vscode-log-viewer) for VSCode.
