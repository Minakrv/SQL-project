const {Sequelize, DataTypes, Op} = require("sequelize");
const sequelize = new Sequelize("mysql://root:PASSWORD@localhost:3306/master24");
const location = sequelize.define("location", {
    name:{
        type: DataTypes.STRING,
        allowNull:false
    }
}, {})

const Monster = sequelize.define("monster", {
    name:{
        type : DataTypes.STRING,
        allowNull: false
    },
    location_id: {
        type: DataTypes.INTEGER,
        references:{
            model: "locations",
            key: "id"
        }

    }
}, {})
const run = async () => {
    try{
        await sequelize.authenticate();
        await sequelize.sync();
        const york = await Location.create({name: "york"});
        const dickTurpin = await Monster.create({name: "Dick Turpin", location_id: york.id});
        
        const monster = await Monster.findOne({
            where : {
                location_id: 1
            }
        });
        console.log(monster);


        console.log("Connected");
        await sequelize.close();
        console.log("Disconnected");

    }catch (error){
        console.log(error);
    }
}

run();
