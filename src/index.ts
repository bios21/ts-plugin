import * as ts from 'typescript/lib/tsserverlibrary';

class TsPlugin {
    constructor(private readonly typescript: typeof ts) {
        /* no op */
    }

    public create(info: ts.server.PluginCreateInfo): ts.LanguageService {
        const proxy: ts.LanguageService = Object.create(null);
        info.project.log('test');
        for (const k of Object.keys(info.languageService) as Array<keyof ts.LanguageService>) {
            const x = info.languageService[k];
            proxy[k] = (...args: Array<{}>) => x.apply(info.languageService, args);
        }
        return proxy;
    }
}

export = (mod: typeof ts) => new TsPlugin(mod);
