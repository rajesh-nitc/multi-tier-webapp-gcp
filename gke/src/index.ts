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
        sh.exec('helm upgrade dev ./helm-chart-dev --namespace=default', (code2, output2) => {
            sh.echo(`helm upgrade with exit code ${code2}`)
            if (code2 === 0) {
                res.send({ "state": "success" })
            }
        })
    }

    if (req.body.push_data.tag === 'dev' && req.body.repository.repo_name === 'rajesh12/node') {
        sh.exec('helm upgrade dev ./helm-chart-dev --namespace=default', (code2, output2) => {
            sh.echo(`helm upgrade with exit code ${code2}`)
            if (code2 === 0) {
                res.send({ "state": "success" })
            }
        })
    }

    if (req.body.push_data.tag === 'master' && req.body.repository.repo_name === 'rajesh12/angular') {
        sh.exec('helm upgrade master ./helm-chart-master --namespace=default', (code2, output2) => {
            sh.echo(`helm upgrade with exit code ${code2}`)
            if (code2 === 0) {
                res.send({ "state": "success" })
            }
        })
    }

    if (req.body.push_data.tag === 'master' && req.body.repository.repo_name === 'rajesh12/node') {
        sh.exec('helm upgrade master ./helm-chart-master --namespace=default', (code2, output2) => {
            sh.echo(`helm upgrade with exit code ${code2}`)
            if (code2 === 0) {
                res.send({ "state": "success" })
            }
        })
    }

})

app.listen(3003)
console.log("server up at 3003");