import AWS, { DynamoDB } from 'aws-sdk';
import { AWSRegion } from './types/aws';
import { Vendor } from './types/twitter';
import { marshall } from '@aws-sdk/util-dynamodb';

AWS.config.update({region: AWSRegion.US_EAST_1});

const dynamodb = new DynamoDB();

// Create a table
export const dynamodbCreateTable = async (params: AWS.DynamoDB.CreateTableInput) => {
    try {
        const result = await dynamodb.createTable(params).promise();
        console.log('Table created', result);
        return result;
    } catch(e) {
        if(e instanceof Error) {
            throw e
        }
        throw new Error(`dynamodbCreateTable error object unknown type`);
    }
}

// Describe created table
export const dynamodbDescribeTable = async (tableName: string) => {
    try {
        const table = await dynamodb.describeTable({TableName: tableName}).promise();
        console.log('Table retrieved', table);
        return table;
    } catch(e) {
        if(e instanceof Error) {
            return e
        }
        throw new Error(`dynamodbDescribeTable error object unknown type`);
    }
}

// Delete table
export const dynamodbDeleteTable =async (tableName:string) => {
    try {
        const result = await dynamodb.deleteTable({TableName: tableName}).promise();
        console.log('Table deleted', result);
        return result;
    } catch(e) {
        if (e instanceof Error) {
            throw e 
        }
        throw new Error(`dynamodbDeleteTable error object unknown type`);
    }
}

// Create record
export const dynamodbCreateRecord = async (tableName: string, vendor: Vendor) => {
    try {
        await dynamodb.putItem({
            TableName: tableName,
            Item: marshall(vendor)
        }).promise();
        console.log('Record created');
    } catch(e) {
        if (e instanceof Error) {
            return e 
        }
        throw new Error(`dynamodbCreateRecord error object unknown type`);
    }
}