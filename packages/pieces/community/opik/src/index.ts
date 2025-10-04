import { createPiece, PieceAuth, Property } from "@activepieces/pieces-framework";
import { getPrompt } from './lib/actions/get-prompt';
import { listProjects } from './lib/opikApi';
// import { getTrace } from './lib/actions/get-trace';
// import { startTrace } from './lib/actions/start-trace';
// import { stopTrace } from './lib/actions/stop-trace';
// import { getSpan } from './lib/actions/get-span';
// import { startSpan } from './lib/actions/start-span';
// import { stopSpan } from './lib/actions/stop-span';
// import { updateTrace } from './lib/actions/update-trace';
// import { generateUniqueIdAction } from './lib/actions/generate-ids';

export type OpikAuthValue = {
  apiKey?: string;
  baseUrl: string;
  workspace?: string;
  project?: string;
};

export const opikAuth = PieceAuth.CustomAuth({
  description: 'Connect to Opik Cloud or self-hosted instance',
  required: true,
  props: {
    baseUrl: Property.ShortText({
      displayName: 'Opik URL',
      description: 'URL of your Opik instance (e.g., https://www.comet.com/opik/api/v1/private or http://localhost:5173/api/v1/private for self-hosted)',
      required: true,
      defaultValue: 'https://www.comet.com/opik/api/v1/private',
    }),
    apiKey: Property.ShortText({
      displayName: 'API Key',
      description: 'API key for Opik Cloud',
      required: true,
    }),
    workspace: Property.ShortText({
      displayName: 'Workspace',
      description: 'Opik workspace name (optional, defaults to your account default)',
      required: false,
    }),
    project: Property.ShortText({
      displayName: 'Project',
      description: 'Opik project name (optional, defaults to your account default)',
      required: false,
    }),
  },
  validate: async ({ auth }) => {
    const typedAuth = auth as OpikAuthValue;
    if (!typedAuth.baseUrl || !typedAuth.apiKey) {
      return {
        valid: false,
        error: 'Base URL and API Key are required',
      };
    }
    const url = `${typedAuth.baseUrl}/v1/private/projects`;
    try {
      // Try to list projects to check connection
      const projects = await listProjects(typedAuth);
      if (typedAuth.project) {
        const found = projects.some(p => p.name === typedAuth.project);
        if (!found) {
          return {
            valid: false,
            error: `Project "${typedAuth.project}" not found in Opik instance.\nParams: ${JSON.stringify(typedAuth, null, 2)}\nURL: ${url}`,
          };
        }
      }
      return { valid: true };
    } catch (error) {
      return {
        valid: false,
        error: `Failed to connect to Opik instance.\nParams: ${JSON.stringify(typedAuth, null, 2)}\nURL: ${url}\nError: ${error instanceof Error ? error.message : String(error)}`,
      };
    }
  },
});

export const opik = createPiece({
  displayName: "Opik",
  auth: opikAuth,
  minimumSupportedRelease: '0.36.1',
  logoUrl: "https://cdn.activepieces.com/pieces/opik.png",
  authors: [],
  actions: [
    getPrompt,
    // getTrace,
    // startTrace,
    // stopTrace,
    // getSpan,
    // startSpan,
    // stopSpan,
    // updateTrace,
    // generateUniqueIdAction,
  ],
  triggers: [],
});
