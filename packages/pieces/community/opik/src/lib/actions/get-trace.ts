import { createAction, Property } from '@activepieces/pieces-framework';
import { opikAuth, OpikAuthValue } from '../..';
import { getTraceById } from '../opikApi';

export const getTrace = createAction({
  auth: opikAuth,
  name: 'getTrace',
  displayName: 'Get Trace',
  description: 'Retrieve a trace by its ID from Opik',
  props: {
    traceId: Property.ShortText({
      displayName: 'Trace ID',
      description: 'The ID of the trace to retrieve',
      required: true,
    }),
  },
  async run(context) {
    const { traceId } = context.propsValue;
    const auth = context.auth as OpikAuthValue;
    const response = await getTraceById(auth, traceId);
    return response.body;
  },
});
