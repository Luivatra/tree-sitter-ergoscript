# Tree-sitter Grammar for ErgoScript

This directory contains a tree-sitter grammar for the ErgoScript language.

## Building the Grammar

To build and test the grammar:

1. Install tree-sitter CLI:
   ```bash
   npm install
   ```

2. Generate the parser:
   ```bash
   npx tree-sitter generate
   ```

3. Test the grammar:
   ```bash
   npx tree-sitter test
   ```

4. Try the playground:
   ```bash
   npx tree-sitter playground
   ```

## Supported Syntax

The grammar supports:

- **Keywords**: `val`, `def`, `if`, `else`, `true`, `false`
- **Types**: `Int`, `Long`, `Box`, `SigmaProp`, `Coll`, `Option`, etc.
- **Context Variables**: `HEIGHT`, `SELF`, `INPUTS`, `OUTPUTS`, `CONTEXT`
- **Built-in Functions**: `sigmaProp`, `blake2b256`, `PK`, `proveDlog`, etc.
- **Operators**: `+`, `-`, `*`, `/`, `&&`, `||`, `==`, `!=`, `<`, `>`, etc.
- **Comments**: Line comments (`//`) and block comments (`/* */`)
- **Expressions**: Binary expressions, method calls, lambda expressions, blocks

## Grammar Structure

The grammar defines ErgoScript syntax including:

- Variable declarations (`val`)
- Function definitions (`def`)
- Expressions (binary, unary, calls, property access)
- Type annotations
- Lambda expressions
- If-else conditionals
- Block expressions
