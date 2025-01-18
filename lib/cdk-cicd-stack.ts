import * as cdk from 'aws-cdk-lib';
import { CodePipeline, ShellStep, CodePipelineSource } from 'aws-cdk-lib/pipelines';
import { Construct } from 'constructs';

export class CdkCicdStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    new CodePipeline(this, 'ChuckPipeline', {
      pipelineName: 'ChuckPipeline',
      synth: new ShellStep('Synth', {
        input: CodePipelineSource.gitHub('sycomorely/cdk-practice', 'main'),
        commands: [
          'npm ci',
          'npm run build',
          'npx cdk synth',
        ],
      }),
    });
  }
}
