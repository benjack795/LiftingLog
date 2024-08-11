import { render, screen } from "@testing-library/react"
import Calendar from "../Calendar"

test('on initial render, the calendar is displayed with days', () => {
    render(<Calendar/>)

    screen.debug()
})