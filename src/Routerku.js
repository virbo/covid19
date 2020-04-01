import Loadable from 'react-loadable';
import Layout from "./views/layouts";

function loading(){
    return 'loading...';
}

const Index = Loadable({
    loader: () => import('./views/beranda'),
    loading: loading
});

const Routerku = [
    {path: '/', exact: true, name: 'Index', component: Layout},
    {path: '/index', exact: true, name: 'Index', component: Index},
]