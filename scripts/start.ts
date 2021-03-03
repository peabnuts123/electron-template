import Bundler, { ParcelOptions } from 'parcel-bundler';
import { spawn } from 'child_process';
import path from 'path';

const __src = path.join(__dirname, '../src');
const entryPoint = path.join(__src, 'www/index.html');

const options: ParcelOptions = {
  outDir: './build',
  publicUrl: './',

  hmr: false,
};

let isElectronRunning: boolean = false;

void (async () => {
  const bundler = new Bundler(entryPoint, options);

  bundler.on('bundled', (_bundle) => {
    if (isElectronRunning === false) {
      isElectronRunning = true;

      const electronProcess = spawn('npm', ['run', 'electron'], {
        stdio: ['ignore', 'inherit', 'inherit'],
        shell: true,
      });
      electronProcess.on('close', () => {
        console.log("Electron window closed. Exiting...");
        process.exit(electronProcess.exitCode || 0);
      });
    }
  });

  await bundler.bundle();
})();
