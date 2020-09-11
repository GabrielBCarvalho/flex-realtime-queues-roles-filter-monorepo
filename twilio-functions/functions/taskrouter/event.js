/**
 * @param {import('@twilio-labs/serverless-runtime-types/types').Context} context
 * @param {} event
 * @param {import('@twilio-labs/serverless-runtime-types/types').ServerlessCallback} callback
 */
exports.handler = async function(context, event, callback) {
  const client = context.getTwilioClient();

  try {
    if (event.EventType === 'reservation.created') {
      const taskAttributes = JSON.parse(event.TaskAttributes)
      await client.taskrouter.workspaces(context.FLEX_TR_WORKSPACE_SID)  
        .tasks(event.TaskSid)
        .update({
          attributes: JSON.stringify({
            ...taskAttributes,
            worker_sid: event.WorkerSid
          })
        })
    }

    callback(null);
  } catch (err) {
    console.error(err);
    callback(err);
  }
};
