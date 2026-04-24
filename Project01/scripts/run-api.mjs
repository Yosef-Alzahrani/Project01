import { spawn } from 'node:child_process';
import { existsSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

const scriptDir = dirname(fileURLToPath(import.meta.url));
const workspaceRoot = resolve(scriptDir, '..');
const venvPython = process.platform === 'win32'
  ? resolve(workspaceRoot, '.venv', 'Scripts', 'python.exe')
  : resolve(workspaceRoot, '.venv', 'bin', 'python');

const fallbackPython = process.platform === 'win32' ? 'python' : 'python3';
const pythonCommand = existsSync(venvPython) ? venvPython : fallbackPython;

if (pythonCommand === fallbackPython) {
  console.warn(`Local virtual environment Python not found at ${venvPython}. Falling back to ${fallbackPython}.`);
} else {
  console.log(`Starting API with ${pythonCommand}`);
}

const child = spawn(
  pythonCommand,
  ['-m', 'uvicorn', 'server_py.main:app', ...process.argv.slice(2)],
  {
    cwd: workspaceRoot,
    env: process.env,
    stdio: 'inherit',
  },
);

child.on('exit', (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
    return;
  }

  process.exit(code ?? 0);
});

child.on('error', (error) => {
  console.error(`Failed to start API server: ${error.message}`);
  process.exit(1);
});