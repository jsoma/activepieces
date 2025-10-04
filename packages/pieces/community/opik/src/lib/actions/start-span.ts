import { createAction, Property } from '@activepieces/pieces-framework';
import { opikAuth, OpikAuthValue } from '../..';
import { createSpan } from '../opikApi';
import { generateUniqueId } from './generate-ids';

export const startSpan = createAction({
  auth: opikAuth,
  name: 'startSpan',
  displayName: 'Start Span',
  description: 'Create a new span in Opik',
  props: {
    name: Property.ShortText({
      displayName: 'Span Name',
      description: 'Name for the span',
      required: true,
    }),
    span_id: Property.ShortText({
      displayName: 'Span ID',
      description: 'Optional: Provide a span ID, or one will be generated automatically',
      required: false,
    }),
    start_time: Property.ShortText({
      displayName: 'Start Time',
      description: 'ISO string for start time',
      required: true,
    }),
    trace_id: Property.ShortText({
      displayName: 'Trace ID',
      description: 'Trace ID this span belongs to',
      required: true,
    }),
    input: Property.ShortText({
      displayName: 'Input',
      description: 'Input for the span',
      required: false,
    }),
  },
  async run(context) {
    const auth = context.auth as OpikAuthValue;
    const spanId = context.propsValue.span_id || generateUniqueId('span');
    const span = {
      span_id: spanId,
      name: context.propsValue.name,
      start_time: context.propsValue.start_time,
      trace_id: context.propsValue.trace_id,
      input: context.propsValue.input,
    };
    const response = await createSpan(auth, span);
    return {
      ...response.body,
      span_id: spanId,
    };
  },
});
