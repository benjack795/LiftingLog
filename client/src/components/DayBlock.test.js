import { render, screen, fireEvent } from "@testing-library/react";
import DayBlock from "./DayBlock.tsx";

test('the dayblock displays exercise/photo data handed to it as clickable modal form buttons', async () => {

    //render a dayblock with example data
    const contentarray = [
        {
            "_id": "66b806d7841dd3da49663c84",
            "extype": 1,
            "weight": 20,
            "sets": 3,
            "reps": 5,
            "date": "2024-05-07T11:12:12.000Z",
            "__v": 0
        }
    ];
    const photosarray = [
        {
            "_id": "66b806c2841dd3da49663c60",
            "photofile": "dummy.jpg",
            "date": "2024-05-07T11:12:12.000Z",
            "__v": 0
        }
    ];
    render(<DayBlock daynum={7} dateraw={new Date("2024-05-07")} content={contentarray} photos={photosarray} fetchData={() => {}}/>);

    //check the buttons are there
    const exbutton = await screen.findByRole('button', {name: /Squat/});
    const phobutton = await screen.findByRole('button', {name: /Photo/});
    expect(exbutton).toBeEnabled();
    expect(phobutton).toBeEnabled();

    //make sure a bad button isnt there
    expect(screen.queryByText('button', {name: /Deadlift/})).toBeNull();

    //check the data in the exercise modal form
    fireEvent.click(exbutton);
    const optionitem = await screen.findByRole('option', {name: /Squat/});
    expect(optionitem.selected).toBe(true);
    const badoptionitem = await screen.findByRole('option', {name: /Deadlift/});
    expect(badoptionitem.selected).toBe(false);

    const weightitem = await screen.findByPlaceholderText('Enter weight');
    expect(weightitem.value).toBe("20"); 

    const setsitem = await screen.findByPlaceholderText('Enter sets');
    expect(setsitem.value).toBe("3");

    const repsitem = await screen.findByPlaceholderText('Enter reps');
    expect(repsitem.value).toBe("5");
        
    //check the photo is on the photo modal form (7-5-2024-dummy.jpg)
    const closebutton = await screen.findByLabelText('Close');
    fireEvent.click(closebutton);
    fireEvent.click(phobutton);

    const imgitem = await screen.findByAltText('viewimg');
    expect(imgitem.src).toBe("http://localhost/7-5-2024-dummy.jpg");

})