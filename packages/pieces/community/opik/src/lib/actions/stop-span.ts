import { createAction, Property } from '@activepieces/pieces-framework';
import { opikAuth, OpikAuthValue } from '../..';
import { updateSpan } from '../opikApi';

export const stopSpan = createAction({
  auth: opikAuth,
  name: 'stopSpan',
  displayName: 'Stop Span',
  description: 'Update (stop) a span in Opik',
  props: {
    spanId: Property.ShortText({
      displayName: 'Span ID',
      description: 'ID of the span to stop',
      required: true,
    }),
    end_time: Property.ShortText({
      displayName: 'End Time',
      description: 'ISO string for end time',
      required: true,
    }),
    output: Property.ShortText({
      displayName: 'Output',
      description: 'Output for the span',
      required: false,
    }),
  },
  async run(context) {
    const auth = context.auth as OpikAuthValue;
    const update = {
      end_time: context.propsValue.end_time,
      output: context.propsValue.output,
    };
    const response = await updateSpan(auth, context.propsValue.spanId, update);
    return response.body;
  },
});
