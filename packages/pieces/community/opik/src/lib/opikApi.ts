export async function listProjects(auth: OpikAuthValue): Promise<{ name: string; id: string }[]> {
  const { baseUrl, apiKey } = auth;
  const response = await httpClient.sendRequest<{
    content: Array<{ name: string; id: string }>
  }>({
    method: HttpMethod.GET,
  url: `${baseUrl}/projects`,
    headers: {
      authorization: apiKey ?? '',
      'Comet-Workspace': auth.workspace ?? '',
      Accept: 'application/json',
    },
  });
  return response.body.content || [];
}
import { httpClient, HttpMethod, QueryParams } from '@activepieces/pieces-common';
import { OpikAuthValue } from '../..';


export async function getPromptByName(auth: OpikAuthValue, promptId: string, versionId?: string) {
  const { baseUrl, apiKey, workspace, project } = auth;
  // If versionId is provided, fetch that version directly
  let promptVersion: any;
  if (versionId) {
    const versionResponse = await httpClient.sendRequest<any>({
      method: HttpMethod.GET,
  url: `${baseUrl}/prompts/${promptId}/versions/${versionId}`,
      headers: {
        authorization: apiKey ?? '',
        ...(workspace ? { 'Comet-Workspace': workspace } : {}),
        Accept: 'application/json',
      },
    });
    promptVersion = versionResponse.body;
  } else {
    // If no versionId, fetch the prompt and use latest_version
    const promptDetailResponse = await httpClient.sendRequest<any>({
      method: HttpMethod.GET,
  url: `${baseUrl}/prompts/${promptId}`,
      headers: {
        authorization: apiKey ?? '',
        ...(workspace ? { 'Comet-Workspace': workspace } : {}),
        Accept: 'application/json',
      },
    });
    promptVersion = promptDetailResponse.body.latest_version;
  }
  return {
    template: promptVersion.template,
    metadata: promptVersion.metadata,
    version: promptVersion.id,
    prompt_id: promptId,
  };
}

// Traces
export async function createTrace(auth: OpikAuthValue, trace: any) {
  return httpClient.sendRequest<any>({
    method: HttpMethod.POST,
  url: `${auth.baseUrl}/traces`,
    headers: {
      authorization: auth.apiKey ?? '',
      ...(auth.workspace ? { 'Comet-Workspace': auth.workspace } : {}),
      Accept: 'application/json',
    },
    body: trace,
  });
}

export async function updateTrace(auth: OpikAuthValue, traceId: string, update: any) {
  return httpClient.sendRequest<any>({
    method: HttpMethod.PATCH,
  url: `${auth.baseUrl}/traces/${traceId}`,
    headers: {
      authorization: auth.apiKey ?? '',
      ...(auth.workspace ? { 'Comet-Workspace': auth.workspace } : {}),
      Accept: 'application/json',
    },
    body: update,
  });
}

export async function getTraceById(auth: OpikAuthValue, traceId: string) {
  return httpClient.sendRequest<any>({
    method: HttpMethod.GET,
  url: `${auth.baseUrl}/traces/${traceId}`,
    headers: {
      authorization: auth.apiKey ?? '',
      ...(auth.workspace ? { 'Comet-Workspace': auth.workspace } : {}),
      Accept: 'application/json',
    },
  });
}

// Spans
export async function createSpan(auth: OpikAuthValue, span: any) {
  return httpClient.sendRequest<any>({
    method: HttpMethod.POST,
  url: `${auth.baseUrl}/spans`,
    headers: {
      authorization: auth.apiKey ?? '',
      ...(auth.workspace ? { 'Comet-Workspace': auth.workspace } : {}),
      Accept: 'application/json',
    },
    body: span,
  });
}

export async function updateSpan(auth: OpikAuthValue, spanId: string, update: any) {
  return httpClient.sendRequest<any>({
    method: HttpMethod.PATCH,
  url: `${auth.baseUrl}/spans/${spanId}`,
    headers: {
      authorization: auth.apiKey ?? '',
      ...(auth.workspace ? { 'Comet-Workspace': auth.workspace } : {}),
      Accept: 'application/json',
    },
    body: update,
  });
}

export async function getSpanById(auth: OpikAuthValue, spanId: string) {
  return httpClient.sendRequest<any>({
    method: HttpMethod.GET,
  url: `${auth.baseUrl}/spans/${spanId}`,
    headers: {
      authorization: auth.apiKey ?? '',
      ...(auth.workspace ? { 'Comet-Workspace': auth.workspace } : {}),
      Accept: 'application/json',
    },
  });
}
