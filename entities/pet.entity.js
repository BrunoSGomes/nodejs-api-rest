const EntitySchema = require('typeorm').EntitySchema

module.exports = new EntitySchema({
    name: 'Pets',
    columns: {
        id: {
            primary: true,
            type: 'int',
            nullable: true,
            generated: true
        },
        nome: {
            type: 'varchar',
            length: 50,
        },
        imagem: {
            type: 'varchar',
            length: 200
        }
    }
})