import { ResultSetHeader, RowDataPacket } from "mysql2"
import { User } from "./User"
export interface DbQueryModel{
    verificate_database(): Promise<ResultSetHeader | undefined>
    verificate_table(): Promise<ResultSetHeader | undefined>
    select_database(): Promise<ResultSetHeader | undefined>
    get read_all(): Promise<RowDataPacket[] | undefined>
    read_by_email(T: any): Promise<RowDataPacket[] | undefined>
    read_by_name(T: any): Promise<RowDataPacket[] | undefined>
    read_by_id(T: any):Promise<RowDataPacket[] | undefined>
    insert_register(T: any):Promise<ResultSetHeader | undefined>
    update_register(T: any):Promise<ResultSetHeader | undefined>
    delete_register(T: any):Promise<ResultSetHeader | undefined>
}
