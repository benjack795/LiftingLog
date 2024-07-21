import '../assets/BootswatchTheme.css';
import graphhold from '../assets/graph-hold.png';

const WeightBlock = () => {
    return (
       <>
        <br/>
        <div className='d-flex justify-content-center'>
          <div className='bg-secondary p-2 rounded-4'>
            <h3 className='text-left'>Weight History (KG)</h3>
            <div className='text-center'>
              <img className='w-75' src={graphhold}/>
            </div>
            <br/>
            <p className='text-left'>Your lowest weight was X on Y!</p>
          </div>
        </div>
      </>
    )
}

export default WeightBlock;