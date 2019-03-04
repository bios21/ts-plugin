import * as ts from 'typescript/lib/tsserverlibrary';
import { ParisTsPlugin } from './ParisTsPlugin';

export = (mod: { typescript: typeof ts }) => new ParisTsPlugin(mod.typescript);
