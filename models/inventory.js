module.exports = ( sequelize , Sequelize ) => {
  const player = sequelize.define(
    'inventory',
    {
        id: { type: Sequelize.INTEGER(11), primaryKey: true, autoIncrement: true, field: 'id' },
        owner: { type: Sequelize.STRING(100), field: 'owner' },
        code: { type: Sequelize.STRING(100), allowNull: false, field: 'code' },
        chemical_name: { type: Sequelize.STRING(100), allowNull: false, field: 'chemical_name' },
        un_no: { type: Sequelize.STRING(100), allowNull: false, field: 'un_no' },
        cus_no: { type: Sequelize.STRING(100), allowNull: false, field: 'cus_no' },
        un_class: { type: Sequelize.STRING(100), allowNull: false, field: 'un_class' },
        state: { type: Sequelize.STRING(100), allowNull: false, field: 'state' },
        packing_size: { type: Sequelize.STRING(100), allowNull: false, field: 'packing_size' },
        packing_unit: { type: Sequelize.STRING(100), allowNull: false, field: 'packing_unit' },
        storage: { type: Sequelize.STRING(100), allowNull: false, field: 'storage' },
    },
    {
        tableName: 'inventory' 
    }
  );
  
  return player;
}