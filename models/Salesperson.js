module.exports = (sequelize,DataTypes) => {
    const SalesPerson = sequelize.define("SalesPerson",{
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
            type : DataTypes.STRING,
            validate:{
                notEmpty:true
            }
        },
        areaManager_id : {
            type : DataTypes.STRING,
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
        password : {
            type : DataTypes.STRING,
            allowNull:false,
            validate:{
                notEmpty:true
            }
        },
        description : {
            type : DataTypes.STRING,
        },
        status : {
            type : DataTypes.STRING,
            allowNull:false,
            validate:{
                notEmpty:true
            }
        },
        online : {
            type : DataTypes.STRING,
            allowNull:false,
            validate:{
                notEmpty:true
            }
        },
        location : {
            type : DataTypes.STRING
        },

    })

    return SalesPerson;
}