import express from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import sequelize from './util/database';
import { User, Slot, Feedback } from './models';
import studentRoutes from './routes/learning';
import coachRoutes from './routes/coaching';
import { Role } from './util/constants';
import { CustomRequest } from './types';




const app = express();

app.use(helmet());
app.use(bodyParser.json());

Slot.belongsTo(User, { as: Role.Coach });
User.hasMany(Slot, { as: 'coachSlots', foreignKey: 'coachId' });

Slot.belongsTo(User, { as: Role.Student });
User.hasMany(Slot, { as: 'bookedSlots', foreignKey: 'studentId' });

// Feedback
Slot.hasOne(Feedback, { foreignKey: 'slotId' });
Feedback.belongsTo(Slot, { foreignKey: 'slotId' });

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});


app.use('/learning', (req, res, next) => {
    (req as CustomRequest).userRole = Role.Student;
    next();
}, studentRoutes);

app.use('/coaching', (req, res, next) => {
    (req as CustomRequest).userRole = Role.Coach;
    next();
}, coachRoutes);

// async function createDummyUsers() {
//     try {
//       // Create dummy students
//       await User.bulkCreate([
//         { name: 'Student 1', role: Role.Student, phoneNumber: '1234567890' },
//         { name: 'Student 2', role: Role.Student, phoneNumber: '1234567891' },
//       ]);
  
//       // Create dummy coaches
//       await User.bulkCreate([
//         { name: 'Coach 1', role: Role.Coach, phoneNumber: '1234567892' },
//         { name: 'Coach 2', role: Role.Coach, phoneNumber: '1234567893' },
//       ]);
  
//       console.log('Dummy users created successfully.');
//     } catch (error) {
//       console.error('Error creating dummy users:', error);
//     }
//   }
  
//   createDummyUsers();

sequelize
    .sync()
    // .sync({ force: true })
    .then(() => {
        console.log('database synchronized');
        app.listen(3000, () => {
            console.log('Server is running on port 3000')
        });
    })
    .catch(err => {
        console.log('err syncing database', err);
    });


