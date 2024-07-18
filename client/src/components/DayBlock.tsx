import '../assets/BootswatchTheme.css';


const DayBlock = ({daynum} : {daynum: number}) => {

    return (
        <>
            <div className='d-flex justify-content-center'>
                <div className='d-inline-flex p-2 bg-primary rounded-4 justify-content-between'>
                    <p>{daynum}</p>
                </div>
            </div>
        </>
    )
}

export default DayBlock;