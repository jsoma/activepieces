import { createAction, Property } from '@activepieces/pieces-framework';
import { opikAuth, OpikAuthValue } from '../..';
import { getSpanById } from '../opikApi';

export const getSpan = createAction({
  auth: opikAuth,
  name: 'getSpan',
  displayName: 'Get Span',
  description: 'Retrieve a span by its ID from Opik',
  props: {
    spanId: Property.ShortText({
      displayName: 'Span ID',
      description: 'The ID of the span to retrieve',
      required: true,
    }),
  },
  async run(context) {
    const { spanId } = context.propsValue;
    const auth = context.auth as OpikAuthValue;
    const response = await getSpanById(auth, spanId);
    return response.body;
  },
});
