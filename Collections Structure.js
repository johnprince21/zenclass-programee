//**Collections Structure:


// 1. users

// {
// "_id": ObjectId(),
// "name": "John",
// "email": "john@gmail.com",
// "batch": "FSD-WD-T-B6",
// "codekata_problems_solved": 60,
//  "attendance": [
//                  {
//                      "date": ISODate("2020-10-15"),
//                      "status": "present"
//                  }
//                 ],
//  "tasks": [
//              {
//                 "topic_id": ObjectId(),
//                 "task_name": "Task 1",
//                 "submitted": true
//              }
//             ],
// "mentor_id": ObjectId()
// }




// 2. codekata

// {
// "_id": ObjectId(),
// "user_id": ObjectId(),
// "problems_solved": 30
// }




// 3. attendance

// {
// "_id": ObjectId(),
//  "user_id": ObjectId(),
// "date": ISODate("2020-10-15"),
// "status": "present"  // or "absent"
// }



// 4. topics

// {
// "_id": ObjectId(),
// "topic_name": "MongoDB DataBase",
// "tasks": [
//             {
//                 "task_name": "Task 1",
//                 "date": ISODate("2020-10-20")
//             }
//         ]
// }




// 5. tasks

// {
// "_id": ObjectId(),
// "task_name": "Task 1",
// "topic_id": ObjectId(),
// "assigned_date": ISODate("2020-10-20"),
// "submitted": true
// }





// 6. company_drives

// {
// "_id": ObjectId(),
// "company_name": "TCS",
// "date": ISODate("2020-10-20"),
// "students_appeared":
//     [
//         ObjectId(),  // user_ids
//         ObjectId()
//     ]
// }



// 7. mentors

// {
// "_id": ObjectId(),
// "name": "Sherif",
// "mentees_count": 20,
// "mentees": [
//                 ObjectId(),  // user_ids
//                  ObjectId()
//             ]
// }




// /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



// MongoDB Queries


// 1.Find all the topics and tasks which are taught in the month of October:


// db.topics.aggregate([{
//         $match: {
//             "tasks.date": {
//                 $gte: ISODate("2020-10-01"),
//                 $lte: ISODate("2020-10-31")
//             }
//         } },
//     {
//         $project: {
//             topic_name: 1,
//             tasks: {
//                 $filter: {
//                     input: "$tasks",
//                     as: "task",
//                     cond: {
//                         $and: [
//                             { $gte: ["$$task.date", ISODate("2020-10-01")] },
//                             { $lte: ["$$task.date", ISODate("2020-10-31")] }
//                         ]
//                     }
//                 }
//             }
//         }
//     }
// ])



// 2.Find all the company drives which appeared between 15 - Oct - 2020 and 31 - Oct - 2020:


// db.company_drives.find({
//     date: {
//         $gte: ISODate("2020-10-15"),
//         $lte: ISODate("2020-10-31")
//     }
// })



// 3.Find all the company drives and students who appeared for the placement:


//     db.company_drives.aggregate([
//         {
//             $lookup: {
//                 from: "users",
//                 localField: "students_appeared",
//                 foreignField: "_id",
//                 as: "appeared_students"
//             }
//         },
//         {
//             $project: {
//                 company_name: 1,
//                 date: 1,
//                 "appeared_students.name": 1,
//                 "appeared_students.email": 1
//             }
//         }
//     ])


// 4.Find the number of problems solved by the user in CodeKata:

// db.users.find(
//     { name: "John" },  // Replace with the actual user's name
//     { codekata_problems_solved: 1 }
// )


// 5.Find all the mentors who have mentees count more than 15:

// db.mentors.find({
//     mentees_count: { $gt: 15 }
// })




// 6.Find the number of users who are absent and task is not submitted between 15 - Oct - 2020 and 31 - Oct - 2020:
// js


// db.users.aggregate([
//     {
//         $match: {
//             "attendance.date": { $gte: ISODate("2020-10-15"), $lte: ISODate("2020-10-31") },
//             "attendance.status": "absent",
//             "tasks.submitted": false
//         }
//     },
//     {
//         $count: "absent_and_not_submitted"
//     }
// ])


