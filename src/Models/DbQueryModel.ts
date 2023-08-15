import { ResultSetHeader, RowDataPacket } from "mysql2"
import { User } from "./User"
export interface DbQueryModel{
    verificate_database(db_name: string): Promise<ResultSetHeader | undefined>
    verificate_table(): Promise<ResultSetHeader | undefined>
    select_database(db_name: string): Promise<ResultSetHeader | undefined>
    get read_all(): Promise<RowDataPacket[] | undefined>
    read_by_email(user_email: string): Promise<RowDataPacket[] | undefined>
    read_by_name(user_name: string): Promise<RowDataPacket[] | undefined>
    read_by_id(user_id: number):Promise<RowDataPacket[] | undefined>
    insert_register(nRegistro: User):Promise<ResultSetHeader | undefined>
    update_register(nRegistro: User):Promise<ResultSetHeader | undefined>
    delete_register(user_id: number):Promise<ResultSetHeader | undefined>
}
