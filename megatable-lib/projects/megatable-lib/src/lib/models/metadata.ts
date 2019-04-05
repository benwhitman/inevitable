export enum DataType {
    DEFAULT = 'default',
    INT = 'int',
    FLOAT = 'float',
    BOOLEAN = 'boolean',
    CURRENCY = 'currency',
    BASE64IMG = 'base64img'
}

export class ColumnMetadata {
    public name: string;
    public displayName: string;
    public includeInGlobalFilter: boolean;
    public allowSort: boolean;
    public dataType: DataType;

    // optional custom renderer function to use instead of the built-in one
    public renderer?: (cellData: any) => string;
}

export class TableMetadata {
    public Name: string;
    public Heading: string;
    public Pagination: string;
    public Columns: ColumnMetadata[];
}
