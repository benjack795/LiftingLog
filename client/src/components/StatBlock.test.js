import { liftFilter } from "./StatBlock.tsx";

test('the statblock produces the appropriate graph data from input', async () => {

    //input example data to the statblock method, containing multiple types, same days, and out of order
    const inputarray = [
        {
            "_id": "66a6adc4984018911980ae26",
            "extype": 3,
            "weight": 20,
            "sets": 0,
            "reps": 0,
            "date": "2024-08-03T11:12:12.000Z",
            "__v": 0
        },
        {
            "_id": "66b806d7841dd3da49663c84",
            "extype": 1,
            "weight": 0,
            "sets": 0,
            "reps": 0,
            "date": "2024-08-09T11:12:12.000Z",
            "__v": 0
        },
        {
            "_id": "66b2747726a40f0304b15e85",
            "extype": 1,
            "weight": 15,
            "sets": 0,
            "reps": 0,
            "date": "2024-08-01T11:12:12.000Z",
            "__v": 0
        },
        {
            "_id": "66b2811726a40f0304b15f01",
            "extype": 2,
            "weight": 6,
            "sets": 0,
            "reps": 0,
            "date": "2024-08-02T11:12:12.000Z",
            "__v": 0
        },
        {
            "_id": "66be545d1be898f8d481ad80",
            "extype": 2,
            "weight": 0,
            "sets": 0,
            "reps": 0,
            "date": "2024-08-08T11:12:12.000Z",
            "__v": 0
        },
        {
            "_id": "66c0eaddd8177de839b02560",
            "extype": 1,
            "weight": 35,
            "sets": 0,
            "reps": 0,
            "date": "2024-08-16T11:12:12.000Z",
            "__v": 0
        },
        {
            "_id": "66c0eae6d8177de839b02564",
            "extype": 1,
            "weight": 4,
            "sets": 0,
            "reps": 0,
            "date": "2024-08-16T11:12:12.000Z",
            "__v": 0
        }
    ];

    //data is parsed correctly for statblocks, ordering the values by day, filtering to the highest value for each day and ignoring the wrong types
    const outputarray = {
        "labels": [
            1,
            9,
            16
        ],
        "datasets": [
            {
                "data": [
                    15,
                    0,
                    35
                ],
                "backgroundColor": [
                    "rgba(0, 255, 169, 1)"
                ],
                "borderColor": "white",
                "borderWidth": 1,
                "pointRadius": 6
            }
        ]
    };

   expect(liftFilter(inputarray, 1)).toEqual(outputarray);

})