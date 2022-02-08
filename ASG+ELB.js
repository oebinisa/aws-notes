ASG and ELB with a Target Policy

A. ASG
B. ELB

Note:
Always ensure you have your region set to N. Virginia before performing operations

A. Auto Scaling Group
1. We need to create an AMI image. To do this, we would need to launch an Instance
2. Launch an EC2 Instance
      Console => EC2 => Left Menu => Instances => Launch Instances
            Chooce AMI: Amazon Linux 2 // This is always up-to-date
            Instance Type: General Purpose - t2.micro
            Configure Instance Details
                  Number of Instaces: 1
                  Network: Select preferred VPC // Probably your default VPC
                  Subnet: Select a (public) subnet
                  IAM Role: Your IAM Role should have the following policies (create new Role if required) [MyServerRole]
                        SSM: AmazonSSMManagedInstanceCore // This would give you access to Sessions Manager
                  Advanced Details: User Data (Provide or upload startup script - optional) // See sample startup script below
            Configure Security Group (SG)
                  Create a new Security Group. To create a new SG
                        Security Group Name: Enter a name (my-server-sg)
                        Add Rule: Type - HTTP, Protocol - TCP, Port - 80, Source - My IP (restricts access to only my computer), Decs - MyHomeIP
            Key Pair: Use existing, generate new Key Pair, or Proceed without a Key Pair
            
3. Once the Instance is running, go ahead and create an AMI
      Select the EC2 Instance => Actions => Image => Create Image => Image Name: Enter a Name (MyAmi000) => Create Image Button

4. Wait until the AMI Image Staus turns to "Available"
5. Once Available, terminate the server
      Left Menu => Instances => Select Instance => Actions => Instance State => Terminate

6. To Setup Auto Scaling Group
      Console => EC2 => Left Menu => Auto Scaling => Auto Scaling Group => Create an Auto Scaling Group
            Name: Enter a Name for your ASG (MyASG)
            Launch Template: Create a Launch Template // Right-click to do this in a new Tab so that you can easily come back to this
                  Launch Template Name: Enter a name for your Launch Template (MyLaunchTemplate)
                  Amazon Machine Image (AMI): Select the AMI we created above (MyAmi000)
                  Instance Type: t2.micro
                  Key Pair: We do not need a Key Pair. We would use Sessions Manager to login
                  Network Settings:
                        Networking Platform:
                              VPC []
                              EC2-Classic
                        Security Groups Info: Select your Security Group (my-server-sg)                          
                  IAM Instance Profile: Select the IAM Role created above (MyServerRole)
            Launch Template: // Welcome back!
                  Refresh the field and select the template we created above (MyLaunchTemplate) 
            Configure Settings: 
                  Purchase Options and Instance Types: You "Adhere to Launch Template" [] or "Combine or add additional server options"
                  VPC: Select your default VPC
                  Subnets: Choose multiple for high availability i.e. Subnets a, b, & c // Always launch in different AZs
            Configure Advanced Options:
                  Load Balancing: 
                        Enable Load Balancing [check]:
                              ALB or NLB
                        Create a Target Group // Right-click to do this in a new Tab so that you can easily come back to this
                              Left Menu => Load Balancing => Load Balancers => Create Load Balancer
                                    Select a Load Balancer:
                                          Application Load Balancer (ALB) [] // Select this
                                          Network Load Balancer (NLB)
                                          Classic Load Balancer (CLB)
                                    Select ALB:
                                          Basic Configuration:
                                                Name: Enter a name for load balancer (MyELB)
                                                Scheme: Internet Facing
                                                Listeners: HTTP, Port 80
                                                Availabilty Zones:
                                                      Select the 3 zones matching the Auto Scaling Group // Super important!
                                          COnfigure Security Settings: (default)
                                          Configure Security Groups: Select SG created above (my-server-sg)
                                          Configure Routing:
                                                Target Group: 
                                                      Target Group: New Target Group
                                                      Name: Enter a name for Target Group (MyTargetGroup)
                                                      Target Type: Instance
                                                      Prorocol: HTTP
                                                      Port: 80
                                                Health Checks:
                                                      Protocol: HTTP
                                                      Path: / (This will return true if the homepage loads)
                                                      Advanced Health Check Settings: 
                                                            Port: Traffic Port
                                                            Health Check Threshold: 5 // It would check 5 times
                                                            Unhealthy Threshold: 2 // Returns FALSE if the app doesn't load after 2 tests
                        Create a Target Group // Welcome back! 
                              Click on the Refresh icon to load the newly crreated Target Group
                              Select your Target Group (MyTargetGroup)                                    
                  Health Checks:
                        EC2: This would check and return true if the server is running
                        ELB: Goes a step further. Returns true if the application on the server is running []
            Configure Group Size and Scaling Policies:
                  Group Size:
                        Desired Capacity: 1
                        Minimum Capacity: 1 // Always at least one server running
                        Maximum Capacity: 1
                  Scaling Policies: // Choose whether to use a scaling policy to dynamically resize your Auto Scaling Group to meet changes in demand
                        None []
                        Target Tracking Scaling Policy 
                        
                        
EOF          
                  
==================================================
// The sample startup script below would install an Apache server and display a sample webpage
// Sample Startup Script - userdata.sh
#!/usr/bin/env bash
su ec2-user
sudo yum install httpd -y
sudo service httpd start
sudo su -c "cat > /var/www/html/index.html <<EOL
<html>
  <head>
    <title>Call to Arms</title>
    <style>
      html, body { background: #000; padding: 0; margin: 0; }
      img { display: block; margin: 0px auto; }
    </style>
  </head>
  <body>
    <img src='https://media.giphy.com/media/10YoCxWqM3NHxK/giphy.gif' height='100%'/>
  </body>
</html>
EOL"
==================================================
====================  
  
  
  
  
  
  
  
  
  
  
  
  
  
