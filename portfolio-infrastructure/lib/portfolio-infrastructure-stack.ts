import * as cdk from 'aws-cdk-lib';
import * as amplify from '@aws-cdk/aws-amplify-alpha';
import * as codebuild from 'aws-cdk-lib/aws-codebuild';
import { Construct } from 'constructs';

export class PortfolioInfrastructureStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

    // example resource
    // const queue = new sqs.Queue(this, 'PortfolioInfrastructureQueue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });

    //Amplify Application
    const amplifyApp = new amplify.App(this,'PortfolioApplication',{
      appName: 'Portfolio',
      // Connect to my github repo
      sourceCodeProvider: new amplify.GitHubSourceCodeProvider({
        owner:'Zaid-dagbanbia',
        repository: 'portfolio-cloud',
        oauthToken: cdk.SecretValue.secretsManager('github-token')
      }),
      // Build Specification
      buildSpec: codebuild.BuildSpec.fromObjectToYaml({
        version: '1.0',
        frontend:{
          phases:{
            preBuild:{
              commands:[
                'echo "starting this build"',
                'cd portfolio-cloud',
                'npm install'
              ]
            },
            build:{
              commands:[
                'echo "building our next.js app..."',
                'npm run build',
                'echo "build is completed"'
              ],
            },
          },
          artifacts:{
            baseDirectory: 'portfolio-cloud/out',
            files: ['**/*'],
          },
          cache: {
            paths: [
              'node_modules/**/*',
              '.next/cache/**/*'
            ]
          }
        }

      })
      


    })
    
    // Add main branch with auto build enabled
    const mainBranch = amplifyApp.addBranch('main', {
      autoBuild: true,
      stage: 'PRODUCTION'  // Set as production branch
    });

    // Output the Amplify app URL
    new cdk.CfnOutput(this, 'AmplifyAppURL', {
      value: `https://${amplifyApp.defaultDomain}`,
    });
    
    // Output the branch URL
    new cdk.CfnOutput(this, 'MainBranchURL', {
      value: `https://main.${amplifyApp.defaultDomain}`,
    });
  }
}
