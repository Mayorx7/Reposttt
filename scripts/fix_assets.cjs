const fs = require('fs');
const path = require('path');

const imgMap = {
  'images/campaigns/neon-riot.jpg': 'https://images.unsplash.com/photo-1540039155732-6761b54cb116?w=600&h=800&fit=crop',
  'images/campaigns/kicks-district.jpg': 'https://images.unsplash.com/photo-1552346154-21d32810aba3?w=600&h=800&fit=crop',
  'images/campaigns/midnight-sun-ep.jpg': 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&h=800&fit=crop',
  'images/campaigns/crave-cart.jpg': 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&h=800&fit=crop',
  'images/campaigns/thrift-thread.jpg': 'https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?w=600&h=800&fit=crop',
  'images/campaigns/finals-tutoring.jpg': 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&h=800&fit=crop'
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
      
      // Fix Naira character encoding by using HTML entity or Unicode escape
      if (fullPath.endsWith('.html')) {
        content = content.replace(/₦/g, '&#8358;');
      } else if (fullPath.endsWith('.js')) {
        content = content.replace(/₦/g, '\\u20A6');
      }

      // Replace images
      for (const [local, remote] of Object.entries(imgMap)) {
        content = content.split(local).join(remote);
      }
      
      fs.writeFileSync(fullPath, content, 'utf8');
    }
  });
}

fixFiles('.');
console.log('Fixed images and Naira symbols.');
