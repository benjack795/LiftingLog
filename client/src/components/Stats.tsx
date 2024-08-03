import '../assets/BootswatchTheme.css';
import StatBlock from './StatBlock';

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
                    <div className='col'>
                        <StatBlock/>
                    </div>
                </div>
            </div>
            <br/>
        </>
    )
}

export default Stats;