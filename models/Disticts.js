module.exports = (sequelize,DataTypes) => {
    const Disticts = sequelize.define("Distict",{
        state : {
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
        }

    })

    return Disticts;
}