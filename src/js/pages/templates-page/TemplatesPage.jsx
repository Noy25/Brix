// React
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
// Services
import { templateService } from '../../services/template.service';
// Actions
import { loadWapTemplate, resetDraftWap } from '../../store/wap.action';
// Assets
import altImg from '../../../assets/imgs/collection thumbnail alternative.jpg';


export function TemplatesPage() {

    const dispatch = useDispatch();

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const wapTemplates = templateService.getWapTemplates();


    return <main className="templates-page">

        {/* Templates page header */}
        <div className="hero flex column justify-center align-center">
            <h1>Designed Templates</h1>
            <p>Pick one of the prebuilt template websites below or start from scratch</p>
            <hr />
        </div>

        <section className="templates-grid">

            {/* New Project (scratch) */}
            <Link to="/editor" className="wrapper flex column" onClick={() => dispatch(resetDraftWap())}>

                <div className="image-container new-proj">
                    <img src={altImg} alt="" />
                </div>
                <p>+ Create New Website</p>

            </Link>

            {/* Templates */}
            {wapTemplates.map((wapTemplate, idx) => {
                return <Link key={wapTemplate._id + idx}
                    to="/editor"
                    onClick={() => dispatch(loadWapTemplate(wapTemplate._id))}
                    className="wrapper flex column">

                    <div className="image-container">
                        <img src={wapTemplate.thumbnail} alt="Template Thumbnail" />
                    </div>
                    <p>{wapTemplate.name}</p>

                </Link>
            })}

        </section>
    </main>
}