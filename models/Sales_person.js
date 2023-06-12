module.exports = (sequelize,DataTypes) => {
    const SalesPerson = sequelize.define("Sales_person",{
        firstName : {
            type : DataTypes.STRING,
            allowNull:false,
            validate:{
                notEmpty:true
            }
        },
        lastName : {
            type : DataTypes.STRING,
            allowNull:false,
            validate:{
                notEmpty:true
            }
        },
        location_id : {
            type : DataTypes.INTEGER,
            validate:{
                notEmpty:true
            }
        },
        phone : {
            type : DataTypes.STRING,
            allowNull:false,
            validate:{
                notEmpty:true
            }
        },
        email : {
            type : DataTypes.STRING,
            allowNull:false,
            validate:{
                notEmpty:true
            }
        },
        status : {
            type : DataTypes.STRING,
            allowNull:false,
            validate:{
                notEmpty:true
            }
        },

    })

    return SalesPerson;
}