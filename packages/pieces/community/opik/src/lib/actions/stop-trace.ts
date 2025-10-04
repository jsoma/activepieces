import { createAction, Property } from '@activepieces/pieces-framework';
import { opikAuth, OpikAuthValue } from '../..';
import { updateTrace } from '../opikApi';

export const stopTrace = createAction({
  auth: opikAuth,
  name: 'stopTrace',
  displayName: 'Stop Trace',
  description: 'Update (stop) a trace in Opik',
  props: {
    traceId: Property.ShortText({
      displayName: 'Trace ID',
      description: 'ID of the trace to stop',
      required: true,
    }),
    end_time: Property.ShortText({
      displayName: 'End Time',
      description: 'ISO string for end time',
      required: true,
    }),
    output: Property.ShortText({
      displayName: 'Output',
      description: 'Output for the trace',
      required: false,
    }),
  },
  async run(context) {
    const auth = context.auth as OpikAuthValue;
    const update = {
      end_time: context.propsValue.end_time,
      output: context.propsValue.output,
    };
    const response = await updateTrace(auth, context.propsValue.traceId, update);
    return response.body;
  },
});
