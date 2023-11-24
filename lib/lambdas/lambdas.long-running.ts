import type { Handler } from 'aws-lambda';

type TestEvent = {
    test: string;
};

const THREE_MINUTES_IN_MILLISECONDS = 3 * 60 * 1000;

export const handler: Handler<TestEvent> = async (event, context) => {
    console.log('long-running lambda invoked');
    console.log('event: ', event);
    console.log('context: ', context);

    console.log('sleeping for 3 minutes');
    const finishedSleeping = await new Promise(resolve => setTimeout(() => {
        console.log('finished sleeping, resuming execution');
        resolve(true);
    }, THREE_MINUTES_IN_MILLISECONDS));

    console.log('long-running lambda finished', { finishedSleeping });
    return {
        statusCode: 200,
        body: JSON.stringify({
        message: 'long-running lambda finished',
        input: event,
        }, null, 2),
    };
}
