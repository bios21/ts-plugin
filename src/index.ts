import * as ts from 'typescript/lib/tsserverlibrary';

/**
 * A plugin can be either a class or functions following the Decorator Pattern
 */
class TsPlugin {
    /**
     * Typically no operation have to be done in constructor.
     */
    constructor(private readonly typescript: typeof ts) {
        /* no op */
    }

    /**
     * This is the main entrypoint of your plugin.
     */
    public create(info: ts.server.PluginCreateInfo): ts.LanguageService {
        const proxy: ts.LanguageService = Object.create(null);
        info.project.log('HELLLLOOO');
        info.project.projectService.logger.info('ParisTSPlugin is starting.');
        for (const k of Object.keys(info.languageService) as Array<keyof ts.LanguageService>) {
            const x = info.languageService[k];
            proxy[k] = (...args: Array<{}>) => x.apply(info.languageService, args);
        }

        proxy.getCompletionsAtPosition = (fileName, position) => {
            const prior = info.languageService.getCompletionsAtPosition(fileName, position, {});

            prior.entries.unshift({ name: 'AZ', kind: ts.ScriptElementKind.classElement, sortText: '' });
            prior.entries = prior.entries.filter(
                e => !['name', 'apply', 'assign', 'keys', 'callee', 'caller', 'log'].includes(e.name),
            );
            return prior;
        };

        return proxy;
    }
}

export = (mod: typeof ts) => new TsPlugin(mod);
