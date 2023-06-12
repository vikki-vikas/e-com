module.exports = (sequelize,DataTypes) => {
    const User = sequelize.define("User",{
        firstName : {
            type : DataTypes.STRING,
            allowNull:false,
            validate:{
                notEmpty:true
            }
        },
        LastName : {
            type : DataTypes.STRING,
            allowNull:true
        },
        Emailid : {
            type : DataTypes.STRING,
            allowNull:false,
            unique : true,
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
        type : {
            type : DataTypes.STRING,
            allowNull:false,
            validate:{
                notEmpty:true
            }
        }
    })

    return User;
}