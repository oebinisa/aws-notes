Elastic Beanstalk Walkthrough


//Start with Cloud9
A. Setup Cloud9 environment
1. New EC2, t2.micro, Amazon Linux 2, 30 mins, IAM role
2. Linux: Use Vim commands
3. Make a directory to house your project (project_name = study-sync)
     mkdir ~/environment/study-sync

4. CD into the folder and initiate a project
    cd study-sync
    npm init -y

5. The above creates a package.json file for the project that we can adjust as needed
6. Below is a sample content of package.json
    {
      "name": "study-sync",
      "version": "1.0.0",
      "description": "",
      "main": "index.js",
      "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1"
        },
      "keywords": [],
      "author": "",
      "license": "ISC"
    }

7. We need a framework for our web app. Let's run express
    npm i express --save

8. Create initial files needed for the project (4 files)
9. They are (1) index.js (2) index.html (3) app.js, and (4) style.css
    touch index.js index.html app.js style.css

10. Edit the script so that the program can run. Insert the following script after line 6
    ...
    "scripts": {
      "start": "node index.js",
      "test": "echo \"Error: no test specified\" && exit 1"
    },
    ...

11. Populate the 4 files as follows:

- index.js
    const express = require('express')
    const app = express()
    const path = require('path')
    const port = process.env.PORT

    app.get('/', function(req, res) {
      res.sendFile(path.join(__dirname + '/index.html'));
    });

    app.get('/style.css', function(req, res) {
      res.sendFile(path.join(__dirname + '/style.css'));
    });

    app.get('/app.js', function(req, res) {
      res.sendFile(path.join(__dirname + '/app.js'));
    });

    console.log(`PLANNING TO USE PORT: ${port}`)
    app.listen(port, '0.0.0.0', () => console.log(`Listening on port ${port}!`))

