import { agentConfig } from '../config/agent-config';

const BLAND_API_KEY = process.env.NEXT_PUBLIC_BLAND_API_KEY;
const BLAND_API_URL = 'https://api.bland.ai';
const BLAND_WEB_URL = 'https://web.bland.ai';

if (!BLAND_API_KEY) {
  throw new Error('BLAND_API_KEY is not set in environment variables');
}

export async function createWebAgent() {
  try {
    
    var agentUrl = `${BLAND_API_URL}/v1/agents`;
    console.log('Creating new web agent...' + BLAND_API_KEY);
    const response = await fetch(agentUrl, {
      method: 'POST',
      headers: {
        'authorization': BLAND_API_KEY,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(agentConfig)
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Agent creation error:', errorText);
      throw new Error(`Failed to create agent: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    console.log('Created agent:', data);
    return data;
  } catch (error) {
    console.error('Error creating agent:', error);
    throw error;
  }
}

export async function getSessionToken(agentId: string) {
  try {
    var sessionUrl = `${BLAND_API_URL}/v1/agents/${agentId}/authorize`;
    console.log("Session URL: " + sessionUrl);
    console.log("AgentId: " + agentId)
    const response = await fetch(sessionUrl, {
      method: 'POST',
      headers: {
        'authorization': BLAND_API_KEY,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({})
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API responded with status: ${response.status} - ${errorText}`);
    }

    return response.json();
  } catch (error) {
    console.error('Error getting session token:', error);
    throw error;
  }
} 