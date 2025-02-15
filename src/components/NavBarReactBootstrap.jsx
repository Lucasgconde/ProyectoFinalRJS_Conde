import { Link } from 'react-router-dom';

function NavBarReactBootstrap() {
    return (
        <nav>
            <ul>
                <li><Link to="/">Inicio</Link></li>
                <li><Link to="/category/nuevos">Nuevos</Link></li>
                <li><Link to="/category/ofertas">Ofertas</Link></li>
                <li><Link to="/category/mas-vendidos">Más Vendidos</Link></li>
            </ul>
        </nav>
    );
}

export default NavBarReactBootstrap;