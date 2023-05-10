import mongoose from "mongoose";
const Schema = mongoose.Schema;
var Comments = new Schema({
    title: "string",
    body: "string",
    date: "date",
});

const taskSchma = new Schema()

taskSchma.add(
    {
        taskName: {
            type: "string",
            required: true,

        },
        isCheck: {
            type: "boolean",
            default: true,
        },
        TaskStatus: {
            type: "string",
            enum: ["TODO", "IN_PROGRESS", "READY_TO_CHACK", "BLOCK", "DONE"]
        },
        Priority: {
            type: "string",
            enum: ["H", "M", "L", "T"]
        },
        startTime: {
            type: "date",
        },
        endTime: {
            type: "date",
        },

        description: {
            notes: {
                type: "string",
                required: false,
            },
            text: {
                type: "string",
                required: false,
            },
        },
        Comment: [Comments],
        timeLine: [
            {
                title: "string",
                cardTitle: "string",
                cardSubtitle: "string",
                cardDetailedText: "string",
            }
        ],
        subTask: [taskSchma]


    })
const TimeLineSchama = new Schema({
    timeLineName: "",
    task: [taskSchma]

})
export default mongoose.model("Timeline", TimeLineSchama, "timeline");

// {
//     "taskName": "TASK PROGRESS REPORT",
//         "isCheck": true,
//             "TaskStatus": "",
//                 "Priority": "",
//                     "startTime": "",
//                         "endTime": "",
//                             "description": {
//         "notes": "",
//             "text": ""
//     },
//     "comments": [
//         {
//             "date_time": "",
//             "image": "",
//             "text": ""
//         }
//     ],
//         "timeLine": [
//             {
//                 "title": "March 2022",
//                 "cardTitle": "Event 3",
//                 "cardSubtitle": "Event 3 Subtitle",
//                 "cardDetailedText": "This is the third event on the timeline."
//             },
//             {
//                 "title": "March 2022",
//                 "cardTitle": "Event 3",
//                 "cardSubtitle": "Event 3 Subtitle",
//                 "cardDetailedText": "This is the third event on the timeline."
//             },
//             {
//                 "title": "March 2022",
//                 "cardTitle": "Event 3",
//                 "cardSubtitle": "Event 3 Subtitle",
//                 "cardDetailedText": "This is the third event on the timeline."
//             },
//             {
//                 "title": "March 2022",
//                 "cardTitle": "Event 3",
//                 "cardSubtitle": "Event 3 Subtitle",
//                 "cardDetailedText": "This is the third event on the timeline."
//             }
//         ],
//             "subTask": [
//                 {
//                     "taskName": "TASK PROGRESS REPORT",
//                     "isCheck": true,
//                     "TaskStatus": "",
//                     "Priority": "",
//                     "startTime": "",
//                     "endTime": "",
//                     "description": {
//                         "notes": "",
//                         "text": ""
//                     },
//                     "comments": [
//                         {
//                             "date_time": "",
//                             "image": "",
//                             "text": ""
//                         }
//                     ],
//                     "timeLine": [
//                         {
//                             "title": "March 2022",
//                             "cardTitle": "Event 3",
//                             "cardSubtitle": "Event 3 Subtitle",
//                             "cardDetailedText": "This is the third event on the timeline."
//                         },
//                         {
//                             "title": "March 2022",
//                             "cardTitle": "Event 3",
//                             "cardSubtitle": "Event 3 Subtitle",
//                             "cardDetailedText": "This is the third event on the timeline."
//                         },
//                         {
//                             "title": "March 2022",
//                             "cardTitle": "Event 3",
//                             "cardSubtitle": "Event 3 Subtitle",
//                             "cardDetailedText": "This is the third event on the timeline."
//                         },
//                         {
//                             "title": "March 2022",
//                             "cardTitle": "Event 3",
//                             "cardSubtitle": "Event 3 Subtitle",
//                             "cardDetailedText": "This is the third event on the timeline."
//                         }
//                     ],
//                     "subTask": [
//                         {
//                             "taskName": "TASK PROGRESS REPORT",
//                             "isCheck": true,
//                             "TaskStatus": "",
//                             "Priority": "",
//                             "startTime": "",
//                             "endTime": "",
//                             "description": {
//                                 "notes": "",
//                                 "text": ""
//                             },
//                             "comments": [
//                                 {
//                                     "date_time": "",
//                                     "image": "",
//                                     "text": ""
//                                 }
//                             ],
//                             "timeLine": [
//                                 {
//                                     "title": "March 2022",
//                                     "cardTitle": "Event 3",
//                                     "cardSubtitle": "Event 3 Subtitle",
//                                     "cardDetailedText": "This is the third event on the timeline."
//                                 },
//                                 {
//                                     "title": "March 2022",
//                                     "cardTitle": "Event 3",
//                                     "cardSubtitle": "Event 3 Subtitle",
//                                     "cardDetailedText": "This is the third event on the timeline."
//                                 },
//                                 {
//                                     "title": "March 2022",
//                                     "cardTitle": "Event 3",
//                                     "cardSubtitle": "Event 3 Subtitle",
//                                     "cardDetailedText": "This is the third event on the timeline."
//                                 },
//                                 {
//                                     "title": "March 2022",
//                                     "cardTitle": "Event 3",
//                                     "cardSubtitle": "Event 3 Subtitle",
//                                     "cardDetailedText": "This is the third event on the timeline."
//                                 }
//                             ],
//                             "subTask": []
//                         }
//                     ]
//                 }
//             ]
// }