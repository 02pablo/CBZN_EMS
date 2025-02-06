module.exports = (sequelize, DataTypes) => {
    const Attendance = sequelize.define('Attendance', {
        status: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: { msg: "Status is required." }
            }
        }
    }, {
        timestamps: true
    });
    Attendance.associate = (models) => {
        Attendance.belongsTo(models.User)
    }
    return Attendance;
}