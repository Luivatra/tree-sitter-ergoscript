; Keywords
"val" @keyword
"def" @keyword
"if" @keyword
"else" @keyword

; Operators
[
  "+"
  "-"
  "*"
  "/"
  "%"
  "=="
  "!="
  "<"
  "<="
  ">"
  ">="
  "&&"
  "||"
  "&"
  "|"
  "^"
  "!"
  "++"
  "=>"
  "="
] @operator

; Delimiters
[
  "("
  ")"
  "{"
  "}"
  "["
  "]"
] @punctuation.bracket

[
  ","
  "."
  ":"
] @punctuation.delimiter

; Literals
(number) @number
(string) @string
(string_content) @string
(boolean) @boolean

; Comments
(comment) @comment
(block_comment) @comment

; Types
(type_identifier) @type
(collection_type "Coll" @type)
(option_type "Option" @type)

; Built-in functions
(builtin_function) @function.builtin

; Context variables
(context_variable) @variable.builtin

; Function definitions
(function_definition
  name: (identifier) @function)

; Function calls
(call_expression
  function: (identifier) @function.call)

; Method calls
(method_call
  method: (identifier) @function.method)

; Parameters
(parameter
  name: (identifier) @variable.parameter)

(lambda_parameter
  name: (identifier) @variable.parameter)

; Variable declarations
(val_declaration
  name: (identifier) @variable)

; Property access
(property_access
  property: (identifier) @property)

; General identifiers
(identifier_word) @variable
