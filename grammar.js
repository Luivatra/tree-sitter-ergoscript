module.exports = grammar({
  name: "ergoscript",

  extras: ($) => [/\s/, $.comment, $.block_comment],

  word: ($) => $.identifier_word,

  conflicts: ($) => [
    [$.statement, $.block, $.lambda_expression],
    [$.statement, $.block],
    [$.method_call, $.property_access],
  ],

  rules: {
    source_file: ($) => repeat($.statement),

    identifier_word: ($) => /[a-z_][a-zA-Z0-9_]*/,

    statement: ($) =>
      choice($.val_declaration, $.function_definition, $.expression),

    val_declaration: ($) =>
      seq(
        "val",
        field("name", $.identifier),
        optional(seq(":", field("type", $.type))),
        "=",
        field("value", $.expression),
      ),

    function_definition: ($) =>
      seq(
        "def",
        field("name", $.identifier),
        field("parameters", $.parameter_list),
        optional(seq(":", field("return_type", $.type))),
        "=",
        field("body", $.expression),
      ),

    parameter_list: ($) =>
      seq(
        "(",
        optional(
          seq($.parameter, repeat(seq(",", $.parameter)), optional(",")),
        ),
        ")",
      ),

    parameter: ($) =>
      seq(field("name", $.identifier), ":", field("type", $.type)),

    expression: ($) =>
      choice(
        $.identifier,
        $.literal,
        $.binary_expression,
        $.unary_expression,
        $.call_expression,
        $.method_call,
        $.if_expression,
        $.lambda_expression,
        $.block,
        $.property_access,
        $.parenthesized_expression,
      ),

    literal: ($) => choice($.boolean, $.number, $.string),

    boolean: ($) => choice("true", "false"),

    number: ($) => /\d+/,

    string: ($) => seq('"', optional(alias(/[^"]+/, $.string_content)), '"'),

    binary_expression: ($) => {
      const table = [
        [10, "||"],
        [11, "&&"],
        [12, choice("|", "^")],
        [13, "&"],
        [14, choice("==", "!=")],
        [15, choice("<", "<=", ">", ">=")],
        [16, choice("+", "-", "++")],
        [17, choice("*", "/", "%")],
      ];

      return choice(
        ...table.map(([precedence, operator]) =>
          prec.left(
            precedence,
            seq(
              field("left", $.expression),
              field("operator", operator),
              field("right", $.expression),
            ),
          ),
        ),
      );
    },

    unary_expression: ($) =>
      prec(
        18,
        seq(
          field("operator", choice("-", "!")),
          field("operand", $.expression),
        ),
      ),

    call_expression: ($) =>
      prec(
        20,
        seq(
          field("function", choice($.identifier, $.builtin_function)),
          field("arguments", $.argument_list),
        ),
      ),

    method_call: ($) =>
      prec(
        20,
        seq(
          field("object", $.expression),
          ".",
          field("method", $.identifier),
          optional(field("arguments", $.argument_list)),
        ),
      ),

    property_access: ($) =>
      prec(
        20,
        seq(
          field("object", $.expression),
          ".",
          field("property", $.identifier),
        ),
      ),

    argument_list: ($) =>
      seq(
        "(",
        optional(
          seq($.expression, repeat(seq(",", $.expression)), optional(",")),
        ),
        ")",
      ),

    if_expression: ($) =>
      prec.right(
        seq(
          "if",
          "(",
          field("condition", $.expression),
          ")",
          field("consequence", $.expression),
          optional(seq("else", field("alternative", $.expression))),
        ),
      ),

    lambda_expression: ($) =>
      prec(
        1,
        seq(
          "{",
          optional(
            seq(
              "(",
              optional(
                seq($.lambda_parameter, repeat(seq(",", $.lambda_parameter))),
              ),
              ")",
              "=>",
            ),
          ),
          field("body", $.expression),
          "}",
        ),
      ),

    lambda_parameter: ($) =>
      seq(field("name", $.identifier), ":", field("type", $.type)),

    block: ($) => seq("{", repeat($.statement), optional($.expression), "}"),

    parenthesized_expression: ($) => seq("(", $.expression, ")"),

    type: ($) => choice($.type_identifier, $.collection_type, $.option_type),

    collection_type: ($) =>
      seq("Coll", "[", field("element_type", $.type), "]"),

    option_type: ($) => seq("Option", "[", field("value_type", $.type), "]"),

    type_identifier: ($) =>
      choice(
        "Any",
        "Unit",
        "Boolean",
        "Byte",
        "Short",
        "Int",
        "Long",
        "BigInt",
        "UnsignedBigInt",
        "SigmaProp",
        "AvlTree",
        "GroupElement",
        "Box",
        "Header",
        "PreHeader",
        "Context",
      ),

    builtin_function: ($) =>
      choice(
        "sigmaProp",
        "proveDlog",
        "proveDHTuple",
        "atLeast",
        "anyOf",
        "allOf",
        "xorOf",
        "blake2b256",
        "sha256",
        "byteArrayToBigInt",
        "longToByteArray",
        "decodePoint",
        "getVar",
        "deserialize",
        "deserializeTo",
        "fromBase16",
        "fromBase58",
        "fromBase64",
        "substConstants",
        "executeFromVar",
        "PK",
        "min",
        "max",
        "serialize",
      ),

    identifier: ($) => choice($.identifier_word, $.context_variable),

    context_variable: ($) =>
      choice(
        "CONTEXT",
        "HEIGHT",
        "SELF",
        "INPUTS",
        "OUTPUTS",
        "LastBlockUtxoRootHash",
        "minerPubKey",
        "headers",
        "preHeader",
        "dataInputs",
      ),

    comment: ($) => token(seq("//", /.*/)),

    block_comment: ($) => token(seq("/*", /[^*]*\*+([^/*][^*]*\*+)*/, "/")),
  },
});
