import * as express from "express";
import * as bodyParser from "body-parser";
var cors = require("cors")
var morgan = require("morgan")
var sh = require('shelljs');
const app = express()
app.use(cors());
app.options('*', cors())
app.use(morgan('short'))
app.use(bodyParser.json());

app.post('/docker', (req, res) => {
    if (req.body.push_data.tag === 'dev' && req.body.repository.repo_name === 'rajesh12/angular') {
        sh.exec('docker pull rajesh12/angular:dev', (code1, output2) => {
            sh.echo(`docker pull complete with exit code ${code1}`)
            sh.exec('docker-compose -p webappdev -f "docker-compose-dev.yml" up -d', (code2, output2) => {
                sh.echo(`docker-compose up with exit code ${code2}`)
                if (code2 === 0) {
                    res.send({ "state": "success" })
                }
            })
        })
    }

    if (req.body.push_data.tag === 'dev' && req.body.repository.repo_name === 'rajesh12/node') {
        console.log("Received post for tag: ", req.body.push_data.tag);
        sh.exec('docker pull rajesh12/node:dev', (code1, output1) => {
            sh.echo(`docker pull complete with exit code ${code1}`)
            sh.exec('docker-compose -p webappdev -f "docker-compose-dev.yml" up -d', (code2, output2) => {
                sh.echo(`docker-compose up with exit code ${code2}`)
                if (code2 === 0) {
                    res.send({ "state": "success" })
                }
            })
        })
    }

    if (req.body.push_data.tag === 'master' && req.body.repository.repo_name === 'rajesh12/angular') {
        sh.exec('docker pull rajesh12/angular:master', (code1, output2) => {
            sh.echo(`docker pull complete with exit code ${code1}`)
            sh.exec('docker-compose -p webappmaster -f "docker-compose-master.yml" up -d', (code2, output2) => {
                sh.echo(`docker-compose up with exit code ${code2}`)
                if (code2 === 0) {
                    res.send({ "state": "success" })
                }
            })
        })
    }

    if (req.body.push_data.tag === 'master' && req.body.repository.repo_name === 'rajesh12/node') {
        console.log("Received post for tag: ", req.body.push_data.tag);
        sh.exec('docker pull rajesh12/node:master', (code1, output1) => {
            sh.echo(`docker pull complete with exit code ${code1}`)
            sh.exec('docker-compose -p webappmaster -f "docker-compose-master.yml" up -d', (code2, output2) => {
                sh.echo(`docker-compose up with exit code ${code2}`)
                if (code2 === 0) {
                    res.send({ "state": "success" })
                }
            })
        })
    }


})

app.listen(3003)
console.log("server up at 3003");