import { Schema, model } from 'mongoose';

const KycSchema = new Schema({
    id: String,
    email: String,
    phone: String,
    citizenship: String,
    firstName: String,
    middleName: String,
    lastName: String,
    month: Number,
    day: Number,
    year: Number,
    idType: String,
    idNumber: String,
    selfieUrl: String,
    videoUrl: String,
    residency: String,
    province: String,
    city: String,
    homeAddress: String,
    homeAddress2: String,
    postalCode: String,
    addressProofType: String,
    addressProofUrl: String,
    industry: String,
    occupation: String,
    annualIncome: String,
    sourceOfFunds: String,
    intent: String,
    employmentStatus: String,
    status: {type: Number, default: 0},
    createdAt: Number,  
    updatedAt: Number
});

const KycModel = model("Kyc", KycSchema);

export default KycModel;