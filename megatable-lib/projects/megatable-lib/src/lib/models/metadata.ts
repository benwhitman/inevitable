export enum DataType {
    String = 'string',
    Int = 'int',
    Float = 'float',
    Boolean = 'boolean',
    Currency = 'currency',
    Base64Image = 'base64img'
}

export class ColumnMetadata {
    public name: string;
    public displayName: string;
    public includeInGlobalFilter?: boolean;
    public allowSort?: boolean;
    public dataType?: DataType;
    public currencyCode?: string;

    // optional custom renderer function to use instead of the built-in one
    public renderer?: (cellData: any) => string;
}

export class TableMetadata {
    public name: string;
    public heading: string;
    public subHeading?: string;
    public pagination: number[] = [10, 20, 30];
    public columns: ColumnMetadata[];
}
