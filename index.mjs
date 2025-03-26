import { promises as fs } from 'fs';

async function readdir(dir) {
  const currentDirectory = process.cwd();
  console.log(`File reading started for ${dir || currentDirectory} directory`);
  const files = await fs.readdir(dir || currentDirectory, { withFileTypes: true });

  const publicFiles = [];
  const hiddenFiles = [];

  files.forEach(file => {
    if (file.name.startsWith('.')) {
      hiddenFiles.push(file.name);
    } else if (file.isFile()) {
      publicFiles.push(file.name);
    }
  });

  console.log(`Public Files: ${publicFiles.length ? publicFiles.join(', ') : 'No public files found'}`);
  console.log(`Hidden Files: ${hiddenFiles.length ? hiddenFiles.join(', ') : 'No hidden files found'}\n`);
}

// Current directory
await readdir();

// DummyFolder directory
await readdir('dummyFolder');

// InnerFolder directory
await readdir('dummyFolder/innerFolder');
