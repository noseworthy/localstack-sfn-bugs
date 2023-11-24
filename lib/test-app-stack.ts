import {
    aws_lambda as lambda,
    aws_lambda_nodejs as lambdaNodeJs,
    aws_stepfunctions as sfn,
    aws_stepfunctions_tasks as tasks,
    Stack,
    StackProps,
    Duration,
} from 'aws-cdk-lib';
import {Construct} from 'constructs';

import {Lambdas} from "./lambdas/lambdas";

export class TestAppStack extends Stack {
    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);

        const lambdas = new Lambdas(this, 'lambdas');

        const quickTask = new tasks.LambdaInvoke(this, 'quick-task', {
            lambdaFunction: lambdas.quickLambda,
        });

        const longRunningTask = new tasks.LambdaInvoke(this, 'long-running-task', {
            lambdaFunction: lambdas.longRunningLambda,
            taskTimeout: sfn.Timeout.duration(Duration.minutes(15)),
        });

        const stateMachine = new sfn.StateMachine(this, 'state-machine', {
            stateMachineType: sfn.StateMachineType.STANDARD,
            definitionBody: sfn.DefinitionBody.fromChainable(
                sfn.Chain.start(quickTask).next(longRunningTask)),
        });

        new lambdaNodeJs.NodejsFunction(this, 'trigger', {
            functionName: 'trigger-state-machine',
            runtime: lambda.Runtime.NODEJS_20_X,
            environment: {
                AWS_ENDPOINT_URL: 'https://localhost.localstack.cloud:4566',
                STATE_MACHINE_ARN: stateMachine.stateMachineArn,
            }
        });
    }
}