- style.css
    * { box-sizing: border-box; }
    html, body {
      padding: 0px;
      margin: 0px;
      font-family: Arial;
      background: #e7f9ff;
    }

    h1 {
      margin: 0;
      padding: 12px 0;
      text-align: center;
      font-size: 20px;
      font-weight: 500;
      color: rgba(0,0,0,0.5);
    }

    h2 {
      font-size: 14px;
      margin: 0px;
    }

    main {
      padding: 40px 0;
    }

    article {
      width: 660px;
      margin: 0px auto;
      border: solid 1px rgba(0,0,0,0.6);
      border-bottom: solid 3px rgba(0,0,0,0.6);
      border-right: solid 3px rgba(0,0,0,0.6);
      border-radius: 4px;
      padding: 24px;
      background: #fff;
    }

    .question {
      margin-top: 8px;
      margin-bottom: 24px;
      font-size: 20px;
    }

    .choice {
      font-size: 16px;
      border: solid 1px rgb(220,220,220);
      padding: 16px;
      margin-bottom: 16px;
      cursor: pointer
    }
    .choice span {
      vertical-align: middle;
    }
    .choice span.l {
      display: inline-block;
      border-radius: 999px;
      height: 16px;
      width: 16px;
      background: rgb(220,220,220);
      margin-right: 16px;
    }
    .choice:hover { border: solid 1px rgb(100,100,100); }
    .choice:hover .l{ background: rgb(100,100,100); }
    .choice.active { border: solid 1px #a765ff; }
    .choice.active .l{ background: #a765ff; }

    .submit { text-align: center }
    .submit button {
      background: #a765ff;
      color: #fff;
      border: none;
      padding: 12px 32px;
      border-radius: 4px;
      font-size: 18px;
      cursor: pointer;
    }
    .submit button:hover {
      background: #984aff;
    }

- app.js
    var data = {
      title: 'Hello World!',
      selected: null,
      question: 'In the Battle of Wolf 359 what prominent Miranda-class ship was destroyed?',
      choices: [
        'A) USS Defiant',
        'B) USS Saratoga',
        'C) USS Yamaguchi',
        'D) USS Enterprise'
      ]
    }

    var Choice = {
      click: function(n){
        return function(){
          data.selected = n
        }
      },
      classes: function(n){
        if (data.selected === n){
          return 'active'
        } else {
          return ''
        }
      },
      view: function(vnode){
        var n = vnode.attrs.index
        return m('.choice',{ class: Choice.classes(n), onclick: Choice.click(n) },
          m('span.l'),
          m('span.v',data.choices[n])
        )
      }
    }
    var App = {
      submit: function(){
        m.request({
            method: "PUT",
            url: "<API-ENDPOINT>",
            params: {selected: data.selected},
        })
        .then(function(data) {
          console.log('data',data)
        })
      },
      view: function() {
        return m('main', [
          m("h1", data.title),
          m('article',
            m('h2','Question:'),
            m('.question',data.question),
            m(Choice,{index: 0}),
            m(Choice,{index: 1}),
            m(Choice,{index: 2}),
            m(Choice,{index: 3}),
            m('.submit',
              m("button", {onclick: App.submit}, 'Submit')
            )
          )
        ])
      }
    }

    m.mount(document.body, App)

- index.html
    <!DOCTYPE html>
    <html>
      <head>
        <link rel="stylesheet" href="./style.css" />
        <title>
          Study-Sync
        </title>
      </head>
      <body>
        <script src='https://cdnjs.cloudflare.com/ajax/libs/mithril/2.0.4/mithril.min.js' type='text/javascript'></script>
        <script src='./app.js' type='text/javascript'></script>
      </body>
    </html>

12. Next, preview the application. However, to do this, you need to open up the port for Cloud9 - 8080. You can do this in two ways:
- GUI: 
      Go to EC2 => Instance => Select the Cloud9 instance => Security => Security Groups => Edit inbound rules to include port 8080

- Programmatically: 
    The following displays the server's meta data
        curl -s http://169.254.169.254/latest/meta-data

    From the metadata, you can get the keyword to find the mac address
        curl -s http://169.254.169.254/latest/meta-data/mac
        //0a:ea:71:c4:2f:db

    Next, use the mac address to find the Security Group IDs and the network interfaces that uses that mac
        curl -s http://169.254.169.254/latest/meta-data/network/interfaces/macs/0a:ea:71:c4:2f:db/security-group-ids
        //sg-091073a3cbcf27a2a

    You would need to check your local IP that you're currently using to connect to AWS
        Go to browser => checkip.amazonaws.com 
        //197.211.53.30

    Final command to open up port 8080 for Cloud9
        aws ec2 authorize-security-group-ingress --group-id  sg-091073a3cbcf27a2a --port 8080 --protocol tcp --cidr 197.211.53.30/32
            //Output:
            {
                "Return": true, 
                "SecurityGroupRules": [
                    {
                        "SecurityGroupRuleId": "sgr-00cad5df7abc3217e", 
                        "FromPort": 8080, 
                        "GroupOwnerId": "641661463108", 
                        "ToPort": 8080, 
                        "IpProtocol": "tcp", 
                        "CidrIpv4": "197.211.53.30/32", 
                        "GroupId": "sg-091073a3cbcf27a2a", 
                        "IsEgress": false
                    }
                ]
            }

    Enter the following to confirm
        aws ec2 describe-security-groups --group-ids sg-091073a3cbcf27a2a --output text --filters Name=ip-permission.to-port,Values=8080
            //Output:
            SECURITYGROUPS  Security group for AWS Cloud9 environment aws-cloud9-DevEnv-d19e72628939463eb9db32e03a477df2    sg-091073a3cbcf27a2a    aws-cloud9-DevEnv-d19e72628939463eb9db32e03a477df2-InstanceSecurityGroup-1LTDUN7ZCAB5Q     641661463108    vpc-ee6d1593
            IPPERMISSIONS   8080    tcp     8080
            IPRANGES        197.211.53.30/32
            IPPERMISSIONS   22      tcp     22
            IPRANGES        35.172.155.96/27
            IPRANGES        35.172.155.192/27
            IPPERMISSIONSEGRESS     -1
            IPRANGES        0.0.0.0/0
            TAGS    aws:cloudformation:logical-id   InstanceSecurityGroup
            TAGS    aws:cloud9:owner        AIDAZKZQA5JCA7QMK4A55
            TAGS    aws:cloudformation:stack-name   aws-cloud9-DevEnv-d19e72628939463eb9db32e03a477df2
            TAGS    aws:cloudformation:stack-id     arn:aws:cloudformation:us-east-1:641661463108:stack/aws-cloud9-DevEnv-d19e72628939463eb9db32e03a477df2/e780f8e0-7b1d-11ec-83da-0e8b2ec36feb
            TAGS    Name    aws-cloud9-DevEnv-d19e72628939463eb9db32e03a477df2
            TAGS    aws:cloud9:environment  d19e72628939463eb9db32e03a477df2
            
13. You also need to know the IP address of the Cloud9 server
        curl -s http://169.254.169.254/latest/meta-data/public-ipv4
        //54.221.191.133

14. To preview the application, ensure that you are in the study sync directory, and enter the following:
        PORT=8080; npm start
        //Output
        > study-sync@1.0.0 start
        > node index.js
        PLANNING TO USE PORT: 8080
        Listening on port 8080!
          
15. Copy the IP Address gotten in step 13 into your bowser indicating port 8080. Hit enter.
        http://54.221.191.133:8080


        
        
EOF

















