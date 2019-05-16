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
    public isKey?: boolean;
    public includeInGlobalFilter?: boolean;
    public allowSort?: boolean;
    public dataType?: DataType;
    public currencyCode?: string;

    // for row-based updates, add a column to the data containing
    // 'create', 'update', 'delete'
    // then set this value to true for that column
    public isDataModification?: boolean;

    // optional custom renderer function to use instead of the built-in one
    public renderer?: (cellData: any) => string;

    constructor() {
        this.includeInGlobalFilter = true;
    }
}

export class TableMetadata {
    public name: string;
    public heading: string;
    public subHeading?: string;
    public pagination?: number[];
    public columns: ColumnMetadata[];

    // the name of the column that the table should be initially sorted by
    public defaultSortColumn?: string;

    // either 'asc' or 'desc'
    public defaultSortColumnDirection?: string;

}
