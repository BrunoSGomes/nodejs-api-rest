const EntitySchema = require('typeorm').EntitySchema;

module.exports = new EntitySchema({
    name: 'Atendimentos',
    columns: {
        id: {
            primary: true,
            type: 'int',
            nullable: false,
            generated: true
        },
        name: {
            type: 'varchar',
            length: 50,
            nullable: false,
        },
        pet: {
            type: 'varchar',
            length: 20,
            nullable: false,
        },
        service: {
            type: 'varchar',
            length: 20,
            nullable: false,
        },
        serviceDate: {
            type: 'datetime',
            nullable: false,
        },
        creationDate: {
            type: 'datetime',
            nullable: false,
        },
        status: {
            type: 'varchar',
            length: 20,
            nullable: false,
        },
        comment: {
            type: 'text',
            nullable: true,
        }
    }
})