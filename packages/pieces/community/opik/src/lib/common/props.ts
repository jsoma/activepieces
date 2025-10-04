import { Property } from '@activepieces/pieces-framework';
import { OpikAuthValue } from '../..';
import { httpClient, HttpMethod } from '@activepieces/pieces-common';

export const promptProp = () =>
  Property.Dropdown({
    displayName: 'Prompt',
    description: 'Select a prompt from your Opik library',
    required: true,
    refreshers: ['auth'],
    options: async ({ auth }) => {
      const authValue = auth as OpikAuthValue;
      const response = await httpClient.sendRequest<{ content: { id: string; name: string }[] }>({
        method: HttpMethod.GET,
        url: `${authValue.baseUrl}/prompts`,
        headers: {
          authorization: authValue.apiKey ?? '',
          ...(authValue.workspace ? { 'Comet-Workspace': authValue.workspace } : {}),
        },
      });
      const options = (response.body.content ?? []).map((prompt) => ({
        label: prompt.name,
        value: prompt.id,
      }));
      return {
        disabled: false,
        options,
      };
    },
  });

export const promptVersionProp = () =>
  Property.Dropdown({
    displayName: 'Prompt Version',
    description: 'Select a version for the selected prompt',
    required: false,
    refreshers: ['prompt'],
    options: async ({ auth, prompt }) => {
      if (!prompt) {
        return {
          disabled: true,
          options: [],
          placeholder: 'Select a prompt first',
        };
      }
      const authValue = auth as OpikAuthValue;
      const response = await httpClient.sendRequest<{ content: { id: string; change_description?: string }[] }>({
        method: HttpMethod.GET,
        url: `${authValue.baseUrl}/prompts/${prompt}/versions`,
        headers: {
          authorization: authValue.apiKey ?? '',
          ...(authValue.workspace ? { 'Comet-Workspace': authValue.workspace } : {}),
        },
      });
      const options = (response.body.content ?? []).map((version) => ({
        label: version.change_description || version.id,
        value: version.id,
      }));
      return {
        disabled: false,
        options,
      };
    },
  });
