export interface OpenSearchResp {
    responseHeader?: ResponseHeader;
    response?: Response;
}

export interface Response {
    numFound?: number;
    start?: number;
    numFoundExact?: boolean;
    docs?: Doc[];
}

export interface Doc {
    id?: string;
    name?: string;
    indexData?: string;
    orgId?: string;
    extraData?: string;
    refId?: string;
    _version_?: number;
}

export interface ResponseHeader {
    status?: number;
    QTime?: number;
    params?: Params;
}

export interface Params {
    q?: string;
    indent?: string;
}
