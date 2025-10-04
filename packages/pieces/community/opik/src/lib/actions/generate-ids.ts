import { createAction, Property } from '@activepieces/pieces-framework';

export function generateUniqueId(prefix = '') {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 10);
  return prefix ? `${prefix}-${timestamp}-${random}` : `${timestamp}-${random}`;
}

export const generateUniqueIdAction = createAction({
  name: 'generateUniqueId',
  displayName: 'Generate Unique ID',
  description: 'Generate a unique ID using timestamp and random hash. Use for threads, traces, spans, etc.',
  props: {
    prefix: Property.ShortText({
      displayName: 'Prefix',
      description: 'Optional prefix for the ID (e.g., user/session/type)',
      required: false,
    }),
  },
  async run(context) {
    const { prefix } = context.propsValue;
    return {
      id: generateUniqueId(prefix),
    };
  },
});
