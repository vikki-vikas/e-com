module.exports = (sequelize,DataTypes) => {
    const Location = sequelize.define("Location",{
        location_name : {
            type : DataTypes.STRING,
            allowNull:false,
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
        state : {
            type : DataTypes.STRING,
            validate:{
                notEmpty:true
            }
        }

    })

    return Location;
}