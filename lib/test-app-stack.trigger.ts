import { Handler } from 'aws-lambda';
import {SFNClient, StartExecutionCommand} from '@aws-sdk/client-sfn';

type TestEvent = {
    test: string;
};

const sfnClient = new SFNClient();

const STATE_MACHINE_ARN = process.env.STATE_MACHINE_ARN!;

export const handler: Handler<TestEvent> = async (event, context) => {
    console.log('trigger lambda invoked');
    console.log('event: ', event);
    console.log('context: ', context);

    await sfnClient.send(new StartExecutionCommand({
        stateMachineArn: STATE_MACHINE_ARN,
    }))

    console.log('long-running lambda finished');
    return {
        statusCode: 200,
        body: JSON.stringify({
        message: 'long-running lambda finished',
        input: event,
        }, null, 2),
    };
}
