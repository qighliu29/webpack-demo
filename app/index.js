import component from './component';
import './main.css';
import 'purecss';
import 'font-awesome/css/font-awesome.css';
import { bake } from './shake';

bake();
document.body.appendChild(component());