require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { Anthropic } = require('@anthropic-ai/sdk');

/**
 * Simple agent runner that loads an agent prompt from .claude/agents/<name>.md
 * and runs a request with provided input.
 * Usage:
 *  Configuração:
 *   - Defina ANTHROPIC_API_KEY no arquivo .env (ou no ambiente)
 *  Uso:
 *   - node scripts/claude-agent-runner.js <agent-name> "<user-input>"
 */

async function main() {
  const agentName = process.argv[2];
  const userInput = process.argv.slice(3).join(' ').trim();
  if (!agentName) {
    console.error('Missing <agent-name>. Example: node scripts/claude-agent-runner.js frontend-developer "Ajude a melhorar a página index.html"');
    process.exit(1);
  }
  if (!userInput) {
    console.error('Missing <user-input>. Provide an instruction or question for the agent.');
    process.exit(1);
  }

  const agentsDir = path.join(process.cwd(), '.claude', 'agents');
  const agentPath = path.join(agentsDir, `${agentName}.md`);
  if (!fs.existsSync(agentPath)) {
    console.error(`Agent file not found: ${agentPath}`);
    const available = fs.readdirSync(agentsDir).filter(f => f.endsWith('.md')).map(f => f.replace(/\.md$/, '')).join(', ');
    console.error(`Available agents: ${available}`);
    process.exit(1);
  }

  const agentPrompt = fs.readFileSync(agentPath, 'utf8');
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    console.error('ANTHROPIC_API_KEY ausente. Configure no .env ou variável de ambiente.');
    process.exit(1);
  }
  const client = new Anthropic({ apiKey });

  console.log(`\n▶ Running agent: ${agentName}`);
  console.log(`• Input: ${userInput}\n`);

  // You can switch models as needed; keeping a generic default
  const model = process.env.CLAUDE_MODEL || 'claude-3-5-sonnet-20240620';

  const response = await client.messages.create({
    model,
    max_tokens: 1200,
    system: agentPrompt,
    messages: [
      { role: 'user', content: userInput }
    ]
  });

  const text = response.content?.map(c => c.text).join('\n') || '';
  console.log('=== Agent Response ===');
  console.log(text);
}

main().catch(err => {
  console.error('Agent runner error:', err);
  process.exit(1);
});