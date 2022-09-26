import { Duration } from 'aws-cdk-lib';
import { Code, IFunction } from 'aws-cdk-lib/aws-lambda';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Construct } from 'constructs';

export class CloudResumeConstruct extends Construct {
  // private members to be used across funcs in this class
  private readonly memorySize: number = 128;
  private readonly timeout: Duration = Duration.seconds(30);

  // expose this function to be referenced outside of this class
  public readonly PageVisitCountFunction: IFunction;

  constructor(scope: Construct, id: string) {
    super(scope, id);

    const pageVisitCountFunction: IFunction = new NodejsFunction(this, 'PageVisitCountFunction', {
      memorySize: this.memorySize,
      timeout: this.timeout,
      entry: Code.fromAsset('').path + '/page-visit-count-function.ts',
    });

    this.PageVisitCountFunction = pageVisitCountFunction;
  }
}
