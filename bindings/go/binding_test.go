package tree_sitter_ergoscript_test

import (
	"testing"

	tree_sitter "github.com/smacker/go-tree-sitter"
	"github.com/tree-sitter/tree-sitter-ergoscript"
)

func TestCanLoadGrammar(t *testing.T) {
	language := tree_sitter.NewLanguage(tree_sitter_ergoscript.Language())
	if language == nil {
		t.Errorf("Error loading Ergoscript grammar")
	}
}
