const logs = [];

function addLog(user, system, ip) {
  logs.push({
    user,
    system,
    ip,
    time: new Date().toISOString()
  });
}

function getLogs() {
  return logs.slice(-100);
}

module.exports = { addLog, getLogs };