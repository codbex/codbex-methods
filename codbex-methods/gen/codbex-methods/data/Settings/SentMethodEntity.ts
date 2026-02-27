import { Entity, Table, Id, Generated, Column, Documentation, CreatedAt, CreatedBy, UpdatedAt, UpdatedBy} from '@aerokit/sdk/db'

@Entity('SentMethodEntity')
@Table('CODBEX_SENTMETHOD')
@Documentation('SentMethod entity mapping')
export class SentMethodEntity {

    @Id()
    @Generated('sequence')
    @Documentation('Id')
    @Column({
        name: 'SENTMETHOD_ID',
        type: 'integer',
    })
    public Id?: number;

    @Documentation('Name')
    @Column({
        name: 'SENTMETHOD_NAME',
        type: 'string',
        length: 20,
    })
    public Name!: string;

}

(new SentMethodEntity());
