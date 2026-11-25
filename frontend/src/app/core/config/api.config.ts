const configuredUrl = (globalThis as { __API_URL__?: string }).__API_URL__;

export const API_BASE_URL = (configuredUrl || 'http://localhost:8080').replace(/\/+$/, '');
