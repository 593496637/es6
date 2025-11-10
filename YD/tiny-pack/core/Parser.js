const acorn = require('acorn');
const walk = require('acorn-walk');
const path = require('path');
const MagicString = require('magic-string');

class Parser {
  parse(source, parentPath) {
    const ast = acorn.parse(source, {
      ecmaVersion: 'latest',
      sourceType: 'module',
      allowHashBang: true,
    });
    const ms = new MagicString(source);
    const deps = [];
    let importIndex = 0;
    let exportIndex = 0;

    const toRelativeId = (importPath) => {
      const absPath = path.resolve(parentPath, importPath);
      return (
        './' + path.relative(process.cwd(), absPath).replace(/\\/g, '/')
      );
    };

    const extractNamesFromPattern = (node, names) => {
      switch (node.type) {
        case 'Identifier':
          names.push(node.name);
          break;
        case 'RestElement':
          extractNamesFromPattern(node.argument, names);
          break;
        case 'AssignmentPattern':
          extractNamesFromPattern(node.left, names);
          break;
        case 'ArrayPattern':
          node.elements.forEach((element) => {
            if (element) extractNamesFromPattern(element, names);
          });
          break;
        case 'ObjectPattern':
          node.properties.forEach((prop) => {
            if (prop.type === 'RestElement') {
              extractNamesFromPattern(prop.argument, names);
            } else {
              extractNamesFromPattern(prop.value, names);
            }
          });
          break;
        default:
          break;
      }
    };

    const collectDeclaredNames = (declaration) => {
      const names = [];
      switch (declaration.type) {
        case 'VariableDeclaration':
          declaration.declarations.forEach((decl) => {
            extractNamesFromPattern(decl.id, names);
          });
          break;
        case 'FunctionDeclaration':
        case 'ClassDeclaration':
          if (declaration.id) {
            names.push(declaration.id.name);
          }
          break;
        default:
          break;
      }
      return names;
    };

    const handleImport = (node) => {
      const relId = toRelativeId(node.source.value);
      deps.push(relId);

      if (!node.specifiers.length) {
        ms.overwrite(node.start, node.end, `require('${relId}');`);
        return;
      }

      const tempVar = `__tiny_pack_import_${importIndex++}`;
      const statements = [`const ${tempVar} = require('${relId}');`];

      node.specifiers.forEach((spec) => {
        if (spec.type === 'ImportDefaultSpecifier') {
          statements.push(
            `const ${spec.local.name} = ${tempVar} && ${tempVar}.__esModule ? ${tempVar}.default : ${tempVar};`
          );
        } else if (spec.type === 'ImportNamespaceSpecifier') {
          statements.push(`const ${spec.local.name} = ${tempVar};`);
        }
      });

      const namedSpecs = node.specifiers.filter(
        (spec) => spec.type === 'ImportSpecifier'
      );
      if (namedSpecs.length) {
        const parts = namedSpecs.map((spec) =>
          spec.imported.name === spec.local.name
            ? spec.local.name
            : `${spec.imported.name}: ${spec.local.name}`
        );
        statements.push(`const { ${parts.join(', ')} } = ${tempVar};`);
      }

      ms.overwrite(node.start, node.end, statements.join('\n'));
    };

    const handleExportDefault = (node) => {
      const decl = node.declaration;
      if (
        decl.type === 'FunctionDeclaration' ||
        decl.type === 'ClassDeclaration'
      ) {
        if (decl.id && decl.id.name) {
          const code = source.slice(decl.start, decl.end);
          ms.overwrite(
            node.start,
            node.end,
            `${code}\nexports.default = ${decl.id.name};\nexports.__esModule = true;`
          );
        } else {
          const temp = `__tiny_pack_default_${exportIndex++}`;
          const code = source.slice(decl.start, decl.end);
          ms.overwrite(
            node.start,
            node.end,
            `const ${temp} = ${code};\nexports.default = ${temp};\nexports.__esModule = true;`
          );
        }
        return;
      }

      const expressionCode = source.slice(decl.start, decl.end);
      ms.overwrite(
        node.start,
        node.end,
        `exports.default = ${expressionCode};\nexports.__esModule = true;`
      );
    };

    const handleExportNamed = (node) => {
      if (node.source) {
        throw new Error(
          'Re-export syntax (export ... from ...) is not supported in TinyPack.'
        );
      }

      if (node.declaration) {
        const declCode = source.slice(node.declaration.start, node.declaration.end);
        const names = collectDeclaredNames(node.declaration);
        const exportLines = names.map((name) => `exports.${name} = ${name};`);
        ms.overwrite(
          node.start,
          node.end,
          `${declCode}\n${exportLines.join('\n')}`
        );
        return;
      }

      const exportLines = node.specifiers.map((spec) => {
        const local = spec.local.name;
        const exported = spec.exported.name;
        return `exports.${exported} = ${local};`;
      });
      ms.overwrite(node.start, node.end, exportLines.join('\n'));
    };

    walk.simple(ast, {
      ImportDeclaration: handleImport,
      ExportDefaultDeclaration: handleExportDefault,
      ExportNamedDeclaration: handleExportNamed,
    });

    return { transformedCode: ms.toString(), deps };
  }
}

module.exports = Parser;

