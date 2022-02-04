// Cmps
import { Screen } from './Screen'
import { Loader } from './Loader'


export function WapBuildingLoader() {

    return <Screen>
        <div className="save-loader-container">
            <Loader color={'#ffffff'} />
            <h1>We Are Working On Your Website...</h1>
        </div>
    </Screen>
}