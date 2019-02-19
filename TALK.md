1. Language Service API !== Compiler API (also !== VSCode Extension)
    - Do:
        - Provide errors from a linter inline in the editor
        - Filter the completion list to remove certain properties from window
        - Redirect "Go to definition" to go to a different location for certain identifiers
        - Enable new errors or completions in string literals for a custom templating language
    - Don't:
        - Add new custom syntax to TypeScript
        - Change how the compiler emits JavaScript (Compiler API)
        - Customize the type system to change what is or isn't an error when running tsc (Transformer API with ttsc)
