module.exports = (sequelize,DataTypes) => {
    const Location = sequelize.define("Location",{
        location_name : {
            type : DataTypes.STRING,
            allowNull:false,
            unique : true,
            validate:{
                notEmpty:true
            }
        },
        distict : {
            type : DataTypes.STRING,
            validate:{
                notEmpty:true
            }
        },
        city : {
            type : DataTypes.STRING,
            validate:{
                notEmpty:true
            }
        },
        landmark : {
            type : DataTypes.STRING,
            validate:{
                notEmpty:true
            }
        },
        description : {
            type : DataTypes.STRING,
        },
        state : {
            type : DataTypes.STRING,
            validate:{
                notEmpty:true
            }
        },
        status : {
            type : DataTypes.BOOLEAN,
            allowNull:false,
            validate:{
                notEmpty:true
            }
        },

    })

    return Location;
}