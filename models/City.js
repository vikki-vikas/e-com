module.exports = (sequelize,DataTypes) => {
    const City = sequelize.define("City",{
        state_name : {
            type : DataTypes.STRING,
            allowNull:false,
            validate:{
                notEmpty:true
            }
        },
        city : {
            type : DataTypes.STRING,
            validate:{
                notEmpty:true
            }
        }

    })

    return City;
}