VPC Components

A. Create VPC
B. Internet Gateway (IGW)
C. Route Table
D. Subnets
E. NAT Gateway
F. VPC Endpoints
G. VPC Flowlogs



Note:
1. Always ensure you have your region set to us-east-1 (N. Virginia) before performing ops


A. Create VPC
1. AWS usually have a default VPC created. It uses a CIDR range of 172.31.0.0/16
2. Manually create a VPC
      Console => VPC => Left Menu => Your VPCs => Create VPC

3. Enter details:
      VPC Name, CIDR block range (it must not be one that is existing i.e. 10.0.0.0/16), Tenancy: Default (Dedicated is expensive)

4. AWS would create a default Route Table and NACL - automatically, for the newly created VPC
5. Enable DNS Hostnames
      Select VPC => Actions => Edit DNS Hostnames => Enable DNS Hostnames [check]
====================
  
  
B. Internet Gateway (IGW) 
1. IGW enables the Internet to reach our VPC
2. Manually an Internet GAteway
      Console => VPC => Left Menu => Internet Gateway => Create Internet Gateway => Enter your IGW name
3. By default, it would be in a detached state. To attach your IGW to your VPC
      Select Internet Gateway => Actions => Attach to VPC => Select the preferred VPC
====================


C. Route Table (RT)
1. The final step to ensure the Internet reaches our VPC is to create a Route Table
2. We would manually create a RT even though AWS would have created one for us automatically
      Console => VPC => Left Menu => Route Tables => Create Route Table => Enter your RT name => Select the preferred VPC

3. Change the newly created RT to the Main RT
      Select Route Table => Actions => Set Main Route Table
      
4. Edit the Routes to allow access through the IGW
      Select Route Table => Routes Tab => Edit Routes => Add Routes
            Destination: 0.0.0.0/0 // All traffic from anywhere
            Target: Internet Gateway => Select the preferred IGW
====================
 
        
D. Subnets
1. Subnets are the way to connect our EC2 Instances to the network
2. AWS would have created default public Subnets - one per AZ (they must have a public IP)
3. Manually create a Subnet
      Console => VPC => Left Menu => Subnets => Create Subnet  
            Enter Subnet name => Select VPC => Select AZ => Enter your Subnet CIDR
      
4. Newly created Subnets are "PRIVATE" by default. To make a subnet "PUBLIC"
      Select Subnets => Actions => Modify Auto-assign IP Settings => Enable Auto-assign Public IPv4 Address [check]
      
5. By default, AWS associates all newly created Subnets with the "Main" RT. 
   Ensure that your Private Subnets are associated a Private RT - RTs with no entry to the IGW (0.0.0.0/0)
====================
      

E. NAT Gateway
// This section assumes that you have created Private EC2 Instance, which is associated with a Private Subnet
// and that you are trying to access the Internet via the Private EC2 Instance.
// A good case is the need to update OS packages on the Private EC2 Instance
1. You can enable your Private EC2 Instances to connect to the Internet via the NAT Gateway
2. Create NAT Gateway // Note: NAT Gateway do cost money
      Console => VPC => Left Menu => NAT GAteways => Create NAT Gateway
            Subnet: Select a public Subnet
            Elastic IP (EIP) Allocation ID: Create New EIP
3. You would need to edit the Private EC2 Route Table to include the NAT Gateway ID            
      VPC => Left Menu => Route Tables => Select Private RT => Routes Tab => Edit Routes => Add Route 
            Destination: 0.0.0.0/0
            Target: Select the NAT Gateway
====================            


F. VPC Endpoints
1. VPC Endpoints are a way to access AWS services within the AWS network without going through the Internet
   Case: Access an S3 Bucket from a PRIVATE EC2 instance
2. Create VPC Endpoint
      Console => VPC => Left Menu => Endpoints => Create Endpoint
            Service Category: AWS Service
            Service Name: com.amazonaws.us-east-1.s3 // S3 for example
            VPC: Select VPC
            Configure Route Tables: Select relevant RTs  // Subnets associated with selected RTs will be able to access the Endpoint
            Policy: Full Acess[] or Custom
====================

                  
G. VPC Flowlogs
















