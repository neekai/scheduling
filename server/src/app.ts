import express from 'express';
import sequelize from './util/database';
import { User, Slot, Feedback } from './models';
import studentRoutes from './routes/learning';
import { Role } from './util/constants';
import { CustomRequest } from './types';




const app = express();

Slot.belongsTo(User, { as: Role.Coach });
User.hasMany(Slot, { as: 'coachSlots', foreignKey: 'coachId' });

Slot.belongsTo(User, { as: Role.Student });
User.hasMany(Slot, { as: 'bookedSlots', foreignKey: 'studentId' });

// Feedback
Slot.hasOne(Feedback, { foreignKey: 'slotId' });
Feedback.belongsTo(Slot, { foreignKey: 'slotId' });

app.use('/learning', (req, res, next) => {
    (req as CustomRequest).userRole = Role.Student;
    next();
}, studentRoutes);

app.use('/coaching', (req, res, next) => {
    (req as CustomRequest).userRole = Role.Coach;
    next();
}, studentRoutes);

sequelize
    // .sync()
    .sync({ force: true })
    .then(() => {
        console.log('database synchronized');
        app.listen(3000, () => {
            console.log('Server is running on port 3000')
        });
    })
    .catch(err => {
        console.log('err syncing database', err);
    });

