const TokenValidator = require('twilio-flex-token-validator').functionValidator;

/**
 * @param {import('@twilio-labs/serverless-runtime-types/types').Context} context
 * @param {} event
 * @param {import('@twilio-labs/serverless-runtime-types/types').ServerlessCallback} callback
 */
exports.handler = TokenValidator(async function(context, event, callback) {
  const client = context.getTwilioClient();

  try {
    const tasks = await client.taskrouter
      .workspaces(context.FLEX_TR_WORKSPACE_SID)
      .tasks.list();

    const response = new Twilio.Response();

    response.appendHeader('Access-Control-Allow-Origin', '*');
    response.appendHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
    response.appendHeader('Content-Type', 'application/json');
    response.appendHeader('Access-Control-Allow-Headers', 'Content-Type');
    response.setBody({
      tasks: tasks.map(task => {
        const { worker_sid } = JSON.parse(task.attributes);

        return {
          worker_sid,
          age: task.age,
          attributes: task.attributes,
          queue_name: task.taskQueueFriendlyName,
          status: task.assignmentStatus,
          task_sid: task.sid
        };
      })
    });

    callback(null, response);
  } catch (err) {
    console.error(err);
    callback(err);
  }
});
