VPC Components

A. Create VPC
B. Internet Gateway (IGW)
C. Route Table
D. Subnets


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
1. 
























