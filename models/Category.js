module.exports = (sequelize,DataTypes) => {
    const Category = sequelize.define("Category",{
        category_name : {
            type : DataTypes.STRING,
            allowNull:false,
            validate:{
                notEmpty:true
            }
        },
        image : {
            type : DataTypes.STRING,
            validate:{
                notEmpty:true
            }
        }

    })

    return Category;
}