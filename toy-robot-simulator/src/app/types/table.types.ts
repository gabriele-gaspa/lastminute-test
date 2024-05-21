export type TableCellStatus = "empty" | "full";

export type TableCell = {
    x: number;
    y: number;
    status: TableCellStatus;
}