import { createAction, Property } from '@activepieces/pieces-framework';
import { opikAuth, OpikAuthValue } from '../..';
import { createTrace } from '../opikApi';
import { generateUniqueId } from './generate-ids';

export const startTrace = createAction({
  auth: opikAuth,
  name: 'startTrace',
  displayName: 'Start Trace',
  description: 'Create a new trace in Opik',
  props: {
    name: Property.ShortText({
      displayName: 'Trace Name',
      description: 'Name for the trace',
      required: true,
    }),
    trace_id: Property.ShortText({
      displayName: 'Trace ID',
      description: 'Optional: Provide a trace ID, or one will be generated automatically',
      required: false,
    }),
    start_time: Property.ShortText({
      displayName: 'Start Time',
      description: 'ISO string for start time',
      required: true,
    }),
    project_name: Property.ShortText({
      displayName: 'Project Name',
      description: 'Opik project name',
      required: false,
    }),
    input: Property.ShortText({
      displayName: 'Input',
      description: 'Input for the trace',
      required: false,
    }),
    thread_id: Property.ShortText({
      displayName: 'Thread ID',
      description: 'Optional thread ID to group traces into a conversation or session',
      required: false,
    }),
  },
  async run(context) {
    const auth = context.auth as OpikAuthValue;
    const traceId = context.propsValue.trace_id || generateUniqueId('trace');
    const trace = {
      trace_id: traceId,
      name: context.propsValue.name,
      start_time: context.propsValue.start_time,
      project_name: context.propsValue.project_name || auth.project,
      input: context.propsValue.input,
      thread_id: context.propsValue.thread_id,
    };
    const response = await createTrace(auth, trace);
    return {
      ...response.body,
      trace_id: traceId,
    };
  },
});
