// React
import { Link } from 'react-router-dom';


export function Hero() {

    return <section className="hero">
        <div className="hero-content flex column align-center">
            <h1>Build & Design your own website</h1>
            <p>Our platform was designed by top notch developers in order to provide you with the best experience possible.</p>
            <Link to="/templates">
                <button className="hero-cta">Lets Start</button>
            </Link>
        </div>
    </section>
}