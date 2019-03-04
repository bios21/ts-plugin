import {
    decorateWithTemplateLanguageService,
    Logger as TplLanguageLogger,
    TemplateContext,
    TemplateLanguageService,
} from 'typescript-template-language-service-decorator';
import * as ts from 'typescript/lib/tsserverlibrary';

export class Logger implements TplLanguageLogger {
    constructor(private readonly info: ts.server.PluginCreateInfo) {}

    public log(msg: string): void {
        this.info.project.projectService.logger.info(`>> [PARISTSPLUGIN] ${msg}`);
    }
}

export class ParisTsTemplateLanguageService implements TemplateLanguageService {
    constructor(private readonly info: ts.server.PluginCreateInfo, private readonly logger: Logger) {}

    public getCompletionsAtPosition(context: TemplateContext, position: ts.LineAndCharacter): ts.CompletionInfo {
        const line = context.text.split(/\n/g)[position.line];
        this.logger.log(`Line is: ${line}`);
        this.logger.log(`${context.rawText} / ${context.text}`);
        this.logger.log(`${position.line} / ${position.character}`);

        return {
            entries: [
                {
                    kind: ts.ScriptElementKind.unknown,
                    kindModifiers: ':',
                    name: 'foo',
                    sortText: '',
                },
                {
                    kind: ts.ScriptElementKind.unknown,
                    kindModifiers: '',
                    name: 'BAZ',
                    sortText: '',
                },
            ],
            isGlobalCompletion: true,
            isMemberCompletion: false,
            isNewIdentifierLocation: false,
        };
    }
}

/**
 * A plugin can be either a class or functions following the Decorator Pattern
 */
export class ParisTsPlugin {
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
        const logger = new Logger(info);

        logger.log('Hi there! 👋');
        logger.log('ParisTSPlugin is starting.');
        const proxy = Object.create(null) as ts.LanguageService;
        for (const k of Object.keys(info.languageService) as Array<keyof ts.LanguageService>) {
            const x = info.languageService[k];
            proxy[k] = (...args: Array<{}>) => x.apply(info.languageService, args);
        }

        proxy.getCompletionsAtPosition = (fileName, position) => {
            const prior = info.languageService.getCompletionsAtPosition(fileName, position, {});

            prior.entries.unshift({ name: 'FOO', kind: ts.ScriptElementKind.classElement, sortText: '' });
            prior.entries = prior.entries.filter(e => !['error', 'warn'].includes(e.name));
            return prior;
        };

        return proxy;

        // return decorateWithTemplateLanguageService(
        //     this.typescript,
        //     info.languageService,
        //     info.project,
        //     new ParisTsTemplateLanguageService(info, logger),
        //     { tags: ['paris_ts'] },
        //     { logger },
        // );
    }
}
