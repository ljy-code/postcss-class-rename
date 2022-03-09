const replaceClass = (root, pattern, replacement) => {
  if (typeof pattern !== 'string') {
    return;
  }

  root.walk(rule => {
    const regex = new RegExp(pattern, 'gi');

    if (rule.type === 'rule') {
      rule.selector = rule.selector.replace(regex, replacement);
    } else if (rule.type === 'atrule') {
      rule.params = rule.params.replace(regex, replacement);
    }
  });
};

const plugin = (options = {}) => {
  const isObject = typeof options === 'object' && options instanceof Object;

  if (!isObject) {
    return;
  }

  return {
    postcssPlugin: 'postcss-class-rename',
    Once(root) {
      const ruleEntries = Object.entries(options);
      for (let i = 0; i < ruleEntries.length; i++) {
        const [regex, replacement] = ruleEntries[i];
        replaceClass(root, regex, replacement);
      }
    },
  };
};

plugin.postcss = true;

module.exports = plugin;
