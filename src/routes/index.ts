import express, { Express } from 'express';
import KycRoute from './KycRoute';
import FabConnectRoute from './FabConnectRoute';
import ChainCodeRoute from './chaincode';

const app: Express = express();

app.use('/kyc', KycRoute);
app.use('/fabconnect', FabConnectRoute);
app.use('/chaincode', ChainCodeRoute);
export default app;