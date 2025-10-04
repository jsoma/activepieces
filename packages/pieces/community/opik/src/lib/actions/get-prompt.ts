import { createAction } from '@activepieces/pieces-framework';
import { opikAuth, OpikAuthValue } from '../..';
import { getPromptByName } from '../opikApi';
import { promptProp, promptVersionProp } from '../common/props';

export const getPrompt = createAction({
  auth: opikAuth,
  name: 'getPrompt',
  displayName: 'Get prompt',
  description: 'Retrieve a prompt template from Opik prompt library',
  props: {
    prompt: promptProp(),
    version: promptVersionProp(),
  },
  async run(context) {
    const { prompt, version } = context.propsValue;
    const auth = context.auth as OpikAuthValue;
    return await getPromptByName(auth, prompt, version);
  },
});