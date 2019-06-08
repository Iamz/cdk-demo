import cdk = require("@aws-cdk/cdk");
import ec2 = require("@aws-cdk/aws-ec2");
import ecs = require("@aws-cdk/aws-ecs");
import ecs_patterns = require("@aws-cdk/aws-ecs-patterns");
import path = require("path");

export class CdkDemoStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const image = ecs.ContainerImage.fromAsset(this, "Image", {
      directory: path.join(__dirname, 'src')
    });

    const vpc = new ec2.Vpc(this, "Vpc", { natGateways: 1 });
    const cluster = new ecs.Cluster(this, "Cluster", { vpc });
    new ecs_patterns.LoadBalancedFargateService(this, "Service", {
      cluster,
      image,
      containerPort: 3000
    });
  }
}
