import '../assets/BootswatchTheme.css';
import musclearm from '../assets/muscle-arm.png';

const HomeInfo = () => {
    return (
       <>
        <br/><br/>
        <div className='d-flex justify-content-center'>
          <div className='bg-secondary w-25 rounded-4'>
            <h2 className='text-center'>Welcome to LiftingLog.</h2>
            <br/>
            <div className='text-center'>
              <img className='w-50' src={musclearm}/>
            </div>
            <br/>
            <p className='text-center'>Record your lifts and view your records! <br/> Click Calendar to get started, then click Stats when you're done. <br/> Coded by Ben Jackson in July 2024.</p>
          </div>
        </div>
      </>
    )
}

export default HomeInfo;