import { exec } from "child_process";
import fs from 'fs';
import * as path from 'path';

class FabConnectService {
    static getOrgHost(org: string) {
        let port = 7054;
        let caHost = 'aab.ca';
        let host = 'aab.dnb';
        let caName = 'ca-org1';
        let caCertFile = "${PWD}/../prod-network/organizations/fabric-ca/org1/ca-cert.pem";
        if(org == 'paycool') {
            port = 8054;
            caHost = 'paycool.ca';
            host = 'paycool.dnb';
            caName = 'ca-org2';
            caCertFile = "${PWD}/../prod-network/organizations/fabric-ca/org2/ca-cert.pem";
        } else 
        if(org == 'fm') {
            port = 11054;
            caHost = 'fm.ca';
            host = 'fm.dnb';
            caName = 'ca-org3';
            caCertFile = "${PWD}/../prod-network/organizations/fabric-ca/org3/ca-cert.pem";
        }
        return {caHost, host, port, caName, caCertFile}
    }
    static async registerUser(name: string, secret: string, org: string) {
        let url = 'https://org1admin:fwaefew3erfwer34@';
        if(org == 'paycool') {
            url = 'https://org2admin:fawefwe3erfwefwe3s@';
        } else 
        if(org == 'fm') {
            url = 'https://org3admin:fawefwae33erf4e@';
        }

        const {caName, caHost, port, caCertFile} = this.getOrgHost(org);
        url = url + caHost + ':' + port;
        return new Promise(function(resolve, reject) {
            //const cmd1 = '../bin/fabric-ca-client enroll -u https://dnbad:12e31da22aw@aab.ca:7054 --caname ca-org1 --tls.certfiles ${PWD}/../prod-network/organizations/fabric-ca/org1/ca-cert.pem';

            const cmd = '../bin/fabric-ca-client register -u ' + url + ' --caname ' + caName + ' --id.name ' + name + ' --id.secret ' + secret + ' --id.type client --tls.certfiles ' + caCertFile;
            //const cmd = cmd1 + ';' + cmd2;
            exec(cmd, (error, stdout, stderr) => {
                if (error) {
                    console.log('error=', error);
                    reject(error);
                    return;
                }
                resolve(stdout.trim());
            });
        });      
    }

    static async enrollUser(name: string, secret: string, org: string) {
        const {caName, caHost, host, port, caCertFile} = this.getOrgHost(org);
        let url = 'https://' + name + ':' + secret + '@' + caHost + ':' + port;
        
        return new Promise(function(resolve, reject) {
            //const cmd1 = 'export FABRIC_CA_CLIENT_HOME=${PWD}/../prod-network/organizations/peerOrganizations/aab.dnb/';

            const mspPath = '../prod-network/organizations/peerOrganizations/' + host + '/users/' + name + '@' + host + '/msp';
            const cmd = '../bin/fabric-ca-client enroll -u ' + url + ' --caname ' + caName + ' --id.name ' + name + ' --id.secret ' + secret + ' --tls.certfiles ' + caCertFile 
            + ' -M ${PWD}/' + mspPath;
            //const cmd = cmd1 + ';' + cmd2;

            console.log('cmd===', cmd);
            exec(cmd, (error, stdout, stderr) => {
                if (error) {
                    console.log('error=', error);
                    reject(error);
                    return;
                }
                
                const keyDirectoryPath = mspPath + '/keystore';

                const certPath = mspPath + '/signcerts/cert.pem';
                fs.readdir(keyDirectoryPath, (error, files) => {
                    if(error) {
                        reject(error);
                        return;
                    }

                    const keyPath = path.resolve(keyDirectoryPath, files[0]);
                    fs.readFile(keyPath, (error, privateKeyPem) => {
                        if(error) {
                            reject(error);
                            return;
                        }
                        
                        const prvKey = privateKeyPem.toString();

                        fs.readFile(certPath, (error, certFileBuffer) => {
                            if(error) {
                                reject(error);
                                return;
                            }
                            const certFile = certFileBuffer.toString();
                            resolve({
                                key: prvKey,
                                cert: certFile
                            });
                        });
                        
                    });
                    
                    
                });
                /*
                const keyPath = path.resolve(keyDirectoryPath, files[0]);
                const privateKeyPem = await fs.readFile(keyPath);
                const keystore = '';
                const signcerts = '';
                */

            });
        });      
    }

}

export default FabConnectService;