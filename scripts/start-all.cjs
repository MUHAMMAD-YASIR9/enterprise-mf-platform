const { spawn } = require('node:child_process');
const readline = require('node:readline');

const services = [
  { name: 'shell', script: 'start:shell', color: '\x1b[36m' },
  { name: 'dashboard', script: 'start:mfe-dashboard', color: '\x1b[33m' },
  { name: 'orders', script: 'start:mfe-orders', color: '\x1b[32m' },
  { name: 'admin', script: 'start:mfe-admin', color: '\x1b[35m' },
];

const reset = '\x1b[0m';
const children = [];
let shuttingDown = false;

function pipeOutput(stream, service, target) {
  const rl = readline.createInterface({ input: stream });

  rl.on('line', (line) => {
    target.write(`${service.color}[${service.name}]${reset} ${line}\n`);
  });

  return rl;
}

function shutdown(signal) {
  if (shuttingDown) {
    return;
  }

  shuttingDown = true;
  process.stdout.write(`\nStopping dev servers (${signal})...\n`);

  for (const child of children) {
    if (!child.killed) {
      child.kill('SIGINT');
    }
  }
}

for (const service of services) {
  const command =
    process.platform === 'win32'
      ? { file: 'cmd.exe', args: ['/d', '/s', '/c', `npm run ${service.script}`] }
      : { file: 'npm', args: ['run', service.script] };

  const child = spawn(command.file, command.args, {
    stdio: ['inherit', 'pipe', 'pipe'],
    env: process.env,
    windowsHide: false,
  });

  children.push(child);

  pipeOutput(child.stdout, service, process.stdout);
  pipeOutput(child.stderr, service, process.stderr);

  child.on('exit', (code, signal) => {
    if (!shuttingDown && code !== 0) {
      process.stderr.write(
        `\n${service.color}[${service.name}]${reset} exited unexpectedly with code ${code ?? 'null'}${signal ? ` (${signal})` : ''}.\n`,
      );
      shutdown('child-exit');
      process.exitCode = code ?? 1;
    }
  });
}

process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));

process.on('exit', () => {
  for (const child of children) {
    if (!child.killed) {
      child.kill('SIGINT');
    }
  }
});
