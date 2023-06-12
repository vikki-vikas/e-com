module.exports = (sequelize,DataTypes) => {
    const Products = sequelize.define("Products",{
        products_name : {
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
        },
        category_id : {
            type : DataTypes.INTEGER,
            validate:{
                notEmpty:true
            }
        },
        price : {
            type : DataTypes.INTEGER,
            validate:{
                notEmpty:true
            }
        },
        description : {
            type : DataTypes.STRING,
            validate:{
                notEmpty:true
            }
        }

    })

    return Products;
}