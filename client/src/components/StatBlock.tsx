import '../assets/BootswatchTheme.css';
import graphhold from '../assets/graph-hold.png';

const StatBlock = () => {
    return (
       <>
        <br/>
        <div className='d-flex justify-content-center'>
          <div className='bg-secondary p-2 rounded-4'>
            <h3 className='text-left'>EXERCISE History</h3>
            <div className='text-center'>
              <img className='w-75' src={graphhold}/>
            </div>
            <br/>
            <p className='text-left'>Your EXERCISE record is X on Y!</p>
          </div>
        </div>
      </>
    )
}

export default StatBlock;