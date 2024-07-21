import '../assets/BootswatchTheme.css';
import StatBlock from './StatBlock';
import WeightBlock from './WeightBlock';

const Stats = () => {
    return (
        <>
            <div className='container'>
                <div className='row'>
                    <div className='col'>
                        <StatBlock/>
                    </div>
                    <div className='col'>
                        <StatBlock/>
                    </div>
                </div>
                <div className='row'>
                    <div className='col'>
                        <StatBlock/>
                    </div>
                    <div className='col'>
                        <WeightBlock/>
                    </div>
                </div>
            </div>
            <br/>
        </>
    )
}

export default Stats;