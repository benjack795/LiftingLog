import { render, screen } from "@testing-library/react";
import CalendarBlock from "./CalendarBlock.tsx";

test('on initial render, the calendar is displayed with the correct days', async () => {
    
    //set date to a specific time (may 2024 starts on a wednesday, so two gaps, and has 31 days)
    render(<CalendarBlock dategiven={new Date("2024-05-01")} lifts={[]} photos ={[]} fetchData={() => {}}/>);
    let correctarray = ['-1','-2','1','1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31'];
    
    //check each date / fake block has been generated properly by name
    for(const value of correctarray){
         await screen.findByRole(value);
    }
    
    //check no -3 isnt there
    const extragap = screen.queryByText('-3');
    expect(extragap).toBeNull();

    //check no 32 isnt there
    const extraday = screen.queryByText('32');
    expect(extraday).toBeNull();
})