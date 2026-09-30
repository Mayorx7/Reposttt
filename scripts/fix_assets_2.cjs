const fs = require('fs');
const path = require('path');

const imgMap = {
  'https://images.unsplash.com/photo-1540039155732-6761b54cb116?w=600&h=800&fit=crop': 'https://picsum.photos/seed/neon/600/800',
  'https://images.unsplash.com/photo-1552346154-21d32810aba3?w=600&h=800&fit=crop': 'https://picsum.photos/seed/kicks/600/800',
  'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&h=800&fit=crop': 'https://picsum.photos/seed/midnight/600/800',
  'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&h=800&fit=crop': 'https://picsum.photos/seed/crave/600/800',
  'https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?w=600&h=800&fit=crop': 'https://picsum.photos/seed/thrift/600/800',
  'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&h=800&fit=crop': 'https://picsum.photos/seed/finals/600/800'
};

function fixFiles(dir) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      if (file !== 'node_modules' && file !== '.next' && file !== '.git') {
        fixFiles(fullPath);
      }
    } else if (fullPath.endsWith('.html') || fullPath.endsWith('.js')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      let changed = false;
      for (const [oldUrl, newUrl] of Object.entries(imgMap)) {
        if (content.includes(oldUrl)) {
          content = content.split(oldUrl).join(newUrl);
          changed = true;
        }
      }
      
      if (changed) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Updated ${fullPath}`);
      }
    }
  });
}

fixFiles('.');
console.log('Fixed placeholder images.');
