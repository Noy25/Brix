// import { wapService } from '../../../services/wap.service'

export function ImgUpload({ elementStyle, onChangeStyle }) {

    const onSearchImg = () => {
        console.log('hi');
    }

    return (<div>
        <label>
            <input type="search" placeholder="serach image" onChange={onSearchImg} name="backgroundImage" value={elementStyle.backgroundImage} />
        </label>
    </div>
    )
}