CloudFormation


A. Create CloudFormation Template
B. Create CloudFormation Stack


A. Create CloudFormation Template
=================================
1. You would need a Cloud9 environment to do this
2. Follow through with the notes on EB and setup the StudySync Node.js project before continueing with this
3. Navigate to the root folder of your Cloud9 setup
      cd ~/environment

4. Create a directory for our CloudFormation project
      mkdir cfn-project

5. Create the Template file inside our CloudFormation project folder
      touch cfn-project/template.yaml

6. Open the template file 
      c9 cfn-project/template.yaml

9. Enter the following contents
      AWSTemplateFormatVersion: 2010-09-09
      Description: >-
        Infrastructure for StudySync
      Parameters:
        ImageId:
          Description: AMI to use eg. ami-0341aeea105412b57 // Image ID for Amazon Linux 2 AMI (HVM) - Kernel 5.10, SSD Volume Type
          Default: ami-0341aeea105412b57
          Type: String
        VpcId:
          Description: The VPC useed by the SG
          Type: String
      Resources:
        WebServer:
          Type: AWS::EC2::Instance // Documentation - https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-ec2-instance.html
          Properties:
            InstanceType: t2.micro
            ImageId: !Ref ImageId
            SecurityGroupIds:
              - !GetAtt SecurityGroup.GroupId
            UserData:
              'Fn::Base64':
                #!/usr/bin/env bash
                yum -y update
                su ec2-user
                sudo yum install http -y
                sudo service httpd start
                sudo service httpd enable
        SecurityGroup:
          Type: AWS::EC2::SecurityGroup
          Properties:
            VpcId: !Ref VpcId
            GroupDescription: 'Open port 80'
            SecurityGroupIngress: 
              - IpProtocol: tcp
                FromPort: 80
                ToPort: 80
                CidrIp: "0.0.0.0/0"
        Outputs:
          PublicIp:
            Value: !GetAtt WebServer.PublicIp

10. Install and use cfn-lint in Cloud9 to verify that your script is good
      cd ~/environment
      npm i cfn-lint -g

11. Change focus into the project folder and run the following validation command
      cd cfn-project/
      cfn-lint validate template.yaml

12. Create an S3 Bucket to your CloudFormation templates
      aws s3api create-bucket --bucket study-sync-project --region us-east-1

13. Once the above command is successful, it would return the location on the prompt i.e.
      {
        "Location": "/study-sync-project"
      }

14. Write a script to automate the process of writing the CFN Template to your S3 Bucket
      cd cfn-project/
      touch update.sh
      chmod u+x update.sh

15. Update the update.sh file with the below:
      #!/usr/bin/env bash
      aws s3 cp template.yaml s3://study-sync-project/template.yaml

      aws cloudformation create-stack \
      --region us-east-1 \
      --stack-name StudySync \
      --template-url https://study-sync-project.s3.amazon.com/template.yaml \
      --parameters \
      ParameterKey=VpcId,ParameterValue=vpc-0c2b80776 // Your VPC ID    

16. Execute the update.sh shell 
      cd cfn-project/
      ./update.sh
      // Output
      // upload: ./template.yaml to s3://study-sync-project/template.yaml



B. Create CloudFormation Stack
==============================
1. Follow the command below to create a CloudFormation Stack
      Console => CLoudFormation => Create Stack => With new resources (standard)
            Create Stack:
                  Prepare template: Template is ready 
                  Template Source: Amazon S3 URL
                  Amazon S3 URL: Enter URL to Template file in S3 Bucket
            Specify Stack Details:
                  Stack Name: Enter your Project Name (StudySync)

2. Create Stack Button.  



C. Update CloudFormation Stack
==============================
1. Update the Project template.yaml file accordingly
      c9 cfn-project/template.yaml
  
2. Update the update.sh accordingly
      #!/usr/bin/env bash
      aws s3 cp template.yaml s3://study-sync-project/template.yaml

      aws cloudformation update-stack \
      --region us-east-1 \
      --stack-name StudySync \
      --template-url https://study-sync-project.s3.amazon.com/template.yaml \
      --parameters \
      ParameterKey=VpcId,ParameterValue=vpc-0c2b80776 // Your VPC ID    
      
3. Run a lint validation on your script
      cd cfn-project/
      cfn-lint validate template.yaml

4. Execute the update.sh shell 
      cd cfn-project/
      ./update.sh
      // Output
      // upload: ./template.yaml to s3://study-sync-project/template.yaml

5. Follow the command below to update a CloudFormation Stack
      Console => CloudFormation => Select Stack => Update
            Update Stack:
                  Prepare template: Replace current template 
                  Template Source: Amazon S3 URL
                  Amazon S3 URL: Enter URL to Template file in S3 Bucket
            Specify Stack Details:
                  Parameters:
                        ImageId: Enter Image ID to use
                        VpcID: Enter VPC ID      


D. Delete CloudFormation Stack
==============================
1. Run the command below in Cloud9
      aws cloudformation delete-stack --stack-name StudySync
      
2. Do double as delete process do fail sometimes      



EOF
