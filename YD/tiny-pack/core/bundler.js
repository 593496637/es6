function bundler(modules, entry) {
  // Build a filename -> module index lookup
  const moduleIds = {};
  modules.forEach((mod, i) => {
    moduleIds[mod.filename] = i;
  });

  // Build module table entries with dependency mapping
  const moduleEntries = modules
    .map((mod) => {
      const mapping = {};
      mod.deps.forEach((dep) => {
        mapping[dep] = moduleIds[dep]; // Map dependency filenames to module ids
      });

      return `[function(require, module, exports){${mod.code}}, ${JSON.stringify(
        mapping,
      )}]`;
    })
    .join(",");

  const entryId =
    entry && Object.prototype.hasOwnProperty.call(moduleIds, entry)
      ? moduleIds[entry]
      : 0;

  // Construct final bundle string
  const result = `
  (function(modules){
    function require(id){
      const [fn, mapping] = modules[id];
      function localRequire(relPath){ return require(mapping[relPath]); }
      const module = { exports: {} };
      fn(localRequire, module, module.exports);
      return module.exports;
    }
    require(${entryId});
  })([${moduleEntries}])
  `;

  return result;
}

module.exports = bundler;

