import {Construct} from "constructs";
import {aws_lambda as lambda, aws_lambda_nodejs as lambdaNodeJs, Duration} from "aws-cdk-lib";

export class Lambdas extends Construct {
    public readonly quickLambda: lambdaNodeJs.NodejsFunction;

    public readonly longRunningLambda: lambdaNodeJs.NodejsFunction;

    constructor(scope: Construct, id: string) {
        super(scope, id);

        this.quickLambda = new lambdaNodeJs.NodejsFunction(this, 'quick', {
            runtime: lambda.Runtime.NODEJS_20_X,
        });

        this.longRunningLambda = new lambdaNodeJs.NodejsFunction(this, 'long-running', {
            runtime: lambda.Runtime.NODEJS_20_X,
            timeout: Duration.minutes(15),
        });
    }
}
