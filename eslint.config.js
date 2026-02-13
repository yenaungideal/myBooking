// @ts-check
const eslint = require("@eslint/js");
const tseslint = require("typescript-eslint");
const angular = require("angular-eslint");

module.exports = tseslint.config(
  {
    files: ["**/*.ts"],
    extends: [
      eslint.configs.recommended,
      ...tseslint.configs.recommended,
      ...tseslint.configs.stylistic,
      ...angular.configs.tsRecommended,
    ],
    processor: angular.processInlineTemplates,
    rules: {
     
      "no-debugger": "warn",
          "semi": ["error", "always"],
          "no-empty-function": "off",
          "max-classes-per-file": ["error", 1],
          "max-len": ["warn", 140],
          "no-multiple-empty-lines": "error",
          "no-console": [
            "warn",
            {
              "allow": ["debug", "info", "time", "timeEnd", "trace", "error"]
            }
          ],
          "no-extra-boolean-cast": "off",
          "space-before-blocks": "warn",
          "block-spacing": "warn",
          "lines-between-class-members": [
            "warn",
            "always",
            {
              "exceptAfterSingleLine": true
            }
          ],
          "@typescript-eslint/no-inferrable-types": ["warn"],
          "@typescript-eslint/no-explicit-any": "off",
          "@typescript-eslint/no-unused-vars": "off",
          "@angular-eslint/prefer-inject": "off",
          "@angular-eslint/no-empty-lifecycle-method": "off",
          "@angular-eslint/no-output-on-prefix": "off",
          "@angular-eslint/component-class-suffix": "off",
          "@typescript-eslint/no-non-null-assertion": "off",
          "@typescript-eslint/consistent-indexed-object-style": "off",
          "@typescript-eslint/prefer-function-type": "off",
          "@typescript-eslint/member-ordering": [
            "warn",
            {
              "default": [
                "public-set",
                "public-get",
                "public-field",
                "public-static-field",
                "protected-static-field",
                "private-static-field",
                "public-instance-field",
                "public-abstract-field",
                "protected-instance-field",
                "protected-abstract-field",
                "private-instance-field",
                "public-decorated-field",
                "protected-decorated-field",
                "private-decorated-field",
                "static-field",
                "instance-field",
                "protected-field",
                "private-field",
                "abstract-field",
                "constructor",
                "public-static-method",
                "public-method",
                "protected-static-method",
                "protected-method",
                "private-static-method",
                "private-method"
              ]
            }
          ],
          "@angular-eslint/directive-selector": [
            "error",
            {
              type: "attribute",
              prefix: "app",
              style: "camelCase",
            },
          ],
          "@angular-eslint/component-selector": [
            "error",
            {
              type: "element",
              prefix: "app",
              style: "kebab-case",
            },
          ],
          "@typescript-eslint/explicit-function-return-type": "error",
    },
  },
  {
    files: ["**/*.html"],
    extends: [
      ...angular.configs.templateRecommended,
      ...angular.configs.templateAccessibility,
    ],
    rules: {
      "@angular-eslint/template/prefer-control-flow": "off",
      "@angular-eslint/template/click-events-have-key-events": "off",
      "@angular-eslint/template/interactive-supports-focus": "off",
      "@angular-eslint/template/attributes-order": [
        "warn",
        {
          "alphabetical": false,
          "order": [
            "STRUCTURAL_DIRECTIVE",
            "TEMPLATE_REFERENCE",
            "ATTRIBUTE_BINDING",
            "INPUT_BINDING",
            "TWO_WAY_BINDING",
            "OUTPUT_BINDING"
          ]
        }
      ]
    },
  }
);
