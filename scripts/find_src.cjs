const fs = require('fs');
fs.readdirSync('.').filter(f => f.endsWith('.html') || f.endsWith('.js')).forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  const matches = content.match(/src=[\"'](.*?)[\"']/g);
  if (matches) {
    console.log(f + ': ' + matches.join(', '));
  }
});
