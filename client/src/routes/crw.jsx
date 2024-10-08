import { Welcome } from "../comp";
import CardSection from '../comp/CardSection';
import FundraisingInfoSection from '../comp/FundraisingInfoSection';

const crw = () => {
    return (
        <div >
                <div className="gradient-bg-welcome">
                    <Welcome />
                    <CardSection/>
                    <FundraisingInfoSection />
                </div>
        </div>
    )
}
export default crw;
