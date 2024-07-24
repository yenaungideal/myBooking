import {Buffer} from 'buffer';

export class EncodeDecodeUtils{
    public static encode(data:string):string{
        return Buffer.from(data).toString('base64');
    }

    public static decode(data:string):string{
        return Buffer.from(data,'base64').toString();
    }

    public static encodeUri(data:string):string{
        return encodeURIComponent(data);
    }

    public static decodeUri(data:string):string{
        return decodeURIComponent(data);
    }
}