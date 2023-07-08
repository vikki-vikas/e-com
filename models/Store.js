module.exports = (sequelize,DataTypes) => {
    const Store = sequelize.define("Store",{
        store_name : {
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
        store_owner_name : {
            type : DataTypes.STRING,
            validate:{
                notEmpty:true
            }
        },
        store_owner_phone : {
            type : DataTypes.STRING,
            validate:{
                notEmpty:true
            }
        },
        store_owner_email : {
            type : DataTypes.STRING,
            validate:{
                notEmpty:true
            }
        },
        sales_person_id : {
            type : DataTypes.INTEGER,
            validate:{
                notEmpty:true
            }
        },
        description : {
            type : DataTypes.STRING
        },
        status : {
            type : DataTypes.STRING,
            validate:{
                notEmpty:true
            }
        }

    })

    return Store;
}