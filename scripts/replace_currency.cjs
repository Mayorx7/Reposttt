const fs = require('fs');
const path = require('path');

function replaceInFiles(dir) {
  try {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
      const fullPath = path.join(dir, file);
      // Skip node_modules and .next to avoid permission issues
      if (file === 'node_modules' || file === '.next' || file === '.git') return;
      
      try {
        if (fs.statSync(fullPath).isDirectory()) {
          replaceInFiles(fullPath);
        } else if (fullPath.endsWith('.html') || fullPath.endsWith('.js')) {
          let content = fs.readFileSync(fullPath, 'utf8');
          let modified = content
            .replace(/£/g, '₦')
            .replace(/\$62/g, '₦62,000');
          if (content !== modified) {
            fs.writeFileSync(fullPath, modified, 'utf8');
            console.log(`Updated ${fullPath}`);
          }
        }
      } catch (err) {
        // ignore individual file/folder errors
      }
    });
  } catch (err) {
    // ignore
  }
}

replaceInFiles('.');
console.log('Done');
