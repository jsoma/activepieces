import { createAction, Property } from '@activepieces/pieces-framework';
import { opikAuth, OpikAuthValue } from '../..';
import { updateTrace as updateTraceApi } from '../opikApi';

export const updateTrace = createAction({
  auth: opikAuth,
  name: 'updateTrace',
  displayName: 'Update Trace',
  description: 'Update a trace by its ID.',
  props: {
    traceId: Property.ShortText({
      displayName: 'Trace ID',
      description: 'ID of the trace to update',
      required: true,
    }),
    end_time: Property.ShortText({
      displayName: 'End Time',
      description: 'ISO string for end time',
      required: false,
    }),
    output: Property.ShortText({
      displayName: 'Output',
      description: 'Output for the trace',
      required: false,
    }),
    name: Property.ShortText({
      displayName: 'Name',
      description: 'Name for the trace',
      required: false,
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
    metadata: Property.ShortText({
      displayName: 'Metadata',
      description: 'Metadata for the trace',
      required: false,
    }),
    tags: Property.Array({
      displayName: 'Tags',
      description: 'Tags for the trace',
      required: false,
    }),
    error_info: Property.ShortText({
      displayName: 'Error Info',
      description: 'Error information for the trace',
      required: false,
    }),
    thread_id: Property.ShortText({
      displayName: 'Thread ID',
      description: 'Thread ID to group traces',
      required: false,
    }),
  },
  async run(context) {
    const auth = context.auth as OpikAuthValue;
    const {
      traceId,
      end_time,
      output,
      name,
      project_name,
      input,
      metadata,
      tags,
      error_info,
      thread_id,
    } = context.propsValue;
    const update: any = {};
    if (end_time) update.end_time = end_time;
    if (output) update.output = output;
    if (name) update.name = name;
    if (project_name) update.project_name = project_name;
    if (input) update.input = input;
    if (metadata) update.metadata = metadata;
    if (tags) update.tags = tags;
    if (error_info) update.error_info = error_info;
    if (thread_id) update.thread_id = thread_id;
    const response = await updateTraceApi(auth, traceId, update);
    return response.body;
  },
});
